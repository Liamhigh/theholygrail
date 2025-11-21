# Build Assets Documentation

## Overview

This repository uses a build-time asset extraction system to include assets and videos in the production build and deployment.

## How It Works

### Assets
- **Source**: `assets.zip` (contains logo.png, logo_black.png, logo_white.png)
- **During Build**: Extracted to `public/assets/` 
- **Result**: Copied to `dist/assets/` by Vite

### Videos
- **Source**: `videos/` directory (Git LFS tracked)
- **During Build**: Copied to `public/videos/`
- **Result**: Copied to `dist/videos/` by Vite

### Build Process

All CI/CD workflows include this step before building:

```bash
# Extract assets and prepare videos
unzip -q assets.zip -d public/
cp -r videos public/
```

This ensures that:
1. Assets from `assets.zip` are available in the build
2. Videos are included in the deployment
3. Both are copied to `dist/` for Firebase Hosting and Android APK

## File Locations

### Development
- Assets: Not in `public/` by default (extracted during build)
- Videos: Source in `videos/` directory

### Production Build (`dist/`)
- Assets: `dist/assets/logo.png`, `dist/assets/logo_black.png`, `dist/assets/logo_white.png`
- Videos: `dist/videos/` (any .mp4, .mov, etc. files)

### Deployment
- **Firebase Hosting**: Serves files from `dist/`
- **Android APK**: Includes files from `dist/` in app assets

## Accessing Assets in Code

### In React/TypeScript

```typescript
// Logo assets
<img src="/assets/logo.png" alt="Logo" />
<img src="/assets/logo_black.png" alt="Logo Black" />
<img src="/assets/logo_white.png" alt="Logo White" />

// Videos
<video src="/videos/your-video.mp4" controls />
```

### URLs in Production

```
https://your-app.web.app/assets/logo.png
https://your-app.web.app/assets/logo_black.png
https://your-app.web.app/assets/logo_white.png
https://your-app.web.app/videos/your-video.mp4
```

## Configuration Files

### Vite Config (`vite.config.ts`)

The workbox configuration includes video file patterns:

```typescript
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,mp4,mov,avi,mkv,webm,flv,wmv,m4v,mpeg,mpg,jpg,jpeg,gif}']
}
```

### Firebase Config (`firebase.json`)

Headers are configured for video files with 1-year cache:

```json
{
  "source": "**/*.@(mp4|mov|avi|mkv|webm|flv|wmv|m4v|mpeg|mpg)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000"
    }
  ]
}
```

Note: Content-Type is automatically detected by Firebase based on file extension.

### Git Ignore (`.gitignore`)

The extracted files are ignored in git:

```
# Build-time extracted assets (generated from assets.zip and videos/)
public/assets/
public/videos/
```

## Workflows Updated

The following GitHub Actions workflows include asset extraction:

1. `.github/workflows/deploy-and-build.yml` - Main deployment (both jobs)
2. `.github/workflows/production.yml` - Production deployment
3. `.github/workflows/firebase-hosting-merge.yml` - Firebase on merge
4. `.github/workflows/android-build.yml` - Android APK build

## Adding New Assets

### New Images/Logos

1. Add them to `assets.zip`:
   ```bash
   zip -r assets.zip assets/
   ```
2. Commit the updated `assets.zip`

### New Videos

1. Add video to `videos/` directory:
   ```bash
   cp ~/Downloads/my-video.mp4 videos/
   ```
2. Commit (Git LFS will handle it automatically):
   ```bash
   git add videos/
   git commit -m "Add new video"
   ```

## Cache Control

- **Assets**: Cached for 1 year (31536000 seconds)
- **Videos**: Cached for 1 year (31536000 seconds)
- **Service Worker**: Precaches assets but excludes files > 2.26 MB

## Notes

- Large video files use Git LFS for efficient storage
- Assets are extracted during build, not committed to `public/`
- All video formats (.mp4, .mov, .avi, etc.) are supported
- PWA service worker includes video files in glob patterns
