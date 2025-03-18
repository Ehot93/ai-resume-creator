import { atom } from "@reatom/core";

export interface EducationListItemData {
    institution: string;
    degree: string;
    fieldStudy: string;
    start: string;
    end: string;
    id: string;
}

export const educationListData = atom<EducationListItemData[]>([]);