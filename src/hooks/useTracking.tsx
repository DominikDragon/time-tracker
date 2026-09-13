import { useContext } from "react";
import { TrackingContext } from "../context/TrackingContext";

export function useTracking() {
    const context = useContext(TrackingContext);

    if (!context) {
        throw new Error("useTracking must be used inside of TrackingProvider");
    }

    return context;
}
