# Verum Omnis - Forensic Engine

Verum Omnis is a powerful, stateless, and secure forensic analysis engine. It leverages the Google Gemini API to perform deep analysis on legal documents, images, and other evidence, producing comprehensive, court-ready forensic reports.

Built as a Progressive Web App (PWA), it runs entirely on-device, ensuring user data is never uploaded or stored on external servers. It is designed for cross-platform use, functioning seamlessly in modern web browsers and as a native Android application via Capacitor.

**🌍 Free for Every Private Citizen on the Planet** - This forensic engine is provided free of charge to all private citizens worldwide, empowering individuals with professional-grade forensic analysis tools for personal legal matters.

## **No Backend Architecture - Forensics on Your Device**

**This application does NOT use a backend server for forensic analysis.** All forensic processing, evidence analysis, and report generation happen 100% on the user's device (browser or mobile app). Your evidence files never leave your device during the forensic analysis process.

- ✅ **All forensic analysis runs locally** on your device using the Google Gemini API directly from the browser
- ✅ **Evidence files stay on your device** - stored in IndexedDB (local browser storage)
- ✅ **Reports are generated locally** - PDF creation happens in-browser
- ✅ **No server-side processing** - no backend receives or processes your evidence
- ✅ **Zero data collection** - This application does NOT rake, collect, track, or store any of your private information on external servers
- ✅ **Cryptographically sealed documents** - All reports are sealed with SHA-256 cryptographic hashes to verify integrity
- ⚠️ **Optional metadata sync only** - Firebase integration (if configured) only syncs case metadata, never evidence files or forensic analysis results

## **Privacy & Security Guarantee**

**We do not collect, rake, track, or store your private information.** This application is designed with privacy-first architecture:

- 🔒 **No tracking** - No analytics, cookies, or user tracking
- 🔒 **No data collection** - Your evidence and case data stays on your device only
- 🔒 **No user accounts** - No registration or login required
- 🔒 **Cryptographic sealing** - All generated reports are cryptographically sealed with SHA-256 hashes for tamper detection
- 🔒 **Complete privacy** - Your legal matters remain completely private to you

## Key Features

-   **🆓 Free for All Private Citizens:** Available at no cost to every private citizen worldwide for personal legal matters.
-   **🔒 Zero Data Collection:** Does NOT rake, collect, or track your private information. Complete privacy guaranteed.
-   **📴 Works Completely Offline (No API Required):** The APK can perform full forensic analysis without internet or API keys using the V5 Offline Forensics Engine.
-   **🏛️ Advanced Legal Validation Engine:** Built-in legal precedent verification (Brain B7) and real legal validation against case law databases.
-   **⚖️ Contradiction Detection System:** Powered by the B1 Contradiction Engine that flags contradictory statements across evidence.
-   **✓✓✓ Triple Verification System:** Multi-layered verification through chain integrity (B2), metadata validation (B3), and content contradiction analysis (B1).
-   **📁 Complete Case File Builder:** Builds comprehensive case files with master file integrity verification and cryptographic sealing.
-   **🔐 Cryptographically Sealed Reports:** All reports sealed with SHA-256 cryptographic hashes for tamper detection and integrity verification.
-   **100% Client-Side Forensic Processing:** All forensic analysis is performed securely on your device (in the browser or mobile app), guaranteeing privacy and confidentiality. No backend server processes your evidence.
-   **Multi-modal Evidence Analysis:** Supports a wide range of file types including text, `.txt`, `.pdf`, and common image formats (`.png`, `.jpg`, etc.).
-   **Dual Analysis Modes:** V5 Offline Engine (no API needed) + Optional AI-Enhanced mode with Gemini API for advanced content analysis.
-   **Structured Forensic Reports:** Generates highly-structured reports in Markdown, detailing executive summaries, timelines, liability assessments, strategic recommendations, and more.
-   **Device-Only Storage:** Evidence and reports are stored locally in IndexedDB on your device - never uploaded to external servers.
-   **Offline-First & Installable:** Fully functional without an internet connection. Can be installed on any device as a PWA or Android APK.
-   **Production Ready:** Configured for deployment on Firebase Hosting (static files only) and for building into a native Android application with Capacitor.

