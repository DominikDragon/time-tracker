import { useTracking } from "../hooks/useTracking";
import { formatTime } from "../utils/time";

export function TrackingPage() {
    const { trackings } = useTracking();

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-4 gap-4 font-bold">
                <span>Date</span>
                <span>Time</span>
                <span>Project</span>
                <span>Summary</span>
            </div>

            <div className="h-40 overflow-y-auto">
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
                            {tracking.projectId}
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