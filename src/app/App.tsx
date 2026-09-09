import { TimerProvider } from "../context/TimerContext";
import { TimerPage } from "../pages/TimerPage";
import "../global.css";

function App() {
  return (
    <TimerProvider>
      <TimerPage />
    </TimerProvider>
  );
}

export default App;
