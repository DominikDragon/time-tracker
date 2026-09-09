import type { Project } from "../types/project";
import { getDatabase } from "./database";

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
        console.log(error); // TODO: handle error if name exists
    }

    return project;
}
