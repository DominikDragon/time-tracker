import { ReactNode, useState, useEffect, createContext } from "react";
import { emit, listen } from "@tauri-apps/api/event";
import {
    getProjects,
    createAndAddProject as createProjectInDatabase,
    deleteProject as deleteProjectFromDatabase,
    renameProject as renameProjectInDatabase,
} from "../services/database/projectService";
import type { Project } from "../types/project";

const PROJECTS_CHANGED_EVENT = "projects-changed";

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

    async function loadProjects() {
        const projects = await getProjects();
        setProjects(projects);
    }

    useEffect(() => {
        void loadProjects();

        let isCancelled = false;
        let unlisten: (() => void) | undefined;

        void listen(PROJECTS_CHANGED_EVENT, () => {
            void loadProjects();
        }).then((removeListener) => {
            if (isCancelled) {
                removeListener();
            } else {
                unlisten = removeListener;
            }
        });

        return () => {
            isCancelled = true;
            unlisten?.();
        };
    }, []);

    async function createProject(name: string) {
        await createProjectInDatabase(name);
        await loadProjects();
        await emit(PROJECTS_CHANGED_EVENT);
    }

    async function deleteProject(projectId: string) {
        await deleteProjectFromDatabase(projectId);
        await loadProjects();
        await emit(PROJECTS_CHANGED_EVENT);
    }

    async function renameProject(projectId: string, newName: string){
        await renameProjectInDatabase(projectId, newName);
        await loadProjects();
        await emit(PROJECTS_CHANGED_EVENT);
    }

    const value: ProjectContextValue = {
        projects,
        createProject,
        deleteProject,
        renameProject,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}