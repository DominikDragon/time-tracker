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
        <div className="flex flex-col h-full min-h-0 p-6 gap-4">
            <div className="relative mb-2">
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="PROJECTS"
                    className="w-full rounded-[20px] bg-green py-1 pl-3 pr-10 text-cream placeholder-cream"
                />
                <img
                    src="/icons/search-light.svg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
                />
            </div>
            <div className="flex flex-1 min-h-0 flex-col px-3 py-2 border-3 border-green rounded-[20px]">
                <ProjectList projects={filteredProjects} />
                <div className="mt-2 shrink-0">
                    <ProjectCreator />
                </div>
            </div>
        </div>
    );
}
