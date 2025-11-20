# Security Policy

## Supported Versions

We are currently supporting the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 5.x     | :white_check_mark: |

## Security Features

### 1. Data Privacy
- **100% Offline-First**: All forensic analysis runs locally on the user's device
- **No Data Upload**: User evidence and analysis results never leave the device
- **Local Storage Only**: All data stored in browser IndexedDB or device storage
- **Optional Cloud Sync**: Firebase integration is opt-in and requires explicit user configuration

### 2. API Key Security
- **Environment Variables**: API keys stored in environment variables, never in source code
- **Build-Time Injection**: Keys injected during build process via GitHub Secrets
- **No Hardcoded Secrets**: All `.env` files excluded from version control
- **Template Provided**: `.env.example` template available for configuration guidance

### 3. Cryptographic Security
- **SHA-256 Hashing**: All evidence files hashed for integrity verification
- **PDF Cryptographic Seals**: Generated PDFs include SHA-256 seals for tamper detection
- **Chain of Custody**: Timestamped evidence tracking with cryptographic verification

## Known Vulnerabilities

### Development Dependencies (Non-Production)

The following vulnerabilities exist in development dependencies but **do not affect production builds**:

1. **esbuild (<= 0.24.2)** - Moderate
   - Affects development server only
   - Not present in production bundle
   - Recommendation: Developers should not run dev server on untrusted networks

2. **vite (0.11.0 - 6.1.6)** - Moderate
   - Build tool vulnerability
   - Does not affect compiled production code
   - Recommendation: Update to latest version when performing major version upgrades

### Runtime Dependencies

3. **dompurify (<3.2.4) in jspdf-html2canvas** - Moderate
   - Used only for PDF generation from user-controlled markdown
   - Context: User generates reports from their own data
   - Mitigation: XSS not exploitable as users only process their own content
   - Recommendation: Monitor for jspdf-html2canvas updates

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by:

1. **DO NOT** open a public GitHub issue
2. Email the repository owner with details
3. Include steps to reproduce if possible
4. Allow reasonable time for a fix before public disclosure

We will acknowledge receipt within 48 hours and provide a timeline for fixes.

## Security Best Practices for Deployment

### For Repository Administrators

1. **Never commit API keys** - Always use GitHub Secrets
2. **Rotate API keys regularly** - Especially after team member changes
3. **Use least-privilege access** - Limit Firebase permissions to minimum required
4. **Enable branch protection** - Require reviews for main branch merges
5. **Monitor dependency alerts** - Review Dependabot alerts regularly

### For Users

1. **Keep API keys private** - Never share your `.env.production` file
2. **Review permissions** - Understand what data the app accesses
3. **Verify APK signatures** - Only install APKs from trusted sources
4. **Update regularly** - Install updates for security patches

### For Developers

1. **Review code changes** - Especially in authentication and data handling
2. **Test locally first** - Build and test before pushing to main
3. **Check for secrets** - Run `git log --all --full-history --source -S 'API_KEY'` before pushing
4. **Use .env files correctly** - Never commit `.env` or `.env.production`

## Compliance Notes

### GDPR Compliance
- No user data collected by default
- All processing happens on-device
- Optional cloud features require explicit user consent
- Users maintain full control of their data

### Legal/Forensic Chain of Custody
- All evidence files cryptographically hashed
- Timestamps recorded at time of analysis
- PDF reports include integrity verification seals
- Audit trail maintained in local storage

## Security Updates

Security updates will be released as needed and documented in release notes. Critical security issues will be addressed with urgent patch releases.

Last Updated: 2025-11-20
