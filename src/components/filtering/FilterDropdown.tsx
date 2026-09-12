import { useEffect, useRef, useState } from "react";

export function FilterDropdown({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button className="cursor-pointer text-center w-full font-normal" onClick={() => setIsOpen((prev) => !prev)}>{label}</button>

            {isOpen && (
                <div className="absolute p-2 top-full left-1/2 -translate-x-1/2 mt-2 z-40 bg-cream border-2 border-brown rounded-[5px]">
                    {children}
                </div>
            )}
        </div>
    );
}