import { ReactNode, useState, useEffect, createContext } from "react";
import { getTrackings, createTracking } from "../services/database/trackingService";
import type { Tracking } from "../types/tracking";
import type { Timer } from "../types/timer";

// Context

type TrackingContextValue = {
    trackings: Tracking[];
    saveTracking: (timer: Timer) => Promise<void>;
};

export const TrackingContext = createContext<TrackingContextValue | null>(null);

// Provider

export function TrackingProvider({ children }: { children: ReactNode }) {
    const [trackings, setTrackings] = useState<Tracking[]>([]);

    useEffect(() => {
        async function loadTrackings() {
            const trackings = await getTrackings();
            setTrackings(trackings);
        }

        loadTrackings();
    }, []);

    async function saveTracking(timer: Timer): Promise<void> {
        createTracking(timer);
        const trackings = await getTrackings();
        setTrackings(trackings);
    }

    const value: TrackingContextValue = {
        trackings,
        saveTracking,
    };

    return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
}
