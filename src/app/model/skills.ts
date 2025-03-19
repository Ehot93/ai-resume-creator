import { action, atom } from "@reatom/core";

export interface SkillItemData {
    name: string;
    id: string;
} 

export const skillListData = atom<SkillItemData[]>([]);

export const addSkill = action((ctx, id:string) => {
    skillListData(ctx, (prev) => [...prev, {id, name: ""}]);
})

export const deleteSkill = action((ctx, id:string) => {
    skillListData(ctx, (prev) => prev.filter((item) => item.id !== id));
})

export const updateSkill = action((ctx, payload:SkillItemData) => {
    skillListData(ctx, (prev) => prev.map((item) => item.id === payload.id ? payload : item));
})  
