import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../utils/time";

export function TimerPage() {
  const { timer, startTimer, stopTimer } = useTimer();

  return (
    <div className="flex flex-col text-black gap-6">
      <p>{formatTime(timer.durationSeconds)}</p>
      <button onClick={() => startTimer()}>
        Start
      </button>
        <button onClick={() => stopTimer()}>
        Stop
      </button>
    </div>
  );
}