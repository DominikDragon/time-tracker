import { useEffect, useState } from "react";
import { useTracking } from "../../hooks/useTracking";
import { FilterDropdown } from "./FilterDropdown";
import { useProject } from "../../hooks/useProject";
import { Project } from "../../types/project";

export function ProjectFilter() {
    const { filters, setFilters } = useTracking();
    const { projects } = useProject();

    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showProjects, setShowProjects] = useState(true);

    const filteredProjects = projects.filter((project: Project) =>
        project.name.toLowerCase().includes(search.trim().toLowerCase()),
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const clearSelection = () => {
        setSelectedProject(null);

        setFilters({
            ...filters,
            projectId: undefined,
        });
    };

    const handleSelect = (project: Project) => {
        setFilters({
            ...filters,
            projectId: project.id ?? undefined,
        });

        setSelectedProject(project);
        setSearch(project.name);
        setShowProjects(false);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);

        if (selectedProject && value !== selectedProject.name) {
            setShowProjects(true);
            clearSelection();
        } else if (!selectedProject) {
            setShowProjects(true);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (!filteredProjects.length) return;

            setShowProjects(true);

            setSelectedIndex((prev) => (prev >= filteredProjects.length - 1 ? 0 : prev + 1));
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (!filteredProjects.length) return;

            setShowProjects(true);

            setSelectedIndex((prev) => (prev <= 0 ? filteredProjects.length - 1 : prev - 1));
        }

        if (event.key === "Enter") {
            event.preventDefault();

            const project = filteredProjects[selectedIndex];

            if (project) {
                handleSelect(project);
            }
        }

        if (event.key === "Escape") {
            event.preventDefault();

            setSearch("");
            setSelectedIndex(0);
            setShowProjects(false);
            clearSelection();
        }
    };

    return (
        <FilterDropdown icon="clipboard" label="project">
            <div className="w-50">
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="search"
                        autoFocus
                        className="w-full rounded-[20px] border-2 border-brown bg-brown/35 py-1 pl-3 pr-10 text-brown font-normal placeholder-brown"
                    />
                    <img
                        src="/icons/search-dark.svg"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    />
                </div>

                {showProjects && (
                    <div className="max-h-[120px] mt-2 overflow-y-auto">
                        {filteredProjects.map((project, index) => (
                            <button
                                key={project.id}
                                type="button"
                                onMouseEnter={() => setSelectedIndex(index)}
                                onClick={() => handleSelect(project)}
                                className={`cursor-pointer block w-full px-2 py-1 text-left font-normal text-brown rounded-[5px] ${
                                    index === selectedIndex ? "bg-brown/20" : ""
                                }`}
                            >
                                {project.name}
                            </button>
                        ))}

                        {filteredProjects.length === 0 && (
                            <div className="px-2 py-1">No projects found</div>
                        )}
                    </div>
                )}
            </div>
        </FilterDropdown>
    );
}
