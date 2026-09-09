import { useTimer } from "../hooks/useTimer";

export function TimerPage() {
  const { timer, startTimer, stopTimer } = useTimer();

  return (
    <div className="flex flex-col text-black gap-6">
      <p>{timer.durationSeconds}</p>
      <button onClick={() => startTimer()}>
        Start
      </button>
        <button onClick={() => stopTimer()}>
        Stop
      </button>
    </div>
  );
}