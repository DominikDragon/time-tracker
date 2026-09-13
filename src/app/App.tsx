import { ProjectProvider } from "../context/ProjectContext";
import { TimerProvider } from "../context/TimerContext";
import { TrackingProvider } from "../context/TrackingContext";

import { TimerPage } from "../pages/TimerPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { TrackingPage } from "../pages/TrackingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TitleBar } from "../components/TitleBar";

import "../global.css";

function App() {
    return (
        <BrowserRouter>
            <ProjectProvider>
                <TimerProvider>
                    <TrackingProvider>
                        <div className="h-full w-full flex flex-col rounded-[30px] overflow-hidden border-4 border-brown">
                            <TitleBar />

                            <div className="relative flex flex-1 min-h-0 flex-col bg-cream">
                                <img src="/icons/background-art.svg" className="absolute z-0 w-[120vw] h-screen object-cover object-top-left opacity-20"/>

                                <div className="relative z-10 p-2 flex-1 min-h-0">
                                    <Routes>
                                        <Route path="/" element={<TimerPage />} />
                                        <Route path="/projects" element={<ProjectsPage />} />
                                        <Route path="/trackings" element={<TrackingPage />} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </TrackingProvider>
                </TimerProvider>
            </ProjectProvider>
        </BrowserRouter>
    );
}

export default App;
