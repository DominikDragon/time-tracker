import type { Project } from "../types/project";
import { getDatabase } from "./database";
import { ProjectError } from "../errors/project";

export async function getProjects(): Promise<Project[]> {
    const db = await getDatabase();

    const projects = await db.select<Project[]>("SELECT * FROM projects ORDER BY name ASC");

    return projects;
}

export async function createAndAddProject(name: string): Promise<Project> {
    const db = await getDatabase();

    const project: Project = {
        id: crypto.randomUUID(),
        name: name,
    };

    try {
        await db.execute("INSERT INTO projects (id, name) VALUES ($1, $2)", [
            project.id,
            project.name,
        ]);
    } catch (error) {
        if (String(error).includes("UNIQUE constraint failed")) {
            throw new ProjectError("NAME_EXISTS");
        }

        throw error;
    }

    return project;
}
