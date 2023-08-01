import { SetStateAction } from "react";

export interface FilterCardProps
{
    name: string;
    setFilterMenu: React.Dispatch<SetStateAction<string[]>>;
    filterMenu: string[];
    currentParams: string[] | undefined;
    currentFilter: string | null;
    addFilter: (type: string, value: string)=>void;
}