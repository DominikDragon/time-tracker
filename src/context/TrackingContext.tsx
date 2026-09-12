import { ReactNode, useState, useEffect, useRef, createContext } from "react";
import { getFilteredTrackings, createTracking } from "../services/database/trackingService";
import { TrackingFilters, TrackingCursor, type Tracking } from "../types/tracking";
import type { Timer } from "../types/timer";

type TrackingContextValue = {
    trackings: Tracking[];
    filters: TrackingFilters;
    setFilters: (filters: TrackingFilters) => void;
    loadMoreTrackings: () => Promise<void>;
    saveTracking: (timer: Timer) => Promise<void>;
};

export const TrackingContext = createContext<TrackingContextValue | null>(null);

export function TrackingProvider({ children }: { children: ReactNode }) {
    const [trackings, setTrackings] = useState<Tracking[]>([]);
    const [filters, setFilters] = useState<TrackingFilters>({});

    const [cursor, setCursor] = useState<TrackingCursor | undefined>();
    const [hasMore, setHasMore] = useState(true);
    const loadingMore = useRef(false);

    async function loadTrackings(
        currentFilters: TrackingFilters,
        currentCursor?: TrackingCursor,
    ): Promise<void> {
        const newTrackings = await getFilteredTrackings(currentFilters, {
            limit: 20,
            cursor: currentCursor,
        });

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
        loadTrackings(filters);
    }, []);

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

        setCursor(undefined);
        setHasMore(true);

        await loadTrackings(filters);
    }

    const value: TrackingContextValue = {
        trackings,
        filters,
        setFilters: handleSetFilters,
        loadMoreTrackings,
        saveTracking,
    };

    return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
}
