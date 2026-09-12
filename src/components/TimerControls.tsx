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
        <div className="flex flex-col text-black gap-6">
            <input value={timeInput} onChange={(event) => handleChangeTime(event.target.value)} />
            <button onClick={() => startTimer()}>Start</button>
            <button onClick={() => stopTimer()}>Stop</button>
        </div>
    );
}
