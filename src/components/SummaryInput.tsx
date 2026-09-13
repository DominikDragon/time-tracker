import { useTimer } from "../hooks/useTimer";

export function SummaryInput() {
    const { timer, validationErrors, updateSummary } = useTimer();

    function handleSummaryChange(input: string): void {
        updateSummary(input);
    }

    return (
        <textarea
            rows={3}
            value={timer.summary}
            onChange={(event) => handleSummaryChange(event.target.value)}
            placeholder="details..."
            className={`border-3 rounded-[20px] w-full px-2 py-1 placeholder-brown text-brown resize-none overflow-y-auto ${validationErrors.summary ? "border-red-600" : "border-light-green"}`}
        />
    );
}