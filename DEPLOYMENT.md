# Deployment Guide - Verum Omnis Forensic Engine

## Overview
This document explains how the application is built, deployed, and how the API functionality works across different platforms (Web, Android APK).

## Architecture

### Data Storage
- **Primary Storage**: IndexedDB (works on all devices - web, Android, iOS)
- **Optional Cloud Sync**: Firebase Firestore (only metadata, not binary evidence)
- **All user data stays local** - no evidence files are uploaded to any server
- **Export functionality**: Users can backup all data to JSON for desktop storage

### API Integration
The application uses Google Gemini API for AI-powered forensic analysis:
- **API Key**: Set via `VITE_API_KEY` environment variable
- **Models Used**: 
  - `gemini-2.5-flash` - for general analysis
  - `gemini-2.5-pro` - for PDF analysis (with enhanced thinking budget)
- **Offline Mode**: When no API key or offline, app runs local rule-based forensics

## Build Process

### Web Build (Firebase Hosting)
1. Install dependencies: `npm ci`
2. Create `.env.production` with API key: `echo "VITE_API_KEY=your-key" > .env.production`
3. Build: `npm run build`
4. Output: `dist/` directory contains optimized web app
5. Deploy: Firebase Hosting serves from `dist/`

### Android APK Build
1. Build web assets first (same as above)
2. Sync to Capacitor: `npx cap sync`
   - Copies `dist/` to `android/app/src/main/assets/public/`
   - API key is embedded in the JavaScript bundle
3. Build APK: `cd android && ./gradlew assembleDebug`
4. Output: `android/app/build/outputs/apk/debug/app-debug.apk`

## CI/CD Workflow

### Production Workflow (`.github/workflows/production.yml`)
This workflow runs on every push to `main` branch and performs:

1. **Web Build & Firebase Deploy**
   - Builds web assets with `VITE_API_KEY` from GitHub secrets
   - Deploys to Firebase Hosting (project: `verum-omnis-engine`)
   - Uses `FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_ENGINE` secret

2. **Android APK Build**
   - Runs after web deploy completes
   - Uses same web build (with embedded API key)
   - Syncs Capacitor
   - Builds debug APK with Gradle
   - Uploads APK as workflow artifact

### Required GitHub Secrets
- `VITE_API_KEY`: Your Google Gemini API key
- `FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_ENGINE`: Firebase service account JSON

## API Calling Verification

### How the APK Calls the API

1. **API Key Embedding**:
   - During build, Vite replaces `import.meta.env.VITE_API_KEY` with the actual key
   - The key becomes part of the compiled JavaScript bundle
   - This bundle is then packaged into the APK via Capacitor sync

2. **API Call Flow**:
   ```typescript
   const GEMINI_API_KEY = import.meta.env.VITE_API_KEY || '';
   const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
   const response = await ai.models.generateContent({
     model: 'gemini-2.5-flash',
     contents: { parts },
     config,
   });
   ```

3. **Network Requirements**:
   - APK needs internet connection to call Gemini API
   - Works on all Android devices with network access
   - Falls back to offline mode if no connection

### Testing API Functionality

#### After Web Deploy:
1. Visit deployed URL (Firebase Hosting)
2. Upload evidence files
3. Click "Initiate V5 Analysis"
4. Verify analysis completes and generates report

#### After APK Install:
1. Install APK on Android device or emulator
2. Grant necessary permissions (storage, network)
3. Upload evidence files
4. Click "Initiate V5 Analysis"
5. Verify API is called and report is generated

## Device Compatibility

### Web (Progressive Web App)
- ✅ Chrome, Firefox, Safari, Edge (modern versions)
- ✅ Works on desktop and mobile browsers
- ✅ Can be installed as PWA on supported devices
- ✅ Offline functionality with Service Worker

### Android APK
- ✅ Android 5.0 (API 21) and above
- ✅ Works on phones, tablets, and Chrome OS devices
- ✅ All data stored locally in app sandbox
- ✅ IndexedDB for persistent storage

## Security Considerations

1. **API Key Security**:
   - ⚠️ API key is embedded in client-side code (both web and APK)
   - ⚠️ This is acceptable for development but consider server-side proxy for production
   - ✅ Use API key restrictions in Google Cloud Console (HTTP referrers for web, Android app restrictions for APK)

2. **Data Privacy**:
   - ✅ All evidence files stored locally only
   - ✅ No user data sent to external servers (except API analysis requests)
   - ✅ Optional Firebase sync only stores metadata, not binary evidence
   - ✅ Users can export all data for desktop backup

## Troubleshooting

### APK doesn't call API
1. Check if API key is in environment during build
2. Verify `npx cap sync` was run after building web assets
3. Check Android device has internet connectivity
4. Review logcat for error messages: `adb logcat | grep -i gemini`

### Firebase deploy fails
1. Verify `FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_ENGINE` secret is set
2. Check project ID matches: `verum-omnis-engine`
3. Ensure Firebase Hosting is enabled in Firebase Console

### Build fails
1. Verify Node.js version 18+
2. Run `npm ci` to ensure clean dependency install
3. Check `VITE_API_KEY` is set in environment or `.env.production`
4. For Android: Verify Java 17 is installed

## Verification Checklist

After deployment, verify:
- [ ] Web app loads at Firebase Hosting URL
- [ ] Web app can call Gemini API (test with sample evidence)
- [ ] APK artifact is created in GitHub Actions
- [ ] APK can be installed on Android device
- [ ] APK can call Gemini API when online
- [ ] Offline mode works (local forensics) when API unavailable
- [ ] All data persists locally (check IndexedDB in browser/app)
- [ ] Export backup functionality works
