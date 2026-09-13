import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cutText } from "../utils/tracking";

type SummaryDropdownProps = {
    summary: string;
};

type DropdownPosition = {
    right: number;
    top: number;
    width: number;
};

export function SummaryDropdown({ summary }: SummaryDropdownProps) {
    const summaryRef = useRef<HTMLSpanElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<DropdownPosition | null>(null);

    function updatePosition() {
        if (!summaryRef.current) {
            return;
        }

        const summaryBounds = summaryRef.current.getBoundingClientRect();
        const calendarBounds = summaryRef.current.parentElement?.parentElement?.getBoundingClientRect();

        if (!calendarBounds) {
            return;
        }

        setPosition({
            right: calendarBounds.right,
            top: summaryBounds.top - 8,
            width: calendarBounds.width * 0.65,
        });
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isOpen]);

    return (
        <span
            ref={summaryRef}
            className="block w-full min-w-0"
            onMouseEnter={() => {
                setIsOpen(true);
                updatePosition();
            }}
            onMouseLeave={() => setIsOpen(false)}
        >
            <span className="block truncate">{cutText(summary, 14)}</span>
            {isOpen &&
                position &&
                createPortal(
                    <span
                        className="pointer-events-none fixed z-50 -translate-y-full rounded-[20px] ring-3 ring-brown ring-inset bg-cream px-4 py-3 text-brown whitespace-normal break-words"
                        style={{
                            top: position.top,
                            right: window.innerWidth - position.right,
                            width: position.width,
                        }}
                    >
                        {summary}
                    </span>,
                    document.body,
                )}
        </span>
    );
}
