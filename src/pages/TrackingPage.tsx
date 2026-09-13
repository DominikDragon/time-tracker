import { DurationInfo } from "../components/DurationInfo";
import { FilterRow } from "../components/filtering/FilterRow";
import { SearchBar } from "../components/filtering/SearchBar";
import { TrackingList } from "../components/TrackingList";

export function TrackingPage() {
    return (
        <div className="flex h-full min-h-0 flex-col px-6 pt-6 pb-0">
            <div className="relative flex flex-1 min-h-0 flex-col gap-0 w-full min-w-0 rounded-[20px] pb-6">
                <div className="absolute inset-0 grid grid-cols-[18%_18%_1fr_1fr] gap-0 pointer-events-none rounded-[20px]">
                    <div className="bg-light-green/50 rounded-l-[20px]" />
                    <div className="bg-green/40" />
                    <div className="bg-light-green/40" />
                    <div className="bg-green/40 rounded-r-[20px]" />
                </div>
                <div className="relative z-10 flex h-full min-h-0 flex-col">
                    <div
                        aria-hidden="true"
                        className="spiral-strip pointer-events-none absolute inset-x-6 top-[-12.5px] h-[25px]"
                    />
                    <div className="w-full h-fit">
                        <FilterRow />
                        <div className="mx-4 mb-4 h-1 border-b-3 border-dashed border-green" />
                    </div>
                    <SearchBar />
                    <TrackingList />
                </div>
            </div>

            <DurationInfo />
        </div>
    );
}
