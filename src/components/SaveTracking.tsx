import { useTimer } from "../hooks/useTimer";
import { useTracking } from "../hooks/useTracking";
import { MAX_DURATION_SECONDS } from "../utils/time";

export function SaveTracking() {
    const { timer, newTimer, setValidationErrors } = useTimer();
    const { saveTracking } = useTracking();

    async function handleSave(): Promise<void> {
        const validationErrors = {
            duration: timer.durationSeconds <= 0,
            project: !timer.projectId,
            summary: !timer.summary.trim(),
        };

        if (Object.values(validationErrors).some(Boolean)) {
            setValidationErrors(validationErrors);
            return;
        }

        await saveTracking(timer);
        newTimer();
    }

    return (
        <div className="flex w-full items-center justify-end gap-4">
            {timer.durationSeconds >= MAX_DURATION_SECONDS && (
                <span className="mr-auto text-green">Please go touch some grass!</span>
            )}
            <button onClick={handleSave} className="rounded-[20px] bg-light-green px-8 py-2 cursor-pointer hover:bg-middle-green transition-colors duration-200 active:scale-95">SAVE</button>
        </div>
    );
}
