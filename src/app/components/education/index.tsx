'use client';

import { GraduationCap } from "@phosphor-icons/react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { addEducation, educationListData } from "@/app/model/education";
import EducationListItem from "./EducationListItem";
import { reatomComponent } from "@reatom/npm-react";

const Education = reatomComponent(({ctx}) => {
    const idPrefix = useId();

    const handleAdd = () => {
        const newId = `${idPrefix}-${ctx.get(educationListData).length}`;
        addEducation(ctx, newId);
    };

    return (
        <div className="flex flex-col gap-2">
            <h2>
                <GraduationCap size={32} />
                Education
            </h2>
            {ctx.spy(educationListData).map((item) => <EducationListItem item={item} key={item.id}/>)}
           <Button onClick={handleAdd}>+ Add Another Education</Button>
        </div>
    )
})

export default Education;