import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const PROJECT_WINDOW_LABEL = "trackings";

export async function openTrackingWindow() {
    const existingWindow = await WebviewWindow.getByLabel(PROJECT_WINDOW_LABEL);

    if (existingWindow) {
        await existingWindow.setFocus();
        return;
    }

    const projectWindow = new WebviewWindow(PROJECT_WINDOW_LABEL, {
        url: "/trackings",
        title: "Trackings",
        width: 600,
        height: 500,
        resizable: false,
        decorations: false,
        transparent: true
    });

    projectWindow.once("tauri://created", () => {
        console.log("Project window created");
    });

    projectWindow.once("tauri://error", (error) => {
        console.error("Failed to create project window:", error);
    });
}
