import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { closePopupWindows } from "../services/window/windows";
import { MenuDropdown } from "./MenuDropdown";

export function TitleBar() {
    const appWindow = getCurrentWindow();

    const isMain = appWindow.label === "main";

    async function handleMinimize() {
        await appWindow.minimize();
    }

    async function handleClose() {
        if (isMain) await closePopupWindows();

        await appWindow.close();
    }

    useEffect(() => {
        if (!isMain) return;

        const unlisten = appWindow.onCloseRequested(async () => {
            await closePopupWindows();
            await appWindow.close();
        });

        return () => {
            unlisten.then((fn) => fn());
        };
    }, [isMain, appWindow]);

    return (
        <div className="bg-brown h-10 w-full px-6 text-cream flex items-center gap-1">
            <div className="flex-1 h-full flex items-center" data-tauri-drag-region>
                tracking
            </div>

            {isMain && <MenuDropdown />}

            <button onClick={handleMinimize} className="cursor-pointer">
                <img src="/icons/minimalize.svg" className="h-5.5 w-5.5" />
            </button>

            <button onClick={handleClose} className="cursor-pointer">
                <img src="/icons/close.svg" className="h-5.5 w-5.5" />
            </button>
        </div>
    );
}
