import { Tracking } from "../types/tracking";
import { formatTime } from "../utils/time";
import { useProject } from "../hooks/useProject";

type TrackingItemProps = {
    trackingData: Tracking;
};

export function TrackingItem({ trackingData }: TrackingItemProps) {
    const { projects } = useProject();

    return (
        <div className="grid grid-cols-[18%_18%_1fr_1fr] gap-0 min-w-0">
            <span className="w-full min-w-0 text-center px-2">
                {new Date(trackingData.createdAt).toLocaleDateString()}
            </span>
            <span className="w-full min-w-0 text-center px-2">
                {formatTime(trackingData.durationSeconds)}
            </span>
            <span className="w-full min-w-0 text-left break-words px-2">
                {projects.find((project) => project.id === trackingData.projectId)?.name ??
                    trackingData.projectId}
            </span>
            <span className="w-full min-w-0 text-left break-words px-2">
                {trackingData.summary}
            </span>
        </div>
    );
}
