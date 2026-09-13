import { ProjectSelection } from "../components/ProjectSelection";
import { SaveTracking } from "../components/SaveTracking";
import { SummaryInput } from "../components/SummaryInput";
import { TimerControls } from "../components/TimerControls";

export function TimerPage() {
    return (
        <div className="w-full h-full flex flex-col p-6 gap-6">
            <div className="flex-1 min-h-0 flex items-center gap-6">
                <div className="w-fit">
                    <TimerControls />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <ProjectSelection />
                    <SummaryInput />
                </div>
            </div>
            <div className="shrink-0 w-full flex justify-end">
                <SaveTracking />
            </div>
        </div>
    );
}
