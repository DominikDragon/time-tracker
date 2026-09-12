import { useState } from "react";
import { useProject } from "../hooks/useProject";

export function ProjectCreator() {
    const { createProject } = useProject();

    const [projectName, setProjectName] = useState<string>("");

    function handleCreateProject(): void {
        createProject(projectName);
    }

    return (
        <div>
            <input value={projectName} onChange={(event) => setProjectName(event.target.value)} required maxLength={100}/>
            <button onClick={handleCreateProject}>Create Project</button>
        </div>
    );
}
