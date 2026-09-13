import { ProjectCreator } from "../components/ProjectCreator";
import { ProjectList } from "../components/ProjectList";
import { useProject } from "../hooks/useProject";
import { useState } from "react";

export function ProjectsPage() {
    const { projects } = useProject();
    const [search, setSearch] = useState("");

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(search.trim().toLowerCase()),
    );

    return (
        <div className="flex flex-col h-full min-h-0 p-6">
            <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="PROJECTS"
                className="mb-2 w-full rounded-[20px] bg-green px-3 py-1 text-cream placeholder-cream"
            />
            <div className="flex flex-1 min-h-0 flex-col px-3 py-2 border-3 border-green rounded-[20px]">
                <ProjectList projects={filteredProjects} />
                <div className="mt-2 shrink-0">
                    <ProjectCreator />
                </div>
            </div>
        </div>
    );
}
