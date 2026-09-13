CREATE TABLE trackings (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL,
    summary TEXT NOT NULL,
    created_at TEXT NOT NULL,

    FOREIGN KEY (project_id) REFERENCES projects(id)
);