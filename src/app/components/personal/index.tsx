'use client'

import { Input } from "@/components/ui/input";
import { User } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { PersonalInfoData } from "@/app/model/personal";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Personal = ({data, onChange}: {data: PersonalInfoData, onChange: (data: PersonalInfoData) => void}) => {
    const { handleSubmit, register, watch, getValues } = useForm<PersonalInfoData>({
        defaultValues: data,
        mode: "onChange"
    });
    
    useEffect(() => {
        const subscription = watch(() => {
            onChange(getValues());
        })
        return () => subscription.unsubscribe()
    }, [watch])

    const onChangeHandler = (data: PersonalInfoData) => {
        onChange(data);
    }

    return (
        <div className="flex flex-col gap-2">
            <h2>
                <User size={20} />
                Personal Information
            </h2>
            <form onSubmit={handleSubmit(onChangeHandler)}>
                <div className="flex gap-2">
                    <Input
                        label="Full Name"
                        {...register("name")}
                    />
                    <Input
                        label="Job Title"
                        {...register("job")}
                    />
                </div>
                <div className="flex gap-2">
                    <Input
                        label="Email"
                        {...register("email")}
                    />
                    <Input
                        label="Phone"
                        {...register("phone")}
                    />
                </div>
                <div>
                    <Input
                        label="Location"
                        {...register("location")}
                    />
                </div>    
            </form>
            <Button type="submit">Submit</Button>
        </div>
    )
}

export default Personal;