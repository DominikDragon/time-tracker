import { useTimer } from "../hooks/useTimer";
import { useTracking } from "../hooks/useTracking";

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

    return <button onClick={handleSave} className="rounded-[20px] bg-light-green px-8 py-2 cursor-pointer">SAVE</button>    
}
