'use client'

import { Input } from "@/components/ui/input";
import { User } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { personalDataUnwrapped, personalInfoData, PersonalInfoData } from "@/app/model/personal";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { reatomComponent } from "@reatom/npm-react";

const Personal = reatomComponent(({ctx}) => {
    const { register, watch } = useForm<PersonalInfoData>({
        defaultValues: ctx.get(personalDataUnwrapped),
        mode: "onChange"
    });

    useEffect(() => {
        const subscription = watch((value, { name }) => {

            if(typeof name === "undefined") return;
            const data = ctx.get(personalInfoData);
            data[name](ctx, value[name] ?? "");
        })
        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <div className="flex flex-col gap-2">
            <h2>
                <User size={20} />
                Personal Information
            </h2>
            <form>
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
})

export default Personal;