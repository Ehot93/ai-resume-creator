import { WorkListItemData } from "@/app/model/work";
import { Input } from "@/components/ui/input";
import { X } from "@phosphor-icons/react";
import React from "react";
import { useForm } from "react-hook-form";

interface WorkListItemProps {
    item: WorkListItemData;
    onChange: (value: WorkListItemData) => void;
    onDelete: () => void;
}

const WorkListItem = ({item:{company, position, startDate, endDate, description}, onChange, onDelete}:WorkListItemProps) => {
    const { handleSubmit, register} = useForm<WorkListItemData>({
        defaultValues: {
            company,
            position,
            startDate,
            endDate,
            description
        },
        mode: "onChange"
    });

    return (
        <div className="relative">
            <div className="absolute top-0 right-0 cursor-pointer" onClick={onDelete}>
                <X size={32} />
            </div>
            <form onSubmit={handleSubmit(onChange)}>
                <div className="flex gap-2">
                    <Input
                        label="Company"
                        {...register("company")}
                    />
                    <Input
                        label="Position"
                        {...register("position")}
                    />
                </div>
                <div className="flex gap-2">
                    <Input
                        label="Start Date"
                        {...register("startDate")}
                    />
                    <Input
                        label="End Date"
                        {...register("endDate")}
                    />
                </div>
                <div>
                    <Input
                        label="Description"
                        {...register("description")}
                    />
                </div>
            </form>
    </div>)
};

const WorkListItemMemo = React.memo(WorkListItem);
export default WorkListItemMemo;