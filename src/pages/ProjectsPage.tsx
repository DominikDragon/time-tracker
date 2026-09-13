import { ProjectCreator } from "../components/ProjectCreator";
import { ProjectList } from "../components/ProjectList";

export function ProjectsPage() {
    return (
        <div className="flex flex-col h-full min-h-0 p-6">
            <div className="flex flex-1 min-h-0 flex-col px-3 py-2 border-3 border-green rounded-[20px]">
                <ProjectList />
                <div className="mt-2 shrink-0">
                    <ProjectCreator />
                </div>
            </div>
        </div>
    );
}
