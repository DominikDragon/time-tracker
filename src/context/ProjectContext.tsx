import { ReactNode, useState, useEffect, createContext } from "react";
import { getProjects, createAndAddProject } from "../services/database/projectService";
import type { Project } from "../types/project";

// Context

type ProjectContextValue = {
    projects: Project[];
    createProject: (name: string) => Promise<void>;
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
        await createAndAddProject(name);
        const projects = await getProjects();
        setProjects(projects);
    }

    const value: ProjectContextValue = {
        projects,
        createProject,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
