import { ReactNode, useState, useEffect, createContext } from "react";
import type { Timer, TimerValidationErrors } from "../types/timer";

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
    validationErrors: TimerValidationErrors;
    startTimer: () => void;
    stopTimer: () => void;
    updateDuration: (newDurationSeconds: number) => void;
    updateProjectID: (newProjectID: string) => void;
    updateSummary: (newSummary: string) => void;
    setValidationErrors: (errors: TimerValidationErrors) => void;
    clearValidationError: (field: keyof TimerValidationErrors) => void;
    newTimer: () => void;
};

export const TimerContext = createContext<TimerContextValue | null>(null);

// Provider

export function TimerProvider({ children }: { children: ReactNode }) {
    const [timer, setTimer] = useState<Timer>(() => createNewTimer());
    const [validationErrors, setValidationErrorsState] = useState<TimerValidationErrors>({
        duration: false,
        project: false,
        summary: false,
    });

    function clearValidationError(field: keyof TimerValidationErrors): void {
        setValidationErrorsState((prev) => ({ ...prev, [field]: false }));
    }

    function startTimer(): void {
        clearValidationError("duration");
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
        clearValidationError("duration");
        setTimer((prev) => ({
            ...prev,
            durationSeconds: newDurationSeconds,
        }));
    }

    function updateProjectID(newProjectId: string): void {
        clearValidationError("project");
        setTimer((prev) => ({
            ...prev,
            projectId: newProjectId,
        }));
    }

    function updateSummary(newSummary: string): void {
        clearValidationError("summary");
        setTimer((prev) => ({
            ...prev,
            summary: newSummary,
        }));
    }

    function newTimer(): void {
        setTimer(createNewTimer());
        setValidationErrorsState({ duration: false, project: false, summary: false });
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
        validationErrors,
        startTimer,
        stopTimer,
        updateDuration,
        updateProjectID,
        updateSummary,
        setValidationErrors: setValidationErrorsState,
        clearValidationError,
        newTimer,
    };

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}
