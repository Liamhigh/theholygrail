#!/bin/bash

# Test Firebase Functions locally
# This script helps test the legal advice API endpoint

set -e

echo "Testing Verum Omnis Firebase Functions"
echo "======================================="
echo ""

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if functions dependencies are installed
if [ ! -d "functions/node_modules" ]; then
    echo "📦 Installing functions dependencies..."
    cd functions
    npm install
    cd ..
fi

# Start emulator in background
echo "🚀 Starting Firebase Functions emulator..."
firebase emulators:start --only functions &
EMULATOR_PID=$!

# Wait for emulator to start
echo "⏳ Waiting for emulator to start..."
sleep 10

# Test health check endpoint
echo ""
echo "Testing Health Check endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:5001/verum-omnis-v2/us-central1/healthCheck)
echo "Response: $HEALTH_RESPONSE"

if echo "$HEALTH_RESPONSE" | grep -q "ok"; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
fi

# Test legal advice endpoint
echo ""
echo "Testing Legal Advice endpoint..."
ADVICE_RESPONSE=$(curl -s -X POST http://localhost:5001/verum-omnis-v2/us-central1/legalAdvice \
  -H "Content-Type: application/json" \
  -d '{"summary": "Test case: Contract dispute with evidence of breach. Client seeks damages."}')

echo "Response: $ADVICE_RESPONSE"

if echo "$ADVICE_RESPONSE" | grep -q "output"; then
    echo "✅ Legal advice API working"
else
    echo "❌ Legal advice API failed"
    echo "Make sure OPENAI_API_KEY is set in Firebase Functions config"
fi

# Stop emulator
echo ""
echo "🛑 Stopping emulator..."
kill $EMULATOR_PID

echo ""
echo "Testing complete!"
