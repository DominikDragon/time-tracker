import { ReactNode, useState, useEffect, createContext } from "react";
import { getProjects, createAndAddProject } from "../services/projectService";
import type { Project } from "../types/project";

// Context

type ProjectContextValue = {
    projects: Project[];
    createProject: (name: string) => void;
};

export const ProjectContext = createContext<ProjectContextValue | null>(null);

// Provider

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function loadProjects() {
            const projects = await getProjects();
            setProjects(projects);
        }

        loadProjects();
    }, []);

    async function createProject(name: string) {
        const project = await createAndAddProject(name);

        setProjects((prev) => [...prev, project].sort((a, b) => a.name.localeCompare(b.name)));
    }

    const value: ProjectContextValue = {
        projects,
        createProject,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
