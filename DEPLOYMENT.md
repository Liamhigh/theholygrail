# Deployment Guide for Verum Omnis Forensic Engine

This guide covers how to deploy the Verum Omnis application to Firebase Hosting and build the Android APK.

## Prerequisites

### Required Tools
- Node.js 20.x or later
- npm (comes with Node.js)
- Java Development Kit (JDK) 17
- Android SDK (for local APK builds)

### Required Secrets (for GitHub Actions)

Configure the following secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

1. **VITE_API_KEY**: Your Google Gemini API key
2. **FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_V2**: Firebase service account JSON (see below for how to get this)

## Automated Deployment (GitHub Actions)

The repository includes a comprehensive workflow that automatically:
1. Deploys the web application to Firebase Hosting
2. Builds the Android APK
3. Uploads the APK as a GitHub Actions artifact

### Trigger Deployment

The deployment workflow runs automatically when:
- Code is pushed to the `main` branch
- Manually triggered via GitHub Actions UI

### Workflow Features

- **Firebase Deployment**: Deploys the latest web build to Firebase Hosting
- **APK Build**: Creates a production-ready Android APK
- **Artifact Upload**: Makes the APK available for download from GitHub Actions
- **Caching**: Uses npm and gradle caching for faster builds

## Manual Deployment

### 1. Deploy to Firebase Hosting

```bash
# Install dependencies
npm install

# Build the web application
npm run build

# Install Firebase CLI globally (if not already installed)
npm install -g firebase-tools

# Login to Firebase (first time only)
firebase login

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### 2. Build Android APK

```bash
# Install dependencies
npm install

# Build web assets
npm run build

# Sync web assets to Android project
npx cap sync android

# Build the release APK
cd android
./gradlew assembleRelease

# The APK will be located at:
# android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## Firebase Setup

### Getting Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`verum-omnis-v2`)
3. Go to Project Settings (gear icon) → Service Accounts
4. Click "Generate New Private Key"
5. Save the downloaded JSON file securely
6. Copy the entire contents of the JSON file
7. Add it as a GitHub secret named `FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_V2`

### Firebase Project Configuration

The project is configured to deploy to:
- **Project ID**: `verum-omnis-v2`
- **Hosting Directory**: `dist` (built from Vite)

Configuration is in `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## API Key Configuration

### For Web Deployment

The application uses the `VITE_API_KEY` environment variable for the Google Gemini API. This is configured through:

1. **Local Development**: `.env` file (not committed to git)
2. **Production Build**: `.env.production` file (created by GitHub Actions)
3. **Runtime**: Vite injects this at build time as `import.meta.env.VITE_API_KEY`

### For Android APK

The same `VITE_API_KEY` is used and embedded in the web assets that are bundled into the APK.

## Testing the Deployment

### Test Firebase Deployment

After deployment, your app will be available at:
- Production: `https://verum-omnis-v2.web.app`
- Or your custom domain if configured

### Test APK

1. Download the APK from GitHub Actions artifacts or build it locally
2. Install on an Android device or emulator:
   ```bash
   adb install verum-omnis-engine.apk
   ```
3. Test key features:
   - File upload and analysis
   - PDF report generation
   - Offline functionality
   - API connectivity

## Key Features to Verify

After deployment, verify these features work correctly:

- [ ] Application loads without errors
- [ ] File upload works (images, PDFs, text files)
- [ ] Forensic analysis runs (calls Gemini API)
- [ ] PDF report generation works
- [ ] Cryptographic sealing works correctly
- [ ] Case management (save/load cases)
- [ ] Offline functionality
- [ ] PWA installation (web version)

## Troubleshooting

### Firebase Deployment Issues

**Problem**: Deployment fails with authentication error
**Solution**: Regenerate Firebase service account key and update GitHub secret

**Problem**: Website shows 404 after deployment
**Solution**: Ensure `firebase.json` has correct `public` directory set to `dist`

### APK Build Issues

**Problem**: Gradle build fails
**Solution**: Ensure Java 17 is installed and `JAVA_HOME` is set correctly

**Problem**: APK doesn't load web assets
**Solution**: Run `npx cap sync android` after building web assets

### API Issues

**Problem**: API calls fail in production
**Solution**: Verify `VITE_API_KEY` is correctly set in GitHub secrets

## Security Notes

1. **Never commit** `.env` files containing real API keys
2. **Use GitHub Secrets** for all sensitive credentials
3. **Rotate API keys** periodically
4. **Review Firebase security rules** to ensure proper data access controls
5. **Sign APK** for production distribution (current workflow produces unsigned APK)

## APK Signing (Production)

For production distribution, you should sign the APK:

1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
   ```

2. Update `android/app/build.gradle` with signing config
3. Add keystore to GitHub secrets
4. Update workflow to use signed build configuration

## Continuous Deployment

The GitHub Actions workflow is configured for continuous deployment:
- Every push to `main` triggers deployment to Firebase and APK build
- APK artifacts are retained for 30 days
- Deployment can also be triggered manually from GitHub Actions UI

## Support and Documentation

- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Capacitor Documentation**: https://capacitorjs.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/
- **Project README**: See main README.md for application features and development setup
