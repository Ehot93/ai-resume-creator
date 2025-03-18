import { atom } from "@reatom/core";

export interface WorkListItemData {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    id: string;
}

export const workListData = atom<WorkListItemData[]>([]);