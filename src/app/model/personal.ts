import { action, atom, AtomMut } from "@reatom/core";
import { ToAtomType, createDataAtom } from "../lib/atomUtils";

export interface PersonalInfoData {
    name: string;
    job: string;
    email: string;
    phone: string;
    location: string;
}

// Автоматически создаем атомарный тип из обычного типа
export type PersonalInfoDataAtom = ToAtomType<PersonalInfoData>;

// Создаем атом с начальными данными
export const personalInfoData = createDataAtom<PersonalInfoData>({
    name: "",
    job: "",
    email: "",
    phone: "",
    location: "",
});

// Действие для обновления персональных данных
export const updatePersonalInfo = action((ctx, payload: Partial<PersonalInfoData>) => {
    const currentData = ctx.get(personalInfoData);
    
    // Обновляем только те поля, которые предоставлены в payload
    for (const key in payload) {
        if (key in currentData && payload[key as keyof PersonalInfoData] !== undefined) {
            (currentData[key as keyof PersonalInfoDataAtom] as AtomMut<unknown>)(
                ctx, 
                payload[key as keyof PersonalInfoData]
            );
        }
    }
});

export const personalDataUnwrapped = atom<PersonalInfoData>((ctx) => {
    const value = ctx.spy(personalInfoData);
    return {
        name: ctx.spy(value.name),
        job: ctx.spy(value.job),
        email: ctx.spy(value.email),
        phone: ctx.spy(value.phone),
        location: ctx.spy(value.location)
    }
})

