import { ProjectSelection } from "../components/ProjectSelection";
import { SummaryInput } from "../components/SummaryInput";
import { TimerControls } from "../components/TimerControls";

export function TimerPage() {
    return (
        <>
            <ProjectSelection />
            <SummaryInput/>
            <TimerControls />
        </>
    );
}
