#!/bin/bash
# Quick Upload Script for Termux
# Save this file and make it executable: chmod +x upload-video.sh
# Usage: ./upload-video.sh /path/to/video.mp4

# Check if video file path is provided
if [ -z "$1" ]; then
    echo "Usage: ./upload-video.sh /path/to/video.mp4"
    echo ""
    echo "Example:"
    echo "  ./upload-video.sh ~/storage/downloads/my-video.mp4"
    exit 1
fi

VIDEO_PATH="$1"
VIDEO_NAME=$(basename "$VIDEO_PATH")

# Check if file exists
if [ ! -f "$VIDEO_PATH" ]; then
    echo "Error: File not found: $VIDEO_PATH"
    exit 1
fi

echo "📹 Uploading video: $VIDEO_NAME"
echo "📏 File size: $(du -h "$VIDEO_PATH" | cut -f1)"
echo ""

# Check if we're in the repository
if [ ! -d ".git" ]; then
    echo "Error: Not in a git repository. Please cd to the theholygrail directory first."
    exit 1
fi

# Create videos directory if it doesn't exist
mkdir -p videos

# Copy video to videos directory
echo "📂 Copying video to videos/ directory..."
cp "$VIDEO_PATH" "videos/$VIDEO_NAME"

# Add to git
echo "➕ Adding to git..."
git add videos/

# Check LFS status
echo "🔍 Git LFS Status:"
git lfs status

# Commit
echo ""
read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Add video file: $VIDEO_NAME"
fi

git commit -m "$COMMIT_MSG"

# Push
echo ""
read -p "Push to GitHub now? (y/n): " PUSH_NOW
if [ "$PUSH_NOW" = "y" ] || [ "$PUSH_NOW" = "Y" ]; then
    BRANCH=$(git branch --show-current)
    echo "🚀 Pushing to origin/$BRANCH..."
    git push origin "$BRANCH"
    echo ""
    echo "✅ Video uploaded successfully!"
else
    echo "⏸️  Changes committed locally. Push later with: git push"
fi
