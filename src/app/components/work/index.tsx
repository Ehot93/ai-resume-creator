'use client';

import { Briefcase } from "@phosphor-icons/react";
import WorkListItem from "./WorkListItem";
import { useId } from "react";
import { addWork, workListData, WorkListItemData } from "@/app/model/work";
import { Button } from "@/components/ui/button";
import { reatomComponent } from "@reatom/npm-react";

interface WorkProps {
    items: WorkListItemData[];
}
const Work = reatomComponent<WorkProps>(({ctx}) => {
    const idPrefix = useId();

    const handleAdd = () => {
        const newId = `${idPrefix}-${ctx.get(workListData).length}`;
        addWork(ctx, newId)
    };

    return (
        <div className="flex flex-col gap-2">
            <h2>
                <Briefcase size={32} />
                Work Experience
            </h2>
            {ctx.spy(workListData).map((item) => <WorkListItem item={item} key={item.id}/>)}
           <Button onClick={handleAdd}>+ Add Another Experience</Button>
        </div>
    )
})

export default Work;