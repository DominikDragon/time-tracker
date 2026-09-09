import { ReactNode, useState, useEffect, createContext } from "react";
import type { Timer } from "../types/Timer";

// Functions

function createNewTimer(): Timer {
    return {
        id: crypto.randomUUID(),
        durationSeconds: 0,
        running: false,
        active: true,
    };
}

// Context

export type TimerContextValue = {
    timer: Timer;
    startTimer: () => void;
    stopTimer: () => void;
    updateDuration: (newDurationSeconds: number) => void;
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

    function updateDuration(newDurationSeconds: number) {
        setTimer((prev) => ({
            ...prev,
            durationSeconds: newDurationSeconds,
        }));
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
    };

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}
