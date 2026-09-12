import { ProjectSelection } from "../components/ProjectSelection";
import { SaveTracking } from "../components/SaveTracking";
import { SummaryInput } from "../components/SummaryInput";
import { TimerControls } from "../components/TimerControls";
import { openProjectWindow } from "../services/window/projectWindow";
import { openTrackingWindow } from "../services/window/trackingWindow";

export function TimerPage() {
    return (
        <>
            <ProjectSelection />
            <SummaryInput />
            <TimerControls />
            <SaveTracking />
            <div className="flex flex-row gap-6">
                <button onClick={openProjectWindow}>Projects</button>
                <button onClick={openTrackingWindow}>Trackings</button>
            </div>
        </>
    );
}
