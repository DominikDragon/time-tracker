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

        const reachedBottom =
            container.scrollTop + container.clientHeight >= container.scrollHeight - 24;

        if (reachedBottom) {
            void loadMoreTrackings();
        }
    }

    return (
        <div className="h-full min-h-0 px-6 py-6">
            <div className="relative flex h-full min-h-0 flex-col gap-0 w-full min-w-0 rounded-[20px]">
                {/* Background */}
                <div className="absolute inset-0 grid grid-cols-[18%_18%_1fr_1fr] gap-0 pointer-events-none rounded-[20px]">
                    <div className="bg-light-green/50 rounded-l-[20px]" />
                    <div className="bg-green/40" />
                    <div className="bg-light-green/40" />
                    <div className="bg-green/40 rounded-r-[20px]" />
                </div>
                {/* Content */}
                <div className="relative z-10 flex h-full min-h-0 flex-col">
                    <div
                        aria-hidden="true"
                        className="spiral-strip pointer-events-none absolute inset-x-6 top-[-12.5px] h-[25px]"
                    />
                    <div className="grid grid-cols-[18%_18%_1fr_1fr] gap-0 font-bold py-2 mt-4 border-b-3 border-dashed border-green mx-4 mb-4">
                        <DateFilter />
                        <TimeFilter />
                        <ProjectFilter />
                        <span className="w-full min-w-0 text-center font-normal">message</span>
                    </div>
                    <SearchBar />
                    <div
                        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden mt-8"
                        onScroll={handleTrackingScroll}
                    >
                        {trackings.map((tracking) => (
                            <div
                                key={tracking.id}
                                className="grid grid-cols-[18%_18%_1fr_1fr] gap-0 min-w-0"
                            >
                                <span className="w-full min-w-0 text-center px-2">
                                    {new Date(tracking.createdAt).toLocaleDateString()}
                                </span>
                                <span className="w-full min-w-0 text-center px-2">
                                    {formatTime(tracking.durationSeconds)}
                                </span>
                                <span className="w-full min-w-0 text-left break-words px-2">
                                    {projects.find((project) => project.id === tracking.projectId)
                                        ?.name ?? tracking.projectId}
                                </span>
                                <span className="w-full min-w-0 text-left break-words px-2">
                                    {tracking.summary}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
