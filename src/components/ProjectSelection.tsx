import { useState, useRef, useEffect } from "react";
import { useProject } from "../hooks/useProject";
import { useTimer } from "../hooks/useTimer";
import type { Project } from "../types/project";
import { cutText } from "../utils/tracking";

export function ProjectSelection() {
    const { projects } = useProject();
    const { timer, updateProjectID } = useTimer();

    const selectedProject = projects.find((project) => project.id === timer.projectId);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(selectedProject?.name ?? "");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const filteredProjects = projects.filter((project) =>
        project.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
    );

    function handleProjectChange(project: Project): void {
        updateProjectID(project.id);
        setInputValue(project.name);
        inputRef.current?.blur();
        setIsOpen(false);
        setHighlightedIndex(0);
    }

    function handleTyping(input: string): void {
        setInputValue(input);
        setHighlightedIndex(0);
        setIsOpen(true);
    }

    function scrollToIndex(index: number): void {
        itemRefs.current[index]?.scrollIntoView({ block: "nearest" });
    }

    function handleKeyDown(key: string): void {
        switch (key) {
            case "ArrowUp":
                if (highlightedIndex > 0) {
                    const nextIndex = highlightedIndex - 1;
                    setHighlightedIndex(nextIndex);
                    scrollToIndex(nextIndex);
                }
                return;
            case "ArrowDown":
                if (filteredProjects.length - 1 > highlightedIndex) {
                    const nextIndex = highlightedIndex + 1;
                    setHighlightedIndex(nextIndex);
                    scrollToIndex(nextIndex);
                }
                return;
            case "Enter":
                if (filteredProjects.length > 0)
                    handleProjectChange(filteredProjects[highlightedIndex]);
                return;
            case "Escape":
                handleCancel();
                return;
            default:
                return;
        }
    }

    function handleCancel() {
        if (selectedProject) {
            setInputValue(selectedProject.name);
        }

        inputRef.current?.blur();
        setIsOpen(false);
    }

    useEffect(() => {
        setInputValue(selectedProject?.name ?? "");
    }, [selectedProject]);

    return (
        <div className="flex flex-col gap-6 relative">
            <input
                ref={inputRef}
                value={inputValue}
                onFocus={() => setIsOpen(true)}
                onChange={(event) => handleTyping(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event.key)}
                onBlur={handleCancel}
                placeholder="projects..."
                className="border-3 border-light-green rounded-[20px] w-full px-2 py-1 placeholder-brown text-brown"
            />

            {isOpen && (
                <div className="absolute top-10 flex flex-col gap-0 bg-green p-0 w-full rounded-[20px] max-h-40 overflow-y-scroll text-cream">
                    {filteredProjects.length === 0 && (
                        <p className="w-full text-start p-2">No projects found</p>
                    )}
                    {filteredProjects.map((project, index) => (
                        <button
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            className={`${index === highlightedIndex ? "bg-light-green/40" : ""} w-full text-start p-2`}
                            key={project.id}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onMouseDown={(event) => {
                                event.preventDefault();
                                handleProjectChange(project);
                            }}
                        >
                            {cutText(project.name,25)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
