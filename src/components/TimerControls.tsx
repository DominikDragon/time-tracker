import { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { formatTime, parseTime } from "../utils/time";

export function TimerControls() {
    const { timer, startTimer, stopTimer, updateDuration } = useTimer();
    const [timeInput, setTimeInput] = useState<string>(formatTime(timer.durationSeconds));

    useEffect(() => {
        setTimeInput(formatTime(timer.durationSeconds));
    }, [timer.durationSeconds]);

    function handleChangeTime(input: string): void {
        const durationSeconds = parseTime(timeInput);

        if (durationSeconds !== null) updateDuration(durationSeconds);

        setTimeInput(input);
        return;
    }

    return (
        <div className="flex flex-col gap-2 w-40 bg-green rounded-[20px] text-cream px-2 py-10 items-center justify-center">
            <input
                value={timeInput}
                onChange={(event) => handleChangeTime(event.target.value)}
                className="w-full text-center text-2xl"
            />
            {timer.running && <button onClick={() => stopTimer()}>Stop</button>}
            {!timer.running && <button onClick={() => startTimer()}>Start</button>}
        </div>
    );
}
