# Verum Omnis – Forensic Engine (Web + Android)

This repository currently contains a **single ZIP file** with the full Verum Omnis forensic engine project.

The job of **GitHub Codespaces + Copilot** (or a human following this README) is:

1. Unzip the project.
2. Install dependencies.
3. Wire the Gemini API key.
4. Build & deploy the **web app** to Firebase Hosting.
5. Build an **Android APK** from the existing Android project.

---

## 0. Preconditions

Before doing anything, you need:

- A **Firebase project**  
  From Firebase Console → Project Settings:
  - `projectId` (e.g. `verum-omnis-engine`)
  - Hosting site is usually the same as `projectId`, unless you’ve customized it.
- Firebase CLI installed in the Codespace:
  - We’ll install it via `npm` below.
- A **Gemini API key** for the forensic analysis (`VITE_API_KEY`).
- (Optional but recommended) GitHub repository secrets:
  - `VITE_API_KEY` – Gemini key for production builds.
  - `FIREBASE_SERVICE_ACCOUNT` – JSON of a service account with Firebase Hosting deploy rights (if you want CI deploys instead of manual `firebase deploy` in Codespaces).

---

## 1. Automated Setup in Codespaces (for Copilot or human)

> **For GitHub Copilot / Agents:**  
> Run these commands in the Codespaces terminal from the repository root, in order.

```sh
# 1. Confirm we are in the repo root and see the zip
pwd
ls

# 2. Unzip the project (this zip should be the ONLY project zip in the repo)
unzip -o verumomnisapichanged_fixed.zip

# 3. If it unzips into Newverumapp-main/, move contents up one level
if [ -d Newverumapp-main ]; then
  mv Newverumapp-main/* .
  mv Newverumapp-main/.* . 2>/dev/null || true
  rmdir Newverumapp-main
fi

# 4. (Optional) Remove the zip after extraction to keep the repo clean
rm verumomnisapichanged_fixed.zip

# 5. Verify we now have the project files (package.json, src/, android/, etc.)
ls
