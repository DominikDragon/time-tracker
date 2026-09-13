import { useProject } from "../hooks/useProject";

export function ProjectList() {
    const { projects } = useProject();

    return (
        <div className="min-h-0 flex-1 overflow-y-auto flex flex-col gap-y-2">
            {projects.map((project) => {
                return (
                    <div
                        className="bg-light-green/60 rounded-[5px] flex flex-row justify-between items-center px-2 text-custom-lg"
                        key={project.id}
                    >
                        {project.name}
                    </div>
                );
            })}
        </div>
    );
}