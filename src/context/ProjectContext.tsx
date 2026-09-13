import { ReactNode, useState, useEffect, createContext } from "react";
import {
    getProjects,
    createAndAddProject,
    deleteProject,
    renameProject,
} from "../services/database/projectService";
import type { Project } from "../types/project";

// Context

type ProjectContextValue = {
    projects: Project[];
    createProject: (name: string) => Promise<void>;
    deleteProject: (projectId: string) => Promise<void>;
    renameProject: (projectId: string, newName: string) => Promise<void>;
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

    async function deleteProject(projectId: string) {
        await deleteProject(projectId);
        const projects = await getProjects();
        setProjects(projects);
    }

    async function renameProject(projectId: string, newName: string){
        await renameProject(projectId, newName);
        const projects = await getProjects();
        setProjects(projects);
    }

    const value: ProjectContextValue = {
        projects,
        createProject,
        deleteProject,
        renameProject,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
