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
            <div className="relative">
            <input
                type="search"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="search"
                className="w-full rounded-[20px] bg-green py-1 pl-3 pr-10 text-cream font-normal placeholder-cream"
            />
                <img
                    src="/icons/search-light.svg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
                />
            </div>
        </div>
    );
}
