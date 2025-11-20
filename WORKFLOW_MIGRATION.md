# Workflow Migration Notes

## Current State

The repository has multiple GitHub Actions workflow files:

### Legacy Workflows (Can be deprecated)
- `android-build.yml` - Builds APK only
- `deploy.yml` - Deploys to Firebase Hosting
- `firebase-hosting.yml` - Deploys to Firebase Hosting
- `firebase-hosting-merge.yml` - Auto-generated Firebase workflow
- `firebase-hosting-pull-request.yml` - Auto-generated Firebase workflow  
- `production.yml` - Deploys to Firebase
- `web-deploy.yml` - Deploys to Firebase

### New Unified Workflow
- **`deploy-and-build.yml`** - Complete deployment solution that:
  - Deploys to Firebase Hosting
  - Deploys Firebase Functions
  - Builds Android APK
  - Uploads APK as artifact

## Recommendation

To avoid duplicate deployments and workflow confusion:

### Option 1: Keep Only New Workflow (Recommended)
Delete or disable the legacy workflows and use only `deploy-and-build.yml`. This provides:
- Single source of truth
- Consistent deployment process
- Less maintenance overhead
- No duplicate deployments

**To implement:**
```bash
# Disable old workflows by moving them to a backup directory
mkdir -p .github/workflows-backup
mv .github/workflows/android-build.yml .github/workflows-backup/
mv .github/workflows/deploy.yml .github/workflows-backup/
mv .github/workflows/firebase-hosting.yml .github/workflows-backup/
mv .github/workflows/production.yml .github/workflows-backup/
mv .github/workflows/web-deploy.yml .github/workflows-backup/
```

Keep the Firebase auto-generated workflows for PR previews:
- `firebase-hosting-merge.yml`
- `firebase-hosting-pull-request.yml`

### Option 2: Disable Old Workflows
Add a condition to old workflows to prevent them from running:

```yaml
on:
  push:
    branches:
      - disabled  # This effectively disables the workflow
```

### Option 3: Keep for Reference
Keep all workflows but add comments indicating which is primary:
- Add `# DEPRECATED - Use deploy-and-build.yml instead` to legacy workflows
- Document in README which workflow is active

## Current Active Workflow

**Primary:** `.github/workflows/deploy-and-build.yml`

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Jobs:**
1. **deploy-firebase**: Deploys hosting and functions
2. **build-apk**: Builds Android APK (runs after deploy-firebase)

**Outputs:**
- Live website at https://verum-omnis-v2.web.app
- Firebase Functions endpoints
- APK artifact in GitHub Actions

## Decision

Choose one of the options above and implement it to avoid:
- Duplicate deployments
- Wasted CI/CD minutes
- Confusion about which workflow is active
- Potential conflicts between workflows

---

**Recommended Action:** Implement Option 1 to consolidate to single workflow.
