import { ProjectProvider } from "../context/ProductContext";
import { TimerProvider } from "../context/TimerContext";
import { TimerPage } from "../pages/TimerPage";
import "../global.css";

function App() {
    return (
        <ProjectProvider>
            <TimerProvider>
                <TimerPage />
            </TimerProvider>
        </ProjectProvider>
    );
}

export default App;
