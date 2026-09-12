import { useState } from "react";
import { useTracking } from "../../hooks/useTracking";

export function SearchBar() {
    const {filters, setFilters} = useTracking();

    const [search, setSearch] = useState("");

    function handleSearchChange(input: string){
        setSearch(input);
        setFilters({
            ...filters,
            search: input,
        })
    }

    return (
        <div className="w-full px-2">
            <input
                type="text"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="search"
                className="w-full px-3 py-2 rounded-[20px] bg-green text-cream font-normal placeholder-cream"
            />
        </div>
    );
}
