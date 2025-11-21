# Videos Directory

This directory contains video files for the Verum Omnis project.

## Adding Videos

All video files are automatically tracked using Git LFS (Large File Storage) to handle large file sizes efficiently.

### Supported Video Formats

- MP4 (.mp4)
- MOV (.mov)
- AVI (.avi)
- MKV (.mkv)
- WebM (.webm)
- FLV (.flv)
- WMV (.wmv)
- M4V (.m4v)
- MPEG (.mpeg, .mpg)

## Uploading from Termux

If you're using Termux on Android to upload video files, see the [TERMUX_GUIDE.md](../TERMUX_GUIDE.md) for complete CLI instructions.

## Quick Upload (Command Line)

```bash
# 1. Copy your video here
cp /path/to/your/video.mp4 videos/

# 2. Add and commit
git add videos/
git commit -m "Add video file"

# 3. Push to GitHub
git push
```

Git LFS will automatically handle the large file upload.
