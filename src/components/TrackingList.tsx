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
            className="min-h-0 flex-1 flex flex-col gap-4 overflow-y-auto overflow-x-hidden mt-6"
            onScroll={handleTrackingScroll}
        >
            {trackings.length === 0 ? (
                <p className="text-center text-brown bg-middle-green w-fit mx-auto rounded-full px-2">No trackings yet.</p>
            ) : (
                trackings.map((tracking: Tracking) => (
                    <TrackingItem key={tracking.id} trackingData={tracking} />
                ))
            )}
        </div>
    );
}