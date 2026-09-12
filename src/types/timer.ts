export type Timer = {
    id: string,
    projectId: string | null,
    durationSeconds: number,
    running: boolean,
    active: boolean,
}