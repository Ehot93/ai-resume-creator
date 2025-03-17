'use client';

import { Briefcase } from "@phosphor-icons/react";
import WorkListItem from "./WorkListItem";
import { useCallback, useState } from "react";
import { WorkListItemData } from "@/app/model/work";
import { Button } from "@/components/ui/button";

interface WorkProps {
    items: WorkListItemData[];
    onChange: (value: WorkListItemData[]) => void;
}
const Work = ({items}:WorkProps) => {
    const [workListItems, setWorkListItems] = useState<WorkListItemData[]>(items);
    const onChangeHandler = useCallback((item: WorkListItemData) => {
        setWorkListItems((prev) => [...prev.filter((i) => i.id !== item.id), item]);
    }, []);

    const handleAdd = () => onChangeHandler({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        id: Date.now().toString(),
    });

    const handleDelete = useCallback(()=>{
        // setWorkListItems()
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <h2>
                <Briefcase size={32} />
                Work Experience
            </h2>
            {workListItems.map((item, index) => <WorkListItem item={item} onChange={onChangeHandler} onDelete={() => handleDelete.bind(item)} key={index}/>)}
           <Button onClick={handleAdd}>+ Add Another Experience</Button>
        </div>
    )
}

export default Work;