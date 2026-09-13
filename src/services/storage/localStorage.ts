import type { Timer } from "../../types/timer";

const LOCAL_STORAGE_KEY = "timer";

export function saveToLocalStorage(timer: Timer): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timer));
}

export function loadFromLocalStorage(): Timer | null {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Timer) : null;
    } catch {
        return null;
    }
}
