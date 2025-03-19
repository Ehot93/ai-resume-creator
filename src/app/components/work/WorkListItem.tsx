    import { deleteWork, updateWork, WorkListItemData } from "@/app/model/work";
import { Input } from "@/components/ui/input";
import { X } from "@phosphor-icons/react";
import { reatomComponent } from "@reatom/npm-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WorkListItemProps {
    item: WorkListItemData;
}

const WorkListItem = reatomComponent<WorkListItemProps>(({item, ctx}) => {
    const { watch, register, getValues} = useForm<WorkListItemData>({
        defaultValues: item,
        mode: "onChange"
    });

    useEffect(() => {
        const subscription = watch(() => {
            updateWork(ctx, getValues());
        })
        return () => subscription.unsubscribe();
    }, [watch])

    const handleDelete = () => {
        deleteWork(ctx, item.id);
    }

    return (
        <div className="relative">
            <button className="absolute top-0 right-0 cursor-pointer" onClick={handleDelete}>
                <X size={32} />
            </button>
            <form>
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
});

const WorkListItemMemo = React.memo(WorkListItem);
export default WorkListItemMemo;
