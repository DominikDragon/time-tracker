export type Timer = {
    id: string,
    projectId: string | null,
    durationSeconds: number,
    summary: string,
    running: boolean,
    active: boolean,
}