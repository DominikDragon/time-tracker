export type Tracking = {
    id: string;
    projectId: string;
    durationSeconds: number;
    summary: string;
    createdAt: string;
};

export type TrackingRaw = {
    id: string;
    project_id: string;
    duration_seconds: number;
    summary: string;
    created_at: string;
};

export type TrackingFilters = {
    minDate?: string;
    maxDate?: string;
    search?: string;
    projectId?: string;
    minDurationSeconds?: number;
    maxDurationSeconds?: number;
};

export type TrackingCursor = {
    createdAt: string;
    id: string;
};

export type TrackingPagination = {
    limit: number;
    cursor?: TrackingCursor;
};
