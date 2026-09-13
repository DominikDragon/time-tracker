import { useState } from "react";
import type { Project } from "../types/project";
import { useProject } from "../hooks/useProject";
import { ProjectError } from "../errors/project";

type EditProjectModalProps = {
    project: Project;
    onClose: () => void;
};

export function EditProjectModal({ project, onClose }: EditProjectModalProps) {
    const { renameProject } = useProject();
    const [projectName, setProjectName] = useState(project.name);
    const [error, setError] = useState<string | null>(null);

     async function handleRenameProject(): Promise<void> {
            if(projectName.trim().length < 5){
                setError("A project name must be a minimum of 5 characters long.");
                return;
            }
    
            try {
                await renameProject(project.id ,projectName.trim());
                setProjectName("");
                setError(null);
                onClose();
            } catch (error) {
                if (error instanceof ProjectError && error.code === "NAME_EXISTS") {
                    setError("A project with that name already exists.");
                } else {
                    setError("Something went wrong while renaming the project.");
                }
            }
        }
    
        function handleKey(key: string){
            if(key === "Enter") handleRenameProject();
            return;
        }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center pt-24 bg-brown/20"
            onClick={onClose}
        >
            <div
                className="w-80 rounded-[20px] bg-cream p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex flex-row justify-between items-center mb-4">
                    <p className="text-custom-lg">Edit project</p>
                    <button onClick={onClose} className="cursor-pointer">
                        <img src="/icons/close-dark.svg" className="h-4 w-4" />
                    </button>
                </div>

                <input
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    onKeyDown={(event) => handleKey(event.key)}
                    className="w-full rounded-[10px] bg-green px-3 py-2 text-cream"
                />
                             {error && (
                    <div className="mt-2 rounded-[10px] bg-red-100 px-3 py-2">
                        <p className="text-sm text-red-700">
                            {error}
                        </p>
                    </div>
                )}

                <div className="flex w-full justify-end mt-6">
                    <button className="rounded-[20px] bg-light-green px-3 py-2 cursor-pointer" onClick={handleRenameProject}>save</button>
                </div>
            </div>
        </div>
    );
}
