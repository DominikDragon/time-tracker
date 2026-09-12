import { ReactNode, useState, useEffect, createContext } from "react";
import type { Timer } from "../types/timer";

// Functions

function createNewTimer(): Timer {
    return {
        id: crypto.randomUUID(),
        projectId: null,
        durationSeconds: 0,
        summary: "",
        running: false,
        active: true,
    };
}

// Context

type TimerContextValue = {
    timer: Timer;
    startTimer: () => void;
    stopTimer: () => void;
    updateDuration: (newDurationSeconds: number) => void;
    updateProjectID: (newProjectID: string) => void;
    updateSummary: (newSummary: string) => void;
    newTimer: () => void;
};

export const TimerContext = createContext<TimerContextValue | null>(null);

// Provider

export function TimerProvider({ children }: { children: ReactNode }) {
    const [timer, setTimer] = useState<Timer>(() => createNewTimer());

    function startTimer(): void {
        setTimer((prev) => ({
            ...prev,
            running: true,
        }));
    }

    function stopTimer(): void {
        setTimer((prev) => ({
            ...prev,
            running: false,
        }));
    }

    function updateDuration(newDurationSeconds: number): void {
        setTimer((prev) => ({
            ...prev,
            durationSeconds: newDurationSeconds,
        }));
    }

    function updateProjectID(newProjectId: string): void {
        setTimer((prev) => ({
            ...prev,
            projectId: newProjectId,
        }));
    }

    function updateSummary(newSummary: string): void {
        setTimer((prev) => ({
            ...prev,
            summary: newSummary,
        }));
    }

    function newTimer(): void {
        setTimer(createNewTimer());
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer.running) {
                setTimer((prev) => ({
                    ...prev,
                    durationSeconds: prev.durationSeconds + 1,
                }));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer.running]);

    const value: TimerContextValue = {
        timer,
        startTimer,
        stopTimer,
        updateDuration,
        updateProjectID,
        updateSummary,
        newTimer,
    };

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}