## Tech Stack

-   **Frontend:** React, TypeScript, Vite
-   **AI:** Google Gemini API (`@google/genai`)
-   **PDF Generation:** jsPDF
-   **Native Runtime:** Capacitor
-   **Hosting:** Firebase Hosting (static files only)
-   **CI/CD:** GitHub Actions

## V5 Forensic Analysis Engine

This application uses the powerful **V5 Rules-Based Forensic Analysis System** with multiple specialized "brains" for comprehensive evidence analysis:

### Core Analysis Engines

1. **B1: Contradiction Engine** 🔍
   - Detects contradictory statements across evidence
   - Flags conflicts between different actors about the same event
   - Cross-references timestamps and statements for consistency
   - Implements triple-verification protocols

2. **B2: Document & Image Forensics** 📄
   - SHA-256 cryptographic hash generation for all evidence
   - Chain integrity verification (tamper detection)
   - Document authenticity validation
   - Image metadata analysis

3. **B3: Communications Channel Integrity** 📡
   - Metadata completeness verification
   - Source validation and chain of custody
   - Missing information detection
   - Timeline consistency checking

4. **B4: Linguistics Analysis** 🗣️
   - Timestamp drift detection
   - Language pattern analysis
   - Authorship verification support

5. **B6: Financial Patterns** 💰
   - Transaction anomaly detection
   - Financial behavior outlier identification
   - Cross-reference with expected patterns

6. **B7: Legal Validation** ⚖️
   - **Real legal precedent verification**
   - Citation validation against case law
   - Legal claim consistency checking
   - Constitutional compliance analysis

7. **B8: Voice & Audio Forensics** 🎤
   - Voiceprint verification
   - Audio authenticity detection
   - Speaker identification support

### Case File Building System

- **Master Case Files:** Combines multiple reports with integrity verification
- **Individual Report Hashes:** Each report cryptographically sealed
- **Evidence File Tracking:** Complete chain of custody with timestamps
- **Cross-Report Analysis:** Identifies patterns and contradictions across multiple analyses

## Architecture: How Forensics Work on Your Device

### Web Version (Browser)
1. User uploads evidence files → stored in browser's IndexedDB
2. Click "Analyze" → Gemini API called directly from browser (API key embedded at build time)
3. AI analysis happens via Gemini's servers, but **evidence files never leave your device**
4. Report generated locally in browser → can be exported as PDF

### APK Version (Android App)
**The APK can operate in TWO modes:**

#### Mode 1: Offline-Only (No API Key Required)
1. User uploads evidence files → stored in device's IndexedDB
2. Click "Analyze" → **V5 Offline Forensics Engine activates automatically**
3. Professional-grade forensic analysis runs 100% on device using rule-based algorithms
4. Report generated locally with cryptographic sealing → can be exported as PDF
5. **No internet connection required** - Complete forensic analysis without API

**Offline Mode Capabilities:**
- ✓ SHA-256 cryptographic hashing and tamper detection (B2)
- ✓ Metadata validation and chain of custody (B3)
- ✓ Timeline construction and temporal analysis (B4)
- ✓ File type analysis and pattern recognition
- ✓ Basic contradiction detection (B1)
- ✓ Cryptographically sealed PDF reports

#### Mode 2: AI-Enhanced (API Key Embedded at Build)
1. User uploads evidence files → stored in device's IndexedDB
2. Click "Analyze" → Gemini API called directly from the app (API key embedded in APK at build time)
3. AI analysis happens via Gemini's servers, but **evidence files never leave your device**
4. Enhanced report with advanced content analysis → exported as PDF

