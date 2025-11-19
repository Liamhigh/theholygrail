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
-   **🏛️ Advanced Legal Validation Engine:** Built-in legal precedent verification (Brain B7) and real legal validation against case law databases.
-   **⚖️ Contradiction Detection System:** Powered by the B1 Contradiction Engine that flags contradictory statements across evidence.
-   **✓✓✓ Triple Verification System:** Multi-layered verification through chain integrity (B2), metadata validation (B3), and content contradiction analysis (B1).
-   **📁 Complete Case File Builder:** Builds comprehensive case files with master file integrity verification and cryptographic sealing.
-   **🔐 Cryptographically Sealed Reports:** All reports sealed with SHA-256 cryptographic hashes for tamper detection and integrity verification.
-   **100% Client-Side Forensic Processing:** All forensic analysis is performed securely on your device (in the browser or mobile app), guaranteeing privacy and confidentiality. No backend server processes your evidence.
-   **Multi-modal Evidence Analysis:** Supports a wide range of file types including text, `.txt`, `.pdf`, and common image formats (`.png`, `.jpg`, etc.).
-   **Dynamic Model Selection:** Automatically utilizes `gemini-2.5-flash` for general cases and `gemini-2.5-pro` with an enhanced thinking budget for more complex evidence like PDFs.
-   **Structured Forensic Reports:** Generates highly-structured reports in Markdown, detailing executive summaries, timelines, liability assessments, strategic recommendations, and more.
-   **Device-Only Storage:** Evidence and reports are stored locally in IndexedDB on your device - never uploaded to external servers.
-   **Offline-First & Installable:** Fully functional without an internet connection for case preparation. It can be installed on any device as a PWA.
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
1. User uploads evidence files → stored in device's IndexedDB
2. Click "Analyze" → Gemini API called directly from the app (API key embedded in APK at build time)
3. AI analysis happens via Gemini's servers, but **evidence files never leave your device**
4. Report generated locally on device → can be exported as PDF

### Key Points:
- **No backend server** - The app doesn't have or need a backend server for forensic processing
- **API key embedded at build time** - Both web and APK builds include the Gemini API key via `VITE_API_KEY`
- **Evidence stays local** - Files are stored in IndexedDB and never uploaded to any server
- **Direct API calls** - The app calls Google Gemini API directly from browser/device
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

The APK is a fully functional forensic engine that runs entirely on the device. To build the Android app:

1.  **Configure API Key:**
    Ensure your `.env` file contains your Gemini API key (this will be embedded in the APK at build time):
    ```
    VITE_API_KEY=your_gemini_api_key_here
    ```

2.  **Build the Web Assets:**
    Ensure you have a fresh production build with the API key embedded.
    ```bash
    npm run build
    ```

3.  **Initialize the Android Platform (First time only):**
    This only needs to be done once to add the native Android project.
    ```bash
    npx cap add android
    ```

4.  **Sync Web Assets with Android Project:**
    This command copies your web build from `dist/` into the native Android project. Run this command every time you update your web code.
    ```bash
    npx cap sync
    ```

5.  **Open in Android Studio:**
    ```bash
    npx cap open android
    ```
    From Android Studio, you can run the app on an emulator or a connected physical device.

## Contributing

Contributions are welcome. Please open an issue to discuss any changes or submit a pull request with a clear description of your improvements.

## License

This project is licensed under the MIT License.
