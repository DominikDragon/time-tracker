import { useState, useRef, useEffect } from "react";
import { useProject } from "../hooks/useProject";
import { useTimer } from "../hooks/useTimer";
import type { Project } from "../types/project";

export function ProjectSelection() {
    const { projects } = useProject();
    const { timer, updateProjectID } = useTimer();

    const selectedProject = projects.find((project) => project.id === timer.projectId);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(selectedProject?.name ?? "");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);

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

    function handleKeyDown(key: string): void {
        switch (key) {
            case "ArrowUp":
                if (highlightedIndex > 0) setHighlightedIndex((prev) => prev - 1);
                return;
            case "ArrowDown":
                if (filteredProjects.length - 1 > highlightedIndex)
                    setHighlightedIndex((prev) => prev + 1);
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
            />

            {isOpen && (
                <div className="absolute top-10 flex flex-col gap-2 bg-red-500">
                    {filteredProjects.map((project, index) => (
                        <button
                            className={index === highlightedIndex ? "bg-blue-500" : ""}
                            key={project.id}
                            onMouseDown={(event) => {
                                event.preventDefault();
                                handleProjectChange(project);
                            }}
                        >
                            {project.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
