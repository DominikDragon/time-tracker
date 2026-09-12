import { useTimer } from "../hooks/useTimer";
import { useTracking } from "../hooks/useTracking";

export function SaveTracking() {
    const { timer, newTimer } = useTimer();
    const { saveTracking } = useTracking();

    function handleSave(): void {
        saveTracking(timer);
        newTimer();
    }

    return <button onClick={handleSave}>Save Tracking</button>    
}
