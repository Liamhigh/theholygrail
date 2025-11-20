import { Filesystem, Directory } from '@capacitor/filesystem';

// Unified save function (Web + APK)
export async function saveToVault(filename, content, type = "report") {
  const folder = type === "evidence" ? "Evidence" : "Reports";

  if (isWeb()) {
    // WEB STORAGE (File System Access API)
    try {
      const handle = await window.showDirectoryPicker();
      const folderHandle = await handle.getDirectoryHandle(folder, { create: true });
      const fileHandle = await folderHandle.getFileHandle(filename, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      return true;
    } catch (err) {
      console.error("Web save error", err);
      return false;
    }
  } else {
    // APK STORAGE (Capacitor)
    try {
      await Filesystem.writeFile({
        path: `${folder}/${filename}`,
        data: content,
        directory: Directory.Documents,
        recursive: true
      });
      return true;
    } catch (err) {
      console.error("APK save error", err);
      return false;
    }
  }
}

function isWeb() {
  return !(window.Capacitor && window.Capacitor.isNativePlatform);
}
