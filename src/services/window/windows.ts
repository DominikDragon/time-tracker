import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

export async function closePopupWindows() {
    const windows = await WebviewWindow.getAll();
    for (const window of windows) {
        if (window.label !== "main") {
            await window.destroy();
        }
    }
}
