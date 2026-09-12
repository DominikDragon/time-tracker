import { ProjectProvider } from "../context/ProjectContext";
import { TimerProvider } from "../context/TimerContext";
import { TimerPage } from "../pages/TimerPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../global.css";
import { ProjectsPage } from "../pages/ProjectsPage";
import { TrackingProvider } from "../context/TrackingContext";

function App() {
    return (
        <BrowserRouter>
            <ProjectProvider>
                <TimerProvider>
                    <TrackingProvider>
                        <Routes>
                            <Route path="/" element={<TimerPage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                        </Routes>
                        <div className="flex flex-row gap-6 mt-10">
                            <Link to="/projects">Projects</Link>
                            <Link to="/">Timer</Link>
                        </div>
                    </TrackingProvider>
                </TimerProvider>
            </ProjectProvider>
        </BrowserRouter>
    );
}

export default App;
