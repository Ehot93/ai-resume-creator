import { EducationListItemData } from "@/app/model/education";
import { Input } from "@/components/ui/input";
import { X } from "@phosphor-icons/react";
import React from "react";
import { useForm } from "react-hook-form";

interface EducationListItemProps {
    item: EducationListItemData;
    onChange: (value: EducationListItemData) => void;
    onDelete: () => void;
}

const EducationListItem = ({item:{institution, degree, fieldStudy, start, end, id}, onChange, onDelete}:EducationListItemProps) => {
    const { handleSubmit, register} = useForm<EducationListItemData>({
        defaultValues: {
            institution,
             degree,
              fieldStudy,
               start,
                end,
                 id
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
};

const EducationListItemMemo = React.memo(EducationListItem);
export default EducationListItemMemo;