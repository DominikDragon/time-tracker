import { getDatabase } from "./database";
import type { Tracking, TrackingRaw } from "../../types/tracking";
import type { Timer } from "../../types/timer";

function mapTracking(rawTracking: TrackingRaw): Tracking {
    return {
        id: rawTracking.id,
        projectId: rawTracking.project_id,
        durationSeconds: rawTracking.duration_seconds,
        summary: rawTracking.summary,
        createdAt: rawTracking.created_at,
    };
}

export async function getTrackings() {
    const db = await getDatabase();

    const trackingsRaw = await db.select<TrackingRaw[]>("SELECT * FROM trackings");

    const trackings = trackingsRaw.map(mapTracking);

    return trackings;
}

export async function createTracking(timer: Timer): Promise<void> {
    const db = await getDatabase();

    const dateTime: string = new Date().toISOString();

    try {
        await db.execute(
            "INSERT INTO trackings (id, project_id, duration_seconds, summary, created_at) VALUES ($1, $2, $3, $4, $5)",
            [timer.id, timer.projectId, timer.durationSeconds, timer.summary, dateTime],
        );
    } catch (error) {
        throw error;
    }
}
