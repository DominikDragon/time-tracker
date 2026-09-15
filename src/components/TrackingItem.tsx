import { Tracking } from "../types/tracking";
import { formatTime } from "../utils/time";
import { useProject } from "../hooks/useProject";
import { SummaryDropdown } from "./SummaryDropdown";
import { TruncatedText } from "./TruncatedText";

type TrackingItemProps = {
    trackingData: Tracking;
};

export function TrackingItem({ trackingData }: TrackingItemProps) {
    const { projects } = useProject();

    function getProjectName(projectId: string): string {
        return projects.find((project) => project.id === projectId)?.name ?? projectId;
    }

    return (
        <div className="grid grid-cols-[18%_18%_1fr_1fr] gap-0 min-w-0 text-brown">
            <span className="w-full min-w-0 text-center px-2">
                {new Date(trackingData.createdAt).toLocaleDateString()}
            </span>
            <span className="w-full min-w-0 text-center px-2">
                {formatTime(trackingData.durationSeconds)}
            </span>
            <span className="w-full min-w-0 text-left px-2">
                
                <TruncatedText text={getProjectName(trackingData.projectId)} width={200}/>
            </span>
            <span className="w-full min-w-0 text-left px-2">
                <SummaryDropdown summary={trackingData.summary} />
            </span>
        </div>
    );
}