**AI Mode Additional Features:**
- Advanced natural language contradiction detection
- Legal precedent verification (B7)
- Strategic recommendations and draft communications
- Content-based analysis beyond metadata

### Key Points:
- **No backend server** - The app doesn't have or need a backend server for forensic processing
- **APK works offline without API** - The APK can perform complete forensic analysis using the V5 Offline Engine without requiring a Gemini API key
- **Optional AI enhancement** - API key can be embedded at build time via `VITE_API_KEY` for AI-enhanced analysis
- **Evidence stays local** - Files are stored in IndexedDB and never uploaded to any server
- **Direct API calls (when online)** - The app calls Google Gemini API directly from browser/device when API key is present
- **Optional Firebase** - If configured, Firebase only syncs case metadata (not evidence files or analysis results)

## Project Structure

```
/
├── .github/workflows/         # GitHub Actions for CI/CD
├── dist/                      # Production build output (generated)
├── src/
│   └── index.tsx              # Main React application component
├── android/                   # Native Android project (generated by Capacitor)
├── capacitor.config.json      # Capacitor configuration
├── firebase.json              # Firebase Hosting configuration
├── index.html                 # Main HTML entry point
├── package.json
└── README.md                  # This file
```

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm (v8 or later)

### Local Development

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-repo/verum-omnis-engine.git
    cd verum-omnis-engine
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **API Key Configuration:**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```
    VITE_API_KEY=your_gemini_api_key_here
    ```
    This key is used for AI-powered forensic analysis and is embedded into builds (both web and APK) at build time.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Build and Deployment

### Production Web Build

To create an optimized production build of the web app:

```bash
npm run build
```

The output files will be generated in the `dist/` directory.

### Firebase Hosting

This project is configured for continuous deployment to Firebase Hosting. Every push to the `main` branch triggers the GitHub Actions workflow defined in `.github/workflows/firebase-hosting.yml`. This workflow automatically builds and deploys the application.

For the workflow to succeed, you must configure the following secrets in your GitHub repository settings:
-   `VITE_API_KEY`: Your Google Gemini API key.
-   `FIREBASE_SERVICE_ACCOUNT_VERUM_OMNIS_ENGINE`: The JSON content of your Firebase service account key.

## Mobile Development (Capacitor)

The APK is a fully functional forensic engine that runs entirely on the device. **It can operate with or without an API key.**

### Building APK Without API Key (Offline-Only Mode)

For a completely offline APK that doesn't require any API configuration:

1.  **Build the Web Assets:**
    ```bash
    npm run build
    ```
    The build will work without VITE_API_KEY set. The APK will use the V5 Offline Forensics Engine.

2.  **Initialize the Android Platform (First time only):**
    ```bash
    npx cap add android
    ```

3.  **Sync Web Assets with Android Project:**
    ```bash
    npx cap sync
    ```

4.  **Open in Android Studio:**
    ```bash
    npx cap open android
    ```
    Build and sign your APK. It will provide complete forensic analysis capabilities without requiring internet or API keys.

### Building APK With API Key (AI-Enhanced Mode)

For an APK with optional AI-enhanced analysis capabilities:

1.  **Configure API Key:**
    Create a `.env` file with your Gemini API key (will be embedded in the APK at build time):
    ```
    VITE_API_KEY=your_gemini_api_key_here
    ```

2.  **Build the Web Assets:**
    ```bash
    npm run build
    ```

3.  **Sync and Build:**
    ```bash
    npx cap sync
    npx cap open android
    ```

The APK will automatically use AI-enhanced analysis when online, or fall back to offline mode when no connection is available.
    ```
    From Android Studio, you can run the app on an emulator or a connected physical device.

## Contributing

Contributions are welcome. Please open an issue to discuss any changes or submit a pull request with a clear description of your improvements.

## License

This project is licensed under the MIT License.
