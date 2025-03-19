import { action, atom } from "@reatom/core";

export interface EducationListItemData {
    institution: string;
    degree: string;
    fieldStudy: string;
    start: string;
    end: string;
    id: string;
}

export const educationListData = atom<EducationListItemData[]>([]);

export const updateEducation = action((ctx, payload:EducationListItemData) => {
    educationListData(ctx, (prev) => prev.map((item) => item.id === payload.id ? payload : item));
})

export const addEducation = action((ctx, id:string) => {
    educationListData(ctx, (prev) => [...prev, {id, institution: "", degree: "", fieldStudy: "", start: "", end: ""}]);
})

export const deleteEducation = action((ctx, id:string) => {
    educationListData(ctx, (prev) => prev.filter((item) => item.id !== id));
})
