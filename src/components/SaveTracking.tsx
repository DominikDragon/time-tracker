import { useTimer } from "../hooks/useTimer";
import { useTracking } from "../hooks/useTracking";

export function SaveTracking() {
    const { timer, newTimer } = useTimer();
    const { saveTracking } = useTracking();

    async function handleSave(): Promise<void> {
        await saveTracking(timer);
        newTimer();
    }

    return <button onClick={handleSave} className="rounded-[20px] bg-light-green px-8 py-2 cursor-pointer">SAVE</button>    
}
