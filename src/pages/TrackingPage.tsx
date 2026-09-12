import { DateFilter } from "../components/filtering/DateFilter";
import { ProjectFilter } from "../components/filtering/ProjectFilter";
import { SearchBar } from "../components/filtering/SearchBar";
import { TimeFilter } from "../components/filtering/TimeFilter";
import { useProject } from "../hooks/useProject";
import { useTracking } from "../hooks/useTracking";
import { formatTime } from "../utils/time";

export function TrackingPage() {
    const { trackings, loadMoreTrackings } = useTracking();
    const { projects } = useProject();

    function handleTrackingScroll(event: React.UIEvent<HTMLDivElement>) {
        const container = event.currentTarget;
        const reachedBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 24;

        if (reachedBottom) {
            void loadMoreTrackings();
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-4 gap-4 font-bold">
                <DateFilter/>
                <TimeFilter/>
                <ProjectFilter/>
                <span>message</span>
            </div>

            <SearchBar/>

            <div className="h-40 overflow-y-auto" onScroll={handleTrackingScroll}>
                {trackings.map((tracking) => (
                    <div
                        key={tracking.id}
                        className="grid grid-cols-4 gap-4"
                    >
                        <span>
                            {new Date(tracking.createdAt).toLocaleDateString()}
                        </span>

                        <span>
                            {formatTime(tracking.durationSeconds)}
                        </span>

                        <span>
                            {projects.find((project) => project.id === tracking.projectId)?.name ?? tracking.projectId}
                        </span>

                        <span>
                            {tracking.summary}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}