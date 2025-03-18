import { atom } from "@reatom/core";

export interface SkillItemData {
    name: string;
    id: string;
} 

export const skillListData = atom<SkillItemData[]>([]);