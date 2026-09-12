import { useTimer } from "../hooks/useTimer";

export function SummaryInput() {
    const { timer, updateSummary } = useTimer();

    function handleSummaryChange(input: string): void {
        updateSummary(input);
    }

    return (
        <input
            value={timer.summary}
            onChange={(event) => handleSummaryChange(event.target.value)}
        />
    );
}