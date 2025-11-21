# Firebase Deployment Fix Summary

## Problem
Firebase deployments were failing across multiple GitHub Actions workflows with authentication errors.

## Root Causes

### 1. deploy-and-build.yml - Firebase Functions Deployment
**Issue**: The workflow was attempting to pass a service account JSON directly to the `--token` flag:
```yaml
firebase deploy --only functions --token "${{ secrets.FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_V2 }}"
```

**Problem**: The `--token` flag expects a Firebase CI token (obtained via `firebase login:ci`), not a service account JSON.

**Solution**: Write the service account JSON to a file, use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable, and clean up the file after deployment:
```yaml
- name: Deploy Firebase Functions
  run: |
    npm install -g firebase-tools
    echo '${{ secrets.FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_V2 }}' > $HOME/gcloud-key.json
    export GOOGLE_APPLICATION_CREDENTIALS="$HOME/gcloud-key.json"
    firebase deploy --only functions --project verum-omnis-v2
    rm -f $HOME/gcloud-key.json
```

### 2. web-deploy.yml & production.yml - Invalid Action Version
**Issue**: Both workflows were using `w9jds/firebase-action@v13` which doesn't exist:
```yaml
- uses: w9jds/firebase-action@v13
  env:
    FIREBASE_TOKEN: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_V2 }}
```

**Problems**:
1. Version `v13` doesn't exist (latest is v14.x series)
2. Wrong environment variable name - should be `GCP_SA_KEY` for service accounts

**Solution**: Updated to use specific version `v14.25.1` and correct environment variable:
```yaml
- uses: w9jds/firebase-action@v14.25.1
  env:
    GCP_SA_KEY: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_V2 }}
```

## Files Changed
1. `.github/workflows/deploy-and-build.yml` - Fixed Firebase Functions deployment authentication
2. `.github/workflows/web-deploy.yml` - Fixed action version and environment variable
3. `.github/workflows/production.yml` - Fixed action version and environment variable

## Expected Outcome
All Firebase deployments should now succeed:
- Hosting deployments via FirebaseExtended/action-hosting-deploy (was already working)
- Functions deployments in deploy-and-build.yml (now fixed)
- Hosting deployments in web-deploy.yml (now fixed)
- Hosting deployments in production.yml (now fixed)

## Notes
- The `FirebaseExtended/action-hosting-deploy@v0` action was already working correctly because it properly handles service account JSON internally
- The `w9jds/firebase-action` requires either:
  - `FIREBASE_TOKEN` environment variable for CI tokens
  - `GCP_SA_KEY` environment variable for service account JSON
- For direct Firebase CLI usage, service accounts must be provided via `GOOGLE_APPLICATION_CREDENTIALS` pointing to a JSON file
