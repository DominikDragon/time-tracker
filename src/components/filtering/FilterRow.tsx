import { DateFilter } from "./DateFilter";
import { TimeFilter } from "./TimeFilter";
import { ProjectFilter } from "./ProjectFilter";

export function FilterRow() {
    return (
        <div className="grid grid-cols-[18%_18%_1fr_1fr] gap-0 py-2 mt-4 border-b-3 border-dashed border-green mx-4 mb-4">
            <DateFilter />
            <TimeFilter />
            <ProjectFilter />
            <span className="w-full min-w-0 text-center font-normal">message</span>
        </div>
    );
}
