import { atom } from "@reatom/core";

export interface PersonalInfoData {
    name: string;
    job: string;
    email: string;
    phone: string;
    location: string;
}

export const personalInfoData = atom<PersonalInfoData>({
    name: "",
    job: "",
    email: "",
    phone: "",
    location: "",
});