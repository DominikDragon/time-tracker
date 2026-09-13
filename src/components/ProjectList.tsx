import type { Project } from "../types/project";
import { ProjectItem } from "./ProjectItem";

type ProjectListProps = {
    projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
    return (
        <div className="min-h-0 flex-1 overflow-y-auto flex flex-col gap-y-2">
            {projects.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-custom-lg text-brown/60">
                    No projects found.
                </div>
            ) : (
                projects.map((project) => (
                    <ProjectItem key={project.id} project={project}/>
                ))
            )}
        </div>
    );
}