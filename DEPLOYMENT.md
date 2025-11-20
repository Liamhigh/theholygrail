# Production Deployment Checklist

This checklist ensures the Verum Omnis Forensic Engine is properly configured for production deployment.

## Pre-Deployment Setup

### 1. GitHub Repository Secrets Configuration

Configure the following secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

- [ ] `VITE_API_KEY` - Your Google Gemini API key
  - Get from: https://makersuite.google.com/app/apikey
  - Enable "Generative Language API" in Google Cloud Console
  
- [ ] `FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_V2` - Firebase deployment token
  - Get from Firebase Console or via `firebase login:ci`
  - Used for automated deployments

### 2. Local Development Setup

- [ ] Copy `.env.example` to `.env.production`
  ```bash
  cp .env.example .env.production
  ```

- [ ] Add your Gemini API key to `.env.production`
  ```
  VITE_API_KEY=your_actual_api_key_here
  ```

- [ ] Verify `.env.production` is in `.gitignore` (should already be included)

- [ ] Test local build
  ```bash
  npm install
  npm run build
  ```

### 3. Firebase Configuration (Optional - for web hosting)

- [ ] Ensure `firebase.json` is properly configured
- [ ] Verify Firebase project ID in `.firebaserc`
- [ ] Test Firebase deployment locally
  ```bash
  npm run build
  firebase deploy --only hosting
  ```

### 4. Android APK Build (Optional - for mobile)

- [ ] Ensure Android SDK is installed (for local builds)
- [ ] Verify Capacitor configuration in `capacitor.config.json`
- [ ] Test APK build locally
  ```bash
  npm run build
  npx cap sync
  cd android && ./gradlew assembleRelease
  ```

## Production Readiness Verification

### Code Quality

- [x] No TypeScript compilation errors
- [x] No syntax errors in source code
- [x] All unused imports removed
- [x] Build completes successfully
- [x] No critical linting issues

### Security Checks

- [x] No hardcoded API keys in source code
- [x] All `.env` files excluded from version control
- [x] API keys loaded from environment variables
- [x] GitHub Secrets configured for CI/CD
- [x] No secrets committed to git history
- [x] CodeQL security scan passed
- [ ] Review and acknowledge known dependency vulnerabilities (see SECURITY.md)

### Functionality Testing

Before deploying to production, verify:

- [ ] Offline forensic analysis works without internet
- [ ] File upload (drag & drop and click) works
- [ ] SHA-256 hashing of evidence files
- [ ] Report generation from markdown
- [ ] PDF download with cryptographic seal
- [ ] Case ID system for organizing reports
- [ ] Local storage (IndexedDB) persistence
- [ ] Master case file PDF generation

### Online Features Testing (if using API)

- [ ] Gemini API connection works
- [ ] Online AI-powered analysis runs
- [ ] Model selection (flash vs pro) works correctly
- [ ] Geolocation capture (with user permission)
- [ ] Safety settings properly configured
- [ ] Error handling for API failures

### Mobile APK Testing (if deploying Android)

- [ ] APK installs on Android device
- [ ] All features work in mobile environment
- [ ] Offline mode functions correctly
- [ ] File picker/camera integration works
- [ ] PDF downloads to device storage
- [ ] App doesn't crash under normal usage

## Deployment Process

### Web Deployment (Firebase)

1. [ ] Push to `main` branch
   - Triggers automatic GitHub Actions workflow
   - Builds production bundle
   - Deploys to Firebase Hosting

2. [ ] Monitor deployment
   - Check GitHub Actions workflow status
   - Verify build completes successfully
   - Confirm deployment to Firebase

3. [ ] Verify live site
   - Visit production URL
   - Test core functionality
   - Check for console errors

### Android APK Deployment

1. [ ] Push to `main` branch (if workflow configured)
   - Or manually trigger Android build workflow

2. [ ] Download APK artifact from GitHub Actions
   - Artifacts tab in workflow run

3. [ ] Test APK on physical device
   - Install and verify all features work

4. [ ] (Optional) Sign APK for Play Store
   - Use Android signing tools
   - Follow Google Play guidelines

## Post-Deployment Verification

### Essential Checks

- [ ] Production site loads correctly
- [ ] No console errors in browser
- [ ] Offline functionality works
- [ ] File uploads process correctly
- [ ] Report generation completes
- [ ] PDF downloads successfully

### Performance Checks

- [ ] Initial page load < 3 seconds
- [ ] Analysis completes in reasonable time
- [ ] PDF generation doesn't hang
- [ ] No memory leaks during extended use

### User Experience

- [ ] Mobile responsive design works
- [ ] Touch/click targets appropriate size
- [ ] Error messages user-friendly
- [ ] Loading states clearly indicated

## Rollback Plan

If issues are discovered in production:

1. [ ] Revert to previous commit
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. [ ] Monitor automatic redeployment

3. [ ] Verify rollback successful

4. [ ] Fix issues in development branch

5. [ ] Test thoroughly before re-deploying

## Monitoring and Maintenance

### Regular Maintenance Tasks

- [ ] Review dependency updates monthly
- [ ] Check for security vulnerabilities
- [ ] Update API keys if compromised
- [ ] Monitor Firebase usage/quotas
- [ ] Review user feedback for issues

### Emergency Contacts

- Repository Owner: [Add contact info]
- Firebase Admin: [Add contact info]
- API Key Manager: [Add contact info]

## Success Criteria

Deployment is considered successful when:

- ✅ Build completes without errors
- ✅ All core features functional
- ✅ No security vulnerabilities introduced
- ✅ Performance meets expectations
- ✅ Users can access the application
- ✅ Data privacy maintained (offline-first)

---

**Last Updated**: 2025-11-20  
**Version**: 5.0  
**Next Review**: Before each major deployment
