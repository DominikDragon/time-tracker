import { useState } from "react";
import { Project } from "../types/project";
import { EditProjectModal } from "./EditProjectModal";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { cutText } from "../utils/tracking";

type ProjectItemProps = {
    project: Project;
};

export function ProjectItem({ project }: ProjectItemProps) {
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    return (
        <>
            <div
                key={project.id}
                className="bg-light-green/40 rounded-[5px] flex flex-row justify-between items-center px-2 text-custom-lg"
            >
                <p>{cutText(project.name, 30)}</p>
                <div className="flex flex-row gap-2">
                    <button onClick={() => setIsEditOpen(true)} className="cursor-pointer">
                        <img src="/icons/edit.svg" className="h-4.5 w-4.5" />
                    </button>
                    <button onClick={() => setIsDeleteOpen(true)} className="cursor-pointer">
                        <img src="/icons/delete.svg" className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {isEditOpen && (
                <EditProjectModal project={project} onClose={() => setIsEditOpen(false)} />
            )}

            {isDeleteOpen && (
                <DeleteProjectModal project={project} onClose={() => setIsDeleteOpen(false)} />
            )}
        </>
    );
}
