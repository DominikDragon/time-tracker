import { ProjectCreator } from "../components/ProjectCreator";
import { ProjectList } from "../components/ProjectList";

export function ProjectsPage(){
    return (
        <div>
            <ProjectCreator/>

            <ProjectList />
        </div>
    );
}