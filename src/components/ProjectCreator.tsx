import { useEffect, useRef, useState } from "react";
import { useProject } from "../hooks/useProject";
import { ProjectError } from "../errors/project";

export function ProjectCreator() {
    const { createProject } = useProject();
    const creatorRef = useRef<HTMLDivElement>(null);

    const [projectName, setProjectName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const [creating, setCreating] = useState<boolean>(false);

    useEffect(() => {
        if (!creating) return;

        function handleOutsideInteraction(event: MouseEvent): void {
            if (creatorRef.current && !creatorRef.current.contains(event.target as Node)) {
                setCreating(false);
                setProjectName("");
                setError(null);
            }
        }

        document.addEventListener("mousedown", handleOutsideInteraction);

        return () => {
            document.removeEventListener("mousedown", handleOutsideInteraction);
        };
    }, [creating]);

    async function handleCreateProject(): Promise<void> {
        if (projectName.trim().length < 5) {
            setError("A project name must be a minimum of 5 characters long.");
            return;
        }

        try {
            await createProject(projectName.trim());
            setProjectName("");
            setError(null);
        } catch (error) {
            if (error instanceof ProjectError && error.code === "NAME_EXISTS") {
                setError("A project with that name already exists.");
            } else {
                setError("Something went wrong while creating the project.");
            }
        }
    }

    function handleKey(key: string) {
        if (key === "Enter") handleCreateProject();
        return;
    }

    return (
        <div ref={creatorRef} className="flex flex-row w-full">
            {!creating && (
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => setCreating(true)}
                        className="cursor-pointer rounded-[20px] bg-light-green px-3 py-2"
                    >
                        add new
                    </button>
                </div>
            )}

            {creating && (
                <div className="flex flex-col w-full bg-cream rounded-l-[5px] rounded-r-[20px]">
                    <div className="flex flex-row w-full bg-light-green/60 rounded-l-[5px] rounded-r-[20px] py-0">
                        <input
                            value={projectName}
                            onChange={(event) => setProjectName(event.target.value)}
                            onKeyDown={(event) => handleKey(event.key)}
                            required
                            maxLength={100}
                            className="flex-1 min-w-0 p-2"
                        />
                        <button
                            onClick={handleCreateProject}
                            className="cursor-pointer px-3 py-2 rounded-[20px] ring-inset ring-2 ring-light-green"
                        >
                            add new
                        </button>
                    </div>
                    {error && (
                        <div className="mt-2 rounded-[10px] bg-red-100 px-3 py-2">
                            <p className="text-custom-sm text-red-700">{error}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
