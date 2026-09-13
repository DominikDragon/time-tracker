import { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { formatTime, MAX_DURATION_SECONDS, parseTime } from "../utils/time";

export function TimerControls() {
    const { timer, validationErrors, startTimer, stopTimer, updateDuration } = useTimer();
    const [timeInput, setTimeInput] = useState<string>(formatTime(timer.durationSeconds));

    useEffect(() => {
        setTimeInput(formatTime(timer.durationSeconds));
    }, [timer.durationSeconds]);

    function handleChangeTime(input: string): void {
        const durationSeconds = parseTime(input);

        if (durationSeconds !== null) updateDuration(durationSeconds);

        setTimeInput(input);
        return;
    }

    return (
        <div className="flex flex-col gap-2 w-40 bg-green rounded-[20px] text-cream px-5 py-6 items-center justify-center">
            <input
                value={timeInput}
                onChange={(event) => handleChangeTime(event.target.value)}
                className={`w-full text-center text-2xl ${validationErrors.duration ? "text-red-600" : "text-cream"}`}
            />

            <span className="w-full h-1 rounded-full bg-cream"></span>

            <div className="h-10 w-full flex justify-center">
                {timer.running && (
                    <button onClick={() => stopTimer()} className="cursor-pointer hover:rotate-360 hover:scale-105 transition-transform duration-300">
                        <img src="/icons/stop.svg" className="h-10 w-10" />
                    </button>
                )}
                {!timer.running && (
                    <button
                        onClick={() => startTimer()}
                        disabled={timer.durationSeconds >= MAX_DURATION_SECONDS}
                        className="cursor-pointer transition-transform duration-300 disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:rotate-360 enabled:hover:scale-105"
                    >
                        <img src="icons/play.svg" className="h-10 w-10"/>
                    </button>
                )}
            </div>
        </div>
    );
}
