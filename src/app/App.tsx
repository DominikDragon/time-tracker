import { ProjectProvider } from "../context/ProjectContext";
import { TimerProvider } from "../context/TimerContext";
import { TimerPage } from "../pages/TimerPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../global.css";
import { ProjectsPage } from "../pages/ProjectsPage";
import { TrackingProvider } from "../context/TrackingContext";
import { TrackingPage } from "../pages/TrackingPage";
import { openProjectWindow } from "../services/window/projectWindow";
import { openTrackingWindow } from "../services/window/trackingWindow";

function App() {
    return (
        <BrowserRouter>
            <ProjectProvider>
                <TimerProvider>
                    <TrackingProvider>
                        <Routes>
                            <Route path="/" element={<TimerPage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/trackings" element={<TrackingPage />} />
                        </Routes>
                        <div className="flex flex-row gap-6 mt-10">
                            <button onClick={openProjectWindow}>Projects</button>
                            <button onClick={openTrackingWindow}>Trackings</button>
                        </div>
                    </TrackingProvider>
                </TimerProvider>
            </ProjectProvider>
        </BrowserRouter>
    );
}

export default App;
