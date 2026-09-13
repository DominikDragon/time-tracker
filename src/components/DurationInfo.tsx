import { useTracking } from "../hooks/useTracking";
import { formatTime } from "../utils/time";

export function DurationInfo() {
    const { totalDuration } = useTracking();

    return (
        <div className="flex flex-row justify-end my-2 px-2 shrink-0">
            <p>
                Total: <span>{formatTime(totalDuration)}</span>
            </p>
        </div>
    );
}
