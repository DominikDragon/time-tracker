import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const PROJECT_WINDOW_LABEL = "projects";

export async function openProjectWindow() {
    const existingWindow = await WebviewWindow.getByLabel(PROJECT_WINDOW_LABEL);

    if (existingWindow) {
        await existingWindow.setFocus();
        return;
    }

    const projectWindow = new WebviewWindow(PROJECT_WINDOW_LABEL, {
        url: "/projects",
        title: "Projects",
        width: 640,
        height: 440,
        resizable: false,
        decorations: false,
        transparent: true,
        zoomHotkeysEnabled: false
    });

    projectWindow.once("tauri://created", () => {
        console.log("Project window created");
    });

    projectWindow.once("tauri://error", (error) => {
        console.error("Failed to create project window:", error);
    });
}
