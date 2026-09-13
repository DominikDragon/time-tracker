import { DateFilter } from "./DateFilter";
import { TimeFilter } from "./TimeFilter";
import { ProjectFilter } from "./ProjectFilter";

export function FilterRow() {
    return (
        <div className="grid grid-cols-[18%_18%_1fr_1fr] gap-0 py-2 mt-4 mb-0">
            <DateFilter />
            <TimeFilter />
            <ProjectFilter />
            <div className="w-full min-w-0 items-center justify-center font-normal flex flex-row gap-2">
                <img src="/icons/message.svg" className="h-5 w-5"/>
                <span>message</span>
            </div>
        </div>
    );
}
