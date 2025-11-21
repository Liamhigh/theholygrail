# 🚀 Quick Command Reference for Termux

Copy and paste these commands directly into Termux to upload your video.

## First Time Setup (One-Time Only)

```bash
# Install required packages
pkg update && pkg upgrade -y
pkg install git git-lfs openssh -y

# Configure git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize Git LFS
git lfs install
```

## Clone Repository (First Time)

```bash
# Go to your preferred directory
cd ~/storage/shared

# Clone the repo
git clone https://github.com/Liamhigh/theholygrail.git
cd theholygrail
```

## Upload Your Video (Each Time)

### Option 1: Using the Upload Script (Easiest)

```bash
cd ~/storage/shared/theholygrail
./upload-video.sh ~/storage/downloads/your-video.mp4
```

### Option 2: Manual Commands

```bash
# Navigate to repository
cd ~/storage/shared/theholygrail

# Create a new branch
git checkout -b add-video-file

# Copy video (adjust path to your video location)
cp ~/storage/downloads/your-video.mp4 videos/

# Add and commit
git add videos/
git commit -m "Add video file"

# Push to GitHub
git push origin add-video-file
```

## Find Your Video File

```bash
# List all video files in storage
find ~/storage -name "*.mp4" 2>/dev/null

# Common locations:
# ~/storage/dcim/Camera/          # Camera videos
# ~/storage/downloads/            # Downloaded videos
# ~/storage/movies/               # Movies folder
```

## Verify Upload

```bash
# Check if video is tracked by Git LFS
git lfs ls-files

# Check repository status
git status
```

## Common Issues

### Authentication Required

When pushing, you'll need:
- **Username:** Your GitHub username
- **Password:** Personal Access Token (NOT your GitHub password)

Create token at: https://github.com/settings/tokens
Select scope: `repo`

### Already Have Local Changes?

```bash
# Pull latest changes first
git pull origin main

# Then create your branch
git checkout -b add-video-file
```

## Need Full Instructions?

See [TERMUX_GUIDE.md](TERMUX_GUIDE.md) for complete documentation.
