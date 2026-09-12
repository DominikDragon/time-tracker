import { ProjectProvider } from "../context/ProductContext";
import { TimerProvider } from "../context/TimerContext";
import { TimerPage } from "../pages/TimerPage";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import "../global.css";

function App() {
    return (
        <BrowserRouter>
            <ProjectProvider>
                <TimerProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={<TimerPage/>}
                        />
                    </Routes>
                    <div className="flex flex-row gap-6 mt-10">
                        <a href="/projects">Projects</a>
                        <a href="/">Timer</a>
                    </div>
                </TimerProvider>
            </ProjectProvider>
        </BrowserRouter>
    );
}

export default App;
