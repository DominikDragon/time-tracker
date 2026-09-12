import { useState } from "react";
import { useTracking } from "../../hooks/useTracking";
import { FilterDropdown } from "./FilterDropdown";
import { parseTime } from "../../utils/time";

export function TimeFilter() {
    const { filters, setFilters } = useTracking();

    const [minInput, setMinInput] = useState("");
    const [maxInput, setMaxInput] = useState("");

    const [correctMin, setCorrectMin] = useState(true);
    const [correctMax, setCorrectMax] = useState(true);

    function handleChange(input: string, which: "min" | "max"): void {
        const setInput = which === "min" ? setMinInput : setMaxInput;
        const setCorrectness = which === "min" ? setCorrectMin : setCorrectMax;

        const valueName = which === "min" ? "minDurationSeconds" : "maxDurationSeconds";

        setInput(input);

        if (!input.trim()) {
            setCorrectness(true);

            setFilters({
                ...filters,
                [valueName]: undefined,
            });

            return;
        }

        const duration = parseTime(input);

        if (duration === undefined || duration === null) {
            setCorrectness(false);
            return;
        }

        setCorrectness(true);

        setFilters({
            ...filters,
            [valueName]: duration,
        });
    }

    return (
        <FilterDropdown label="time">
            <div className="flex flex-row gap-1">
                <input
                    value={minInput}
                    onChange={(event) => handleChange(event.target.value, "min")}
                    placeholder="min"
                    className={!correctMin ? "border-b-2 border-red-500 w-18 font-normal placeholder-brown" : "w-18 font-normal placeholder-brown"}
                />
                <span className="text-brown">-</span>
                <input
                    value={maxInput}
                    onChange={(event) => handleChange(event.target.value, "max")}
                    placeholder="max"
                    className={!correctMax ? "border-b-2 border-red-500 w-18 text-right font-normal placeholder-brown" : "w-18 text-right font-normal placeholder-brown"}
                />
            </div>
        </FilterDropdown>
    );
}
