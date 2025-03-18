import { EducationListItemData } from "./education";
import { SkillItemData } from "./skills";
import { PersonalInfoData } from "./personal";
import { WorkListItemData } from "./work";
import { atom } from "@reatom/core";


export interface FullData {
    personal: PersonalInfoData;
    work: WorkListItemData[];
    education: EducationListItemData[];
    skills: SkillItemData[];
}

export const fullData = atom<FullData>({
    personal: {
        name: "",
        job: "",
        email: "",
        phone: "",
        location: "",
    },
    work: [],
    education: [],
    skills: [],
});

