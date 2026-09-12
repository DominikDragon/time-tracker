import { useState } from "react";
import { useProject } from "../hooks/useProject";
import { ProjectError } from "../errors/project";

export function ProjectCreator() {
    const { createProject } = useProject();

    const [projectName, setProjectName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    async function handleCreateProject(): Promise<void> {
        try {
            await createProject(projectName);
            setProjectName("");
            setError(null);
        } catch (error) {
            if(error instanceof ProjectError && error.code === "NAME_EXISTS"){
                setError("A project with that name already exists.");
            } else {
                setError("Something went wrong while creating the project.");
            }
        }
    }

    return (
        <div>
            <input value={projectName} onChange={(event) => setProjectName(event.target.value)} required maxLength={100}/>
            <button onClick={handleCreateProject}>Create Project</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
