import { getDatabase } from "./database";
import type {
    Tracking,
    TrackingRaw,
    TrackingFilters,
    TrackingPagination,
} from "../../types/tracking";
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

export async function getFilteredTrackings(
    filters: TrackingFilters,
    pagination: TrackingPagination,
): Promise<{
    trackings: Tracking[];
    totalDurationSeconds: number;
}> {
    const where = createTrackingWhereClause(filters);

    const [trackings, totalDurationSeconds] = await Promise.all([
        queryTrackings(where, pagination),
        queryTotalDuration(where),
    ]);

    return {
        trackings,
        totalDurationSeconds,
    };
}

type TrackingWhere = {
    clause: string;
    params: unknown[];
};

function createTrackingWhereClause(filters: TrackingFilters): TrackingWhere {
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (filters.minDate) {
        conditions.push(`trackings.created_at >= $${params.length + 1}`);
        params.push(filters.minDate);
    }

    if (filters.maxDate) {
        conditions.push(`trackings.created_at < $${params.length + 1}`);
        const exclusiveMaxDate = new Date(`${filters.maxDate}T00:00:00.000Z`);
        exclusiveMaxDate.setUTCDate(exclusiveMaxDate.getUTCDate() + 1);
        params.push(exclusiveMaxDate.toISOString());
    }

    if (filters.search) {
        conditions.push(`(summary LIKE $${params.length + 1} OR projects.name LIKE $${params.length + 1})`);
        params.push(`%${filters.search}%`);
    }

    if (filters.projectId) {
        conditions.push(`project_id = $${params.length + 1}`);
        params.push(filters.projectId);
    }

    if (filters.minDurationSeconds !== undefined) {
        conditions.push(`duration_seconds >= $${params.length + 1}`);
        params.push(filters.minDurationSeconds);
    }

    if (filters.maxDurationSeconds !== undefined) {
        conditions.push(`duration_seconds <= $${params.length + 1}`);
        params.push(filters.maxDurationSeconds);
    }

    return {
        clause: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
        params,
    };
}

async function queryTrackings(
    where: TrackingWhere,
    pagination: TrackingPagination,
): Promise<Tracking[]> {
    const db = await getDatabase();

    const conditions = where.clause ? [where.clause.replace("WHERE ", "")] : [];

    const params = [...where.params];

    if (pagination.cursor) {
        const createdAtParam = params.length + 1;
        const idParam = params.length + 2;

        conditions.push(`
            (
                trackings.created_at < $${createdAtParam}
                OR (
                    trackings.created_at = $${createdAtParam}
                    AND trackings.id < $${idParam}
                )
            )
        `);

        params.push(pagination.cursor.createdAt, pagination.cursor.id);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const limitParam = params.length + 1;
    params.push(pagination.limit);

    const query = `
        SELECT
            trackings.id,
            trackings.project_id,
            trackings.duration_seconds,
            trackings.summary,
            trackings.created_at
        FROM trackings
        JOIN projects ON projects.id = trackings.project_id
        ${whereClause}
        ORDER BY trackings.created_at DESC, trackings.id DESC
        LIMIT $${limitParam}
    `;

    const rawTrackings = await db.select<TrackingRaw[]>(query, params);

    return rawTrackings.map(mapTracking);
}

async function queryTotalDuration(where: TrackingWhere): Promise<number> {
    const db = await getDatabase();

    const result = await db.select<{ total_duration: number }[]>(
        `
            SELECT COALESCE(SUM(duration_seconds), 0) AS total_duration
            FROM trackings
            JOIN projects ON projects.id = trackings.project_id
            ${where.clause}
        `,
        where.params,
    );

    return Number(result[0]?.total_duration ?? 0);
}
