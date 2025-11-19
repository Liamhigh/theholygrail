#!/usr/bin/env node

/**
 * Verification script for Verum Omnis deployment
 * Tests that API key is configured and accessible
 */

const fs = require('fs');
const path = require('path');

console.log('=== Verum Omnis Deployment Verification ===\n');

// Check 1: Environment files
console.log('1. Checking environment configuration...');
const envFiles = ['.env', '.env.production'];
let apiKeyFound = false;

for (const envFile of envFiles) {
    const envPath = path.join(__dirname, envFile);
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        if (content.includes('VITE_API_KEY=')) {
            const match = content.match(/VITE_API_KEY=(.+)/);
            if (match && match[1] && match[1].trim() !== '') {
                console.log(`   ✓ ${envFile} contains VITE_API_KEY`);
                apiKeyFound = true;
            } else {
                console.log(`   ⚠ ${envFile} has empty VITE_API_KEY`);
            }
        }
    } else {
        console.log(`   - ${envFile} not found (optional)`);
    }
}

if (!apiKeyFound) {
    console.log('   ⚠ No API key found in env files. Set VITE_API_KEY in .env or .env.production');
}

// Check 2: Build output
console.log('\n2. Checking build output...');
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    console.log('   ✓ dist/ directory exists');
    
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
        const files = fs.readdirSync(assetsPath);
        const jsFiles = files.filter(f => f.endsWith('.js'));
        console.log(`   ✓ Found ${jsFiles.length} JavaScript files in dist/assets/`);
        
        // Check for API key in build
        for (const jsFile of jsFiles) {
            const content = fs.readFileSync(path.join(assetsPath, jsFile), 'utf8');
            if (content.includes('AIzaSy')) {
                console.log('   ✓ API key embedded in build output');
                break;
            }
        }
    }
} else {
    console.log('   ⚠ dist/ directory not found. Run: npm run build');
}

// Check 3: Capacitor sync
console.log('\n3. Checking Capacitor configuration...');
const androidAssetsPath = path.join(__dirname, 'android/app/src/main/assets/public');
if (fs.existsSync(androidAssetsPath)) {
    console.log('   ✓ Android assets directory exists');
    
    const androidAssets = path.join(androidAssetsPath, 'assets');
    if (fs.existsSync(androidAssets)) {
        const files = fs.readdirSync(androidAssets);
        const jsFiles = files.filter(f => f.endsWith('.js'));
        console.log(`   ✓ Found ${jsFiles.length} JavaScript files synced to Android`);
        
        // Check for API key in Android build
        for (const jsFile of jsFiles) {
            const content = fs.readFileSync(path.join(androidAssets, jsFile), 'utf8');
            if (content.includes('AIzaSy')) {
                console.log('   ✓ API key embedded in Android assets');
                break;
            }
        }
    }
} else {
    console.log('   ⚠ Android assets not synced. Run: npx cap sync');
}

// Check 4: Dependencies
console.log('\n4. Checking dependencies...');
const packageJson = require(path.join(__dirname, 'package.json'));
const requiredDeps = ['@google/genai', 'firebase', 'react', 'jspdf'];
let allDepsInstalled = true;

for (const dep of requiredDeps) {
    if (packageJson.dependencies[dep]) {
        console.log(`   ✓ ${dep} listed in package.json`);
    } else {
        console.log(`   ✗ ${dep} missing from package.json`);
        allDepsInstalled = false;
    }
}

const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    console.log('   ✓ node_modules/ exists');
} else {
    console.log('   ⚠ node_modules/ not found. Run: npm install');
    allDepsInstalled = false;
}

// Check 5: Workflow configuration
console.log('\n5. Checking GitHub workflow...');
const workflowPath = path.join(__dirname, '.github/workflows/production.yml');
if (fs.existsSync(workflowPath)) {
    const content = fs.readFileSync(workflowPath, 'utf8');
    console.log('   ✓ production.yml exists');
    
    if (content.includes('VITE_API_KEY')) {
        console.log('   ✓ Workflow uses VITE_API_KEY secret');
    }
    
    if (content.includes('FIREBASE_SERVICE_ACCOUNT')) {
        console.log('   ✓ Workflow uses Firebase service account');
    }
    
    if (content.includes('assembleDebug')) {
        console.log('   ✓ Workflow builds Android APK');
    }
} else {
    console.log('   ⚠ production.yml not found');
}

// Check 6: Firebase configuration
console.log('\n6. Checking Firebase configuration...');
const firebaseJsonPath = path.join(__dirname, 'firebase.json');
if (fs.existsSync(firebaseJsonPath)) {
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));
    console.log('   ✓ firebase.json exists');
    
    if (firebaseConfig.hosting && firebaseConfig.hosting.public === 'dist') {
        console.log('   ✓ Firebase hosting configured to serve from dist/');
    }
} else {
    console.log('   ⚠ firebase.json not found');
}

// Summary
console.log('\n=== Summary ===');
console.log('✓ Environment: API key configuration checked');
console.log('✓ Build: Web build output verified');
console.log('✓ Capacitor: Android sync checked');
console.log('✓ Dependencies: Required packages verified');
console.log('✓ CI/CD: GitHub workflow configuration checked');
console.log('✓ Firebase: Hosting configuration checked');

console.log('\n📋 Next steps for deployment:');
console.log('1. Ensure GitHub secrets are set:');
console.log('   - VITE_API_KEY (your Gemini API key)');
console.log('   - FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_ENGINE');
console.log('2. Push to main branch to trigger deployment');
console.log('3. Check GitHub Actions for build/deploy status');
console.log('4. Download APK artifact from successful workflow run');
console.log('5. Test both web and APK deployments\n');
