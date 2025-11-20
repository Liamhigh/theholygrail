# Testing Guide for Verum Omnis

This document provides testing instructions for the Verum Omnis application.

## Prerequisites

- Node.js 20.x installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Valid API keys configured

## Testing Locally

### 1. Test Web Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Application will be available at http://localhost:5173
```

**Test Cases:**
- [ ] Application loads without errors
- [ ] File upload works (drag & drop or click to upload)
- [ ] Analysis runs with test files
- [ ] PDF generation works
- [ ] Case management (save/load cases)
- [ ] Offline mode works

### 2. Test Firebase Functions Locally

```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Start Firebase emulator
firebase emulators:start --only functions

# Functions will be available at:
# http://localhost:5001/verum-omnis-v2/us-central1/legalAdvice
```

**Test the Legal Advice API:**

```bash
# Test with curl
curl -X POST http://localhost:5001/verum-omnis-v2/us-central1/legalAdvice \
  -H "Content-Type: application/json" \
  -d '{"summary": "Case involves contract dispute with evidence of breach. What are the next steps?"}'

# Expected response:
# {
#   "output": "<legal advice content>",
#   "model": "gpt-4o-mini",
#   "timestamp": "2025-11-20T..."
# }
```

**Test Health Check:**

```bash
curl http://localhost:5001/verum-omnis-v2/us-central1/healthCheck

# Expected response:
# {
#   "status": "ok",
#   "service": "Verum Omnis Functions",
#   "timestamp": "2025-11-20T..."
# }
```

### 3. Test Android APK Build

```bash
# Build web assets
npm run build

# Sync to Android
npx cap sync android

# Open in Android Studio (for local testing)
npx cap open android

# OR build APK from command line (requires Android SDK)
cd android
./gradlew assembleDebug

# Debug APK will be at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

**Install and Test APK:**

```bash
# Install on connected device or emulator
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Check logs
adb logcat | grep -i verum
```

## Testing Production Deployment

### 1. Test Firebase Hosting

After deployment, test at: `https://verum-omnis-v2.web.app`

**Verification Checklist:**
- [ ] Site loads correctly
- [ ] All assets load (no 404 errors)
- [ ] PWA can be installed
- [ ] Service worker is registered
- [ ] Offline functionality works

### 2. Test Firebase Functions (Production)

```bash
# Test production legal advice endpoint
curl -X POST https://us-central1-verum-omnis-v2.cloudfunctions.net/legalAdvice \
  -H "Content-Type: application/json" \
  -d '{"summary": "Test case summary"}'

# Test health check
curl https://us-central1-verum-omnis-v2.cloudfunctions.net/healthCheck
```

### 3. Test Production APK

Download the APK from GitHub Actions artifacts:
1. Go to GitHub Actions tab
2. Find the latest successful workflow run
3. Download the APK artifact
4. Install on Android device

**APK Test Checklist:**
- [ ] App installs successfully
- [ ] App launches without crashes
- [ ] File analysis works
- [ ] API calls work (to production Firebase Functions)
- [ ] PDF generation and download works
- [ ] Documents are cryptographically sealed correctly
- [ ] Offline mode works as expected

## Key Features to Test

### 1. File Upload and Analysis

**Test Files:**
- Text file (.txt)
- PDF document
- Images (.jpg, .png)
- Multiple files at once

**Expected Behavior:**
- Files are accepted
- Analysis starts automatically
- Progress indicator shows
- Results display in markdown format
- V5 Rules are applied

### 2. PDF Report Generation

**Test:**
1. Complete an analysis
2. Click "Download PDF"
3. Verify PDF contains:
   - Cover page with case information
   - Full analysis report
   - Cryptographic seal (SHA-256 hash)
   - Page numbers
   - Proper formatting

### 3. API Integration

**For Web App:**
- Gemini API should be called for analysis
- Results should appear in UI

**For APK:**
- Same as web app
- Verify API calls work over cellular and WiFi

### 4. Cryptographic Sealing

**Verify:**
- Each PDF has unique SHA-256 hash
- Hash is displayed in the PDF footer
- Hash changes if content changes
- Hash can be verified independently

### 5. Case Management

**Test:**
1. Save a case with ID
2. Close browser/app
3. Reopen and load case
4. Verify all data is restored

**IndexedDB Storage:**
- Reports are saved
- Evidence files are saved
- Metadata is preserved

### 6. Offline Functionality

**Test:**
1. Load the application
2. Disconnect from internet
3. Try to use the app:
   - Should show offline indicator
   - Should allow case preparation
   - Should allow PDF generation from existing data
   - API calls should gracefully fail with error message

## Performance Testing

### Web App

```bash
# Build production version
npm run build

# Serve locally
npx serve dist

# Test with Lighthouse
# Open Chrome DevTools → Lighthouse → Run audit
```

**Target Metrics:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- PWA: All checks pass

### APK

**Check:**
- App startup time < 3 seconds
- Analysis response time reasonable (depends on API)
- PDF generation < 5 seconds for typical reports
- Memory usage reasonable (<100MB for typical use)

## Debugging

### Web Application

```bash
# Check browser console for errors
# Open DevTools → Console

# Check network requests
# Open DevTools → Network

# Check service worker
# Open DevTools → Application → Service Workers
```

### Android APK

```bash
# View logs
adb logcat | grep -i chromium

# Check WebView debugging
# Enable in Android Settings → Developer Options → WebView debugging
# Open chrome://inspect in Chrome browser
```

### Firebase Functions

```bash
# View function logs
firebase functions:log

# Or in Firebase Console:
# Functions → Logs
```

## Common Issues and Solutions

### Issue: Build fails
**Solution:** 
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Verify Node.js version is 20.x

### Issue: Firebase deploy fails
**Solution:**
- Verify service account credentials
- Check Firebase project ID
- Ensure billing is enabled for Cloud Functions

### Issue: APK doesn't load web assets
**Solution:**
- Run `npx cap sync android` after building
- Check that dist/ directory has files
- Verify capacitor.config.json has correct webDir

### Issue: API calls fail
**Solution:**
- Check API keys are set correctly
- Verify CORS is enabled for Functions
- Check network connectivity
- View browser/app console for error details

## Automated Testing

The project includes GitHub Actions workflows for automated testing:

- **Build Test**: Runs on every push
- **Deployment Test**: Runs on push to main
- **APK Build Test**: Runs on push to main

View results in GitHub Actions tab.

## Security Testing

**Items to Verify:**
- [ ] API keys not exposed in client code
- [ ] Environment variables properly set
- [ ] CORS configured correctly
- [ ] No sensitive data in logs
- [ ] Cryptographic hashes verify correctly
- [ ] PDF sealing cannot be tampered with

## Load Testing (Optional)

For production deployments under load:

```bash
# Use Apache Bench or similar tool
ab -n 100 -c 10 https://verum-omnis-v2.web.app/

# Monitor Firebase Console for:
# - Hosting traffic
# - Function invocations
# - Error rates
```

## Conclusion

Complete all test cases before considering the application production-ready. Document any issues found and address them before deployment.
