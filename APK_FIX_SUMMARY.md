# APK API Calling Issue - Fix Summary

## Problem
The APK was not calling the Gemini API after build, even though the web version worked correctly.

## Root Cause
The previous fix (commit 72f6c9b) attempted to manually copy web assets to the Android app:
```bash
mkdir -p android/app/src/main/assets/public
cp -r dist/* android/app/src/main/assets/public/
```

This approach bypassed Capacitor's proper asset management system, which is responsible for:
- Copying web assets to the correct location
- Injecting configuration into the Android app
- Managing the WebView integration

## Solution
Replace manual file copying with Capacitor's built-in sync mechanism:
```bash
npx cap sync android
```

This command:
1. Copies the `dist/` folder contents to `android/app/src/main/assets/public/`
2. Creates `capacitor.config.json` in `android/app/src/main/assets/`
3. Updates Android plugins and dependencies
4. Ensures proper WebView configuration

## Changes Made

### 1. Updated `.github/workflows/production.yml`
**Before:**
```yaml
- name: Copy web assets to Android
  run: |
    mkdir -p android/app/src/main/assets/public
    cp -r dist/* android/app/src/main/assets/public/
```

**After:**
```yaml
- name: Sync web assets to Android using Capacitor
  run: npx cap sync android
```

### 2. Updated `capacitor.config.json`
Removed the deprecated `bundledWebRuntime` option to eliminate build warnings.

## Verification

### API Key Embedding
The VITE_API_KEY is properly embedded at build time through Vite's `define` configuration in `vite.config.ts`:
```typescript
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    define: {
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
    // ...
  }
})
```

### Build Process Verification
1. **Web Build**: `npm run build` creates optimized files in `dist/` with the API key embedded
2. **Capacitor Sync**: `npx cap sync android` copies these files to Android assets
3. **Android Build**: Gradle builds the APK with the synced assets
4. **Runtime**: The app reads the embedded API key from `import.meta.env.VITE_API_KEY`

### Testing the Fix
To verify the fix works:

```bash
# 1. Create .env.production with your API key
echo "VITE_API_KEY=your_api_key_here" > .env.production

# 2. Build the web assets
npm run build

# 3. Verify API key is in dist/
grep -r "AIzaSy" dist/

# 4. Sync to Android
npx cap sync android

# 5. Verify API key is in Android assets
grep -r "AIzaSy" android/app/src/main/assets/

# 6. Build APK
cd android && ./gradlew assembleRelease
```

## How the Application Uses the API Key

In `src/index.tsx`, the API key is accessed as:
```typescript
const GEMINI_API_KEY = import.meta.env.VITE_API_KEY || '';

// Later in the code:
const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

const response = await ai.models.generateContent({
    model: modelName,
    contents: { parts },
    config,
});
```

Since Vite's `define` replaces `import.meta.env.VITE_API_KEY` with the actual string value at build time, the APK will have the API key embedded in the JavaScript bundle.

## Expected Behavior After Fix

1. **Web Build**: API calls work ✓
2. **APK Build**: API calls work ✓
3. **Firebase Deploy**: API calls work ✓
4. **Offline Mode**: Falls back to local forensics ✓

## Additional Notes

- The API key is embedded at build time, not runtime
- Each environment (dev, production) can have its own API key via `.env` files
- The workflow creates `.env.production` before building, ensuring the production API key is used
- Capacitor handles all asset synchronization automatically
