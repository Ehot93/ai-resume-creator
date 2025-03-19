import { action, atom } from "@reatom/core";

export interface WorkListItemData {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    id: string;
}

export const workListData = atom<WorkListItemData[]>([]);

export const updateWork = action((ctx, payload:WorkListItemData) => {
    workListData(ctx, (prev) => prev.map((item) => item.id === payload.id ? payload : item));
})

export const addWork = action((ctx, id:string) => {
    workListData(ctx, (prev) => [...prev, {id, company: "", position: "", startDate: "", endDate: "", description: ""}]);
})

export const deleteWork = action((ctx, id:string) => {
    workListData(ctx, (prev) => prev.filter((item) => item.id !== id));
})

