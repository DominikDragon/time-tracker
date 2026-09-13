import { useTracking } from "../../hooks/useTracking";
import { FilterDropdown } from "./FilterDropdown";

export function DateFilter() {
    const { filters, setFilters } = useTracking();

    return (
        <FilterDropdown icon="calendar" label="date">
            <div className="flex flex-col items-center justify-center gap-1">
                <input
                    type="date"
                    value={filters.minDate ?? ""}
                    onChange={(event) =>
                        setFilters({
                            ...filters,
                            minDate: event.target.value || undefined,
                        })
                    }
                    className="w-fit font-normal text-brown text-center"
                />
                <span className="text-brown">-</span>
                <input
                    type="date"
                    value={filters.maxDate ?? ""}
                    onChange={(event) =>
                        setFilters({
                            ...filters,
                            maxDate: event.target.value || undefined,
                        })
                    }
                    className="w-fit font-normal text-brown text-center"
                />
                <button
                    type="button"
                    onClick={() => setFilters({ ...filters, minDate: undefined, maxDate: undefined })}
                    className="mt-1 cursor-pointer font-normal text-brown underline"
                >
                    clear
                </button>
            </div>
        </FilterDropdown>
    );
}
