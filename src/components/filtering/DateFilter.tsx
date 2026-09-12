import { useTracking } from "../../hooks/useTracking";
import { FilterDropdown } from "./FilterDropdown";

export function DateFilter() {
    const { filters, setFilters } = useTracking();

    return (
        <FilterDropdown label="date">
            <div>
                <label>
                    Min date
                    <input
                        type="date"
                        value={filters.minDate ?? ""}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                minDate: event.target.value || undefined,
                            })
                        }
                    />
                </label>
            </div>

            <div>
                <label>
                    Max date
                    <input
                        type="date"
                        value={filters.maxDate ?? ""}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                maxDate: event.target.value || undefined,
                            })
                        }
                    />
                </label>
            </div>
        </FilterDropdown>
    );
}
