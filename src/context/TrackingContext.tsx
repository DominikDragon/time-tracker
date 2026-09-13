import { ReactNode, useState, useEffect, useRef, createContext } from "react";
import { emit, listen } from "@tauri-apps/api/event";
import { getFilteredTrackings, createTracking } from "../services/database/trackingService";
import { TrackingFilters, TrackingCursor, type Tracking } from "../types/tracking";
import type { Timer } from "../types/timer";

const TRACKING_CREATED_EVENT = "tracking-created";

type TrackingContextValue = {
    trackings: Tracking[];
    filters: TrackingFilters;
    totalDuration: number;
    setFilters: (filters: TrackingFilters) => void;
    loadMoreTrackings: () => Promise<void>;
    saveTracking: (timer: Timer) => Promise<void>;
};

export const TrackingContext = createContext<TrackingContextValue | null>(null);

export function TrackingProvider({ children }: { children: ReactNode }) {
    const [trackings, setTrackings] = useState<Tracking[]>([]);
    const [filters, setFilters] = useState<TrackingFilters>({});
    const [totalDuration, setTotalDuration] = useState<number>(0);

    const [cursor, setCursor] = useState<TrackingCursor | undefined>();
    const [hasMore, setHasMore] = useState(true);
    const loadingMore = useRef(false);

    async function loadTrackings(
        currentFilters: TrackingFilters,
        currentCursor?: TrackingCursor,
    ): Promise<void> {
        const { trackings: newTrackings, totalDurationSeconds: newTotalDuration } = await getFilteredTrackings(currentFilters, {
            limit: 20,
            cursor: currentCursor,
        });

        setTotalDuration(newTotalDuration);

        if (currentCursor) {
            setTrackings((prev) => [...prev, ...newTrackings].slice(-200));
        } else {
            setTrackings(newTrackings);
        }

        if (newTrackings.length < 20) {
            setHasMore(false);
        } else {
            const lastTracking = newTrackings[newTrackings.length - 1];

            setCursor({
                createdAt: lastTracking.createdAt,
                id: lastTracking.id,
            });
        }
    }

    useEffect(() => {
        void loadTrackings(filters);

        let isCancelled = false;
        let unlisten: (() => void) | undefined;

        void listen(TRACKING_CREATED_EVENT, () => {
            void loadTrackings(filters);
        }).then((removeListener) => {
            if (isCancelled) {
                removeListener();
            } else {
                unlisten = removeListener;
            }
        });

        return () => {
            isCancelled = true;
            unlisten?.();
        };
    }, [filters]);

    async function handleSetFilters(newFilters: TrackingFilters): Promise<void> {
        setFilters(newFilters);
        setCursor(undefined);
        setHasMore(true);

        await loadTrackings(newFilters);
    }

    async function loadMoreTrackings(): Promise<void> {
        if (!hasMore || !cursor || loadingMore.current) {
            return;
        }

        loadingMore.current = true;

        try {
            await loadTrackings(filters, cursor);
        } finally {
            loadingMore.current = false;
        }
    }

    async function saveTracking(timer: Timer): Promise<void> {
        await createTracking(timer);
        await emit(TRACKING_CREATED_EVENT);

        setCursor(undefined);
        setHasMore(true);

        await loadTrackings(filters);
    }

    const value: TrackingContextValue = {
        trackings,
        filters,
        totalDuration,
        setFilters: handleSetFilters,
        loadMoreTrackings,
        saveTracking,
    };

    return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
}
