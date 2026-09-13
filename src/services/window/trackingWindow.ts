import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const TRACKING_WINDOW_LABEL = "trackings";

export async function openTrackingWindow() {
    const existingWindow = await WebviewWindow.getByLabel(TRACKING_WINDOW_LABEL);

    if (existingWindow) {
        await existingWindow.setFocus();
        return;
    }

    const trackingWindow = new WebviewWindow(TRACKING_WINDOW_LABEL, {
        url: "/trackings",
        title: "Trackings",
        width: 640,
        height: 440,
        resizable: false,
        decorations: false,
        transparent: true,
        zoomHotkeysEnabled: false
    });

    trackingWindow.once("tauri://created", () => {
        console.log("Tracking window created");
    });

    trackingWindow.once("tauri://error", (error) => {
        console.error("Failed to create tracking window:", error);
    });
}
