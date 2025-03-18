'use client';

import { GraduationCap } from "@phosphor-icons/react";
import { useCallback, useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { EducationListItemData } from "@/app/model/education";
import EducationListItem from "./EducationListItem";

interface EducationProps {
    items: EducationListItemData[];
    onChange: (value: EducationListItemData[]) => void;
}
const Education = ({items}:EducationProps) => {
    const [educationListItems, setEducationListItems] = useState<EducationListItemData[]>(items);
    const idPrefix = useId();
    
    const onChangeHandler = useCallback((item: EducationListItemData) => {
        setEducationListItems((prev) => [...prev.filter((i) => i.id !== item.id), item]);
    }, []);

    const handleAdd = () => {
        const newId = `${idPrefix}-${educationListItems.length}`;
        onChangeHandler({
            institution: "",
            degree: "", 
            fieldStudy: "",
            start: "",
            end: "",
            id: newId,
        });
    };

    const handleDelete = useCallback((item: EducationListItemData) => {
        setEducationListItems(educationListItems.filter((i) => i.id !== item.id));
    }, [educationListItems]);

    return (
        <div className="flex flex-col gap-2">
            <h2>
                <GraduationCap size={32} />
                Education
            </h2>
            {educationListItems.map((item) => <EducationListItem item={item} onChange={onChangeHandler} onDelete={() => handleDelete(item)} key={item.id}/>)}
           <Button onClick={handleAdd}>+ Add Another Education</Button>
        </div>
    )
}

export default Education;