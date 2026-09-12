import { useState } from "react";
import { useTimer } from "../hooks/useTimer";

export function SummaryInput() {
    const { updateSummary } = useTimer();

    const [inputValue, setInputValue] = useState<string>("");

    function handleSummaryChange(input: string):void{
        setInputValue(input);
        updateSummary(input);
    }

    return (
        <input value={inputValue} onChange={(event) => handleSummaryChange(event.target.value)} />
    );
}
