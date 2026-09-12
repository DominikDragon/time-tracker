import { useProject } from "../hooks/useProject";

export function ProjectList() {
    const { projects } = useProject();

    return (
        <div>
            Projects
            <div className="h-40 overflow-y-scroll">
                {projects.map((project) => {
                    return <p key={project.id}>{project.name}</p>;
                })}
            </div>
        </div>
    );
}
