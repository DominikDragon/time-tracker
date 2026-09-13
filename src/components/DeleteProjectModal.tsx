import { useState } from "react";
import type { Project } from "../types/project";
import { useProject } from "../hooks/useProject";
import { cutText } from "../utils/tracking";

type DeleteProjectModalProps = {
    project: Project;
    onClose: () => void;
};

export function DeleteProjectModal({ project, onClose }: DeleteProjectModalProps) {
    const { deleteProject } = useProject();
    const [error, setError] = useState<string | null>(null);

    async function handeDeleteProject(): Promise<void> {
        try {
            await deleteProject(project.id);
            setError(null);
            onClose();
        } catch (error) {
            setError("Something went wrong while deleting the project.");
        }
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
                    <p className="text-custom-lg">Delete project</p>
                    <button onClick={onClose} className="cursor-pointer">
                        <img src="/icons/close-dark.svg" className="h-4 w-4" />
                    </button>
                </div>

                <p>Are you sure you want to delete this project?</p>
                <p className="text-green font-semibold">{cutText(project.name,20)}</p>

                {error && (
                    <div className="mt-2 rounded-[10px] bg-red-100 px-3 py-2">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="flex w-full justify-end gap-2 mt-6">
                    <button
                        className="rounded-[20px] bg-light-green px-3 py-2 cursor-pointer"
                        onClick={onClose}
                    >
                        cancel
                    </button>
                    <button
                        className="rounded-[20px] bg-red-300 px-3 py-2 cursor-pointer"
                        onClick={handeDeleteProject}
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    );
}
