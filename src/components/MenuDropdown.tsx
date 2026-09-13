import { openProjectWindow } from "../services/window/projectWindow";
import { openTrackingWindow } from "../services/window/trackingWindow";
import { useEffect, useRef, useState } from "react";

export function MenuDropdown() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleOpenProjects(){
        openProjectWindow();
        setIsMenuOpen(false);
    }

     function handleOpenTrackings(){
        openTrackingWindow();
        setIsMenuOpen(false);
    }

    return (
        <div ref={menuRef} className="relative h-full flex items-center">
            <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="cursor-pointer"
            >
                <img src="/icons/hamburger.svg" className="h-5.5 w-5.5" />
            </button>

            {isMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 z-20 rounded-[5px] border-2 border-brown bg-cream">
                    <button
                        onClick={handleOpenProjects}
                        className="cursor-pointer text-brown hover:bg-light-green transition-colors duration-300 uppercase w-full text-left px-3 py-2 border-b-2 border-brown"
                    >
                        Projects
                    </button>

                    <button
                        onClick={handleOpenTrackings}
                        className="cursor-pointer text-brown hover:bg-light-green transition-colors duration-300 uppercase w-full text-left px-3 py-2"
                    >
                        Trackings
                    </button>
                </div>
            )}
        </div>
    );
}