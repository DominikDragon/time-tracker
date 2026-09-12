export type Tracking = {
    id: string,
    projectId: string,
    durationSeconds: number,
    summary: string,
    createdAt: string,
}

export type TrackingRaw = {
    id: string;
    project_id: string;
    duration_seconds: number;
    summary: string;
    created_at: string;
};