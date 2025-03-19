import { deleteEducation, EducationListItemData, updateEducation } from "@/app/model/education";
import { Input } from "@/components/ui/input";
import { X } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { reatomComponent } from "@reatom/npm-react";

interface EducationListItemProps {
    item: EducationListItemData;
}

const EducationListItem = reatomComponent<EducationListItemProps>(({item, ctx}) => {
    const { watch, register, getValues} = useForm<EducationListItemData>({
        defaultValues: item,
        mode: "onChange"
    });

    useEffect(() => {
        const subscription = watch(() => {
            updateEducation(ctx, getValues());
        })
        return () => subscription.unsubscribe();
    }, [watch])

    const handleDelete = () => {
        deleteEducation(ctx, item.id);
    }

    return (
        <div className="relative">
            <div className="absolute top-0 right-0 cursor-pointer" onClick={handleDelete}>
                <X size={32} />
            </div>
            <form>
                <div className="flex gap-2">
                    <Input
                        label="Institution"
                        {...register("institution")}
                    />
                    <Input
                        label="Degree"
                        {...register("degree")}
                    />
                </div>
                <div className="flex gap-2">
                    <Input
                        label="Field of Study"
                        {...register("fieldStudy")}
                    />
                    <div className="flex gap-2">
                    <Input
                        label="Start"
                        {...register("start")}
                    />
                    <Input
                        label="End"
                        {...register("end")}
                    />
                    </div>
                </div>
            </form>
    </div>)
});

const EducationListItemMemo = React.memo(EducationListItem);
export default EducationListItemMemo;