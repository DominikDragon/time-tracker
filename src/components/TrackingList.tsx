import { useTracking } from "../hooks/useTracking";
import type { Tracking } from "../types/tracking";
import { TrackingItem } from "./TrackingItem";

export function TrackingList() {
    const { trackings, loadMoreTrackings } = useTracking();
    function handleTrackingScroll(event: React.UIEvent<HTMLDivElement>) {
        const container = event.currentTarget;

        const reachedBottom =
            container.scrollTop + container.clientHeight >= container.scrollHeight - 24;

        if (reachedBottom) {
            void loadMoreTrackings();
        }
    }

    return (
        <div
            className="min-h-0 flex-1 flex flex-col gap-4 overflow-y-auto overflow-x-hidden mt-8"
            onScroll={handleTrackingScroll}
        >
            {trackings.map((tracking: Tracking) => (
                <TrackingItem key={tracking.id} trackingData={tracking}/>
            ))}
        </div>
    );
}
