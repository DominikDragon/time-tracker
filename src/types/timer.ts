export type Timer = {
    id: string,
    projectId: string | null,
    durationSeconds: number,
    summary: string,
    running: boolean,
    active: boolean,
}

export type TimerValidationErrors = {
    duration: boolean;
    project: boolean;
    summary: boolean;
};