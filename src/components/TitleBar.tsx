import { getCurrentWindow } from "@tauri-apps/api/window";
import { closePopupWindows } from "../services/window/windows";

export function TitleBar() {
    const appWindow = getCurrentWindow();

    async function handleMinimize() {
        await appWindow.minimize();
    }

    async function handleClose() {
        if (appWindow.label === "main") {
            await closePopupWindows();
        }

        await appWindow.close();
    }

    return (
        <div className="bg-brown h-10 w-full px-6 rounded-t-[30px] text-cream flex items-center gap-1">
            <div className="flex-1 h-full flex items-center" data-tauri-drag-region>
                tracking
            </div>

            <button onClick={handleMinimize} className="cursor-pointer">
                <img src="/icons/minimalize.svg" className="h-5.5 w-5.5" />
            </button>

            <button onClick={handleClose} className="cursor-pointer">
                <img src="/icons/close.svg" className="h-5.5 w-5.5" />
            </button>
        </div>
    );
}
