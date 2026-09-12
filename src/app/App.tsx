import { ProjectProvider } from "../context/ProjectContext";
import { TimerProvider } from "../context/TimerContext";
import { TimerPage } from "../pages/TimerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../global.css";
import { ProjectsPage } from "../pages/ProjectsPage";
import { TrackingProvider } from "../context/TrackingContext";
import { TrackingPage } from "../pages/TrackingPage";
import { TitleBar } from "../components/TitleBar";

function App() {
    return (
        <BrowserRouter>
            <ProjectProvider>
                <TimerProvider>
                    <TrackingProvider>
                        <div className="h-full w-full flex flex-col">
                            <TitleBar />

                            <div className="flex-1 min-h-0 bg-cream p-2 rounded-b-[30px] overflow-hidden">
                                <Routes>
                                    <Route path="/" element={<TimerPage />} />

                                    <Route path="/projects" element={<ProjectsPage />} />

                                    <Route path="/trackings" element={<TrackingPage />} />
                                </Routes>
                            </div>
                        </div>
                    </TrackingProvider>
                </TimerProvider>
            </ProjectProvider>
        </BrowserRouter>
    );
}

export default App;
