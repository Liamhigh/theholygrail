# Termux CLI Guide: Upload Video to Repository

This guide provides step-by-step Termux commands to upload your 40MB video file to this repository.

## Prerequisites

First, install the required packages in Termux:

```bash
pkg update && pkg upgrade -y
pkg install git git-lfs openssh -y
```

## One-Time Setup

### 1. Configure Git (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Set up GitHub Authentication

You have two options:

#### Option A: Personal Access Token (Recommended)

1. Create a token at: https://github.com/settings/tokens
2. Select scopes: `repo` (full control of private repositories)
3. Copy the token and use it as your password when pushing

#### Option B: SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Display your public key
cat ~/.ssh/id_ed25519.pub

# Add this key to GitHub at: https://github.com/settings/keys
```

### 3. Initialize Git LFS

```bash
git lfs install
```

## Upload Your Video File

### Step 1: Clone the Repository

```bash
# Navigate to your desired location
cd ~/storage/shared  # or any directory you prefer

# Clone the repository (HTTPS)
git clone https://github.com/Liamhigh/theholygrail.git

# OR if using SSH
git clone git@github.com:Liamhigh/theholygrail.git

# Enter the repository
cd theholygrail
```

### Step 2: Create a New Branch

```bash
# Create and switch to a new branch for your video
git checkout -b add-video-file
```

### Step 3: Copy Your Video to the Repository

```bash
# Option 1: If your video is in Downloads
cp ~/storage/downloads/your-video.mp4 videos/

# Option 2: If your video is elsewhere, adjust the path
cp /path/to/your-video.mp4 videos/

# Rename if needed
mv videos/your-video.mp4 videos/demo-video.mp4
```

### Step 4: Verify Git LFS is Tracking the Video

```bash
# Check that the video will be tracked by Git LFS
git lfs track

# You should see: *.mp4 (and other video formats)
```

### Step 5: Add and Commit the Video

```bash
# Stage the video file
git add videos/

# Check the status (should show the file is tracked by LFS)
git lfs status

# Commit with a message
git commit -m "Add demo video file"
```

### Step 6: Push to GitHub

```bash
# Push your branch to GitHub
git push origin add-video-file

# If using personal access token, you'll be prompted for:
# Username: your-github-username
# Password: your-personal-access-token
```

### Step 7: Create a Pull Request

After pushing, GitHub will show a link in the terminal to create a Pull Request, or visit:
```
https://github.com/Liamhigh/theholygrail/compare/add-video-file
```

## Quick Command Summary

```bash
# Complete workflow in one go
cd ~/storage/shared
git clone https://github.com/Liamhigh/theholygrail.git
cd theholygrail
git checkout -b add-video-file
cp ~/storage/downloads/your-video.mp4 videos/demo-video.mp4
git add videos/
git commit -m "Add demo video file"
git push origin add-video-file
```

## Troubleshooting

### Video File Too Large Error

If you get an error about file size, ensure Git LFS is properly initialized:

```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
git add videos/
git commit -m "Add video with Git LFS"
```

### Permission Denied (publickey)

If using SSH and getting permission denied:

```bash
# Test your SSH connection
ssh -T git@github.com

# If it fails, check your SSH key is added to GitHub
cat ~/.ssh/id_ed25519.pub
```

### Authentication Failed

If using HTTPS and authentication fails:
- Make sure you're using a Personal Access Token, not your GitHub password
- Generate a new token at: https://github.com/settings/tokens

## Locating Your Video File

Common video locations on Android:

```bash
# Camera videos
~/storage/dcim/Camera/

# Downloaded videos
~/storage/downloads/

# Shared storage (general)
~/storage/shared/

# List all video files
find ~/storage -name "*.mp4" -o -name "*.mov" 2>/dev/null
```

## Verify Upload Success

After pushing, verify the file is stored in Git LFS:

```bash
# Check LFS files
git lfs ls-files

# Should show your video file with its size
```

## Notes

- Git LFS is configured to automatically track all video files (.mp4, .mov, .avi, .mkv, .webm, etc.)
- The 40MB video will be stored efficiently using Git LFS
- Your video will be placed in the `videos/` directory
- Large files are not stored directly in Git, but as LFS pointers

## Need Help?

If you encounter any issues:
1. Check Git status: `git status`
2. Check LFS status: `git lfs status`
3. View Git log: `git log --oneline -5`
4. Check remote: `git remote -v`
