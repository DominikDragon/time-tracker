import { useEffect, useRef, useState } from "react";

export function FilterDropdown({
    icon,
    label,
    children,
}: {
    icon :string;
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
            <button className="cursor-pointer text-center w-full font-normal flex flex-row gap-2 items-center justify-center" onClick={() => setIsOpen((prev) => !prev)}>
                <img src={`/icons/${icon}.svg`} className="h-5 w-auto"/>
                <span>{label}</span>
                </button>

            {isOpen && (
                <div className="absolute p-2 top-full left-1/2 -translate-x-1/2 mt-2 z-40 bg-cream border-2 border-brown rounded-[5px]">
                    {children}
                </div>
            )}
        </div>
    );
}