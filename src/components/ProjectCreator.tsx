import { useState } from "react";
import { useProject } from "../hooks/useProject";
import { ProjectError } from "../errors/project";

export function ProjectCreator() {
    const { createProject } = useProject();

    const [projectName, setProjectName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const [creating, setCreating] = useState<boolean>(false);

    async function handleCreateProject(): Promise<void> {
        if(projectName.length < 5){
            setError("A project name must be a minimum of 5 characters long.");
            return;
        }

        try {
            await createProject(projectName);
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

    function handleKey(key: string){
        if(key === "Enter") handleCreateProject();
        return;
    }

    return (
        <div className="flex flex-row w-full">
            {!creating && <div className="w-full flex justify-end">
                <button onClick={() => setCreating(true)} className="rounded-[20px] bg-light-green px-3 py-2">add new</button>
                </div>}

            {creating && (
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full bg-light-green/60 rounded-l-[5px] rounded-r-[20px] py-2">
                        <input
                            value={projectName}
                            onChange={(event) => setProjectName(event.target.value)}
                            onKeyDown={(event) => handleKey(event.key)}
                            required
                            maxLength={100}
                            className="flex-1 min-w-0 px-2"
                        />
                        <button onClick={handleCreateProject} className="px-3">add new</button>
                    </div>
                    {error && <p className="text-red-500 mx-auto">{error}</p>}
                </div>
            )}
        </div>
    );
}
