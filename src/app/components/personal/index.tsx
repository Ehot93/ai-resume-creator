'use client'

import { User } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { personalInfoData, updatePersonalInfo } from "@/app/model/personal";
import { reatomComponent } from "@reatom/npm-react";

const Personal = reatomComponent(({ctx}) => {
    const personalInfo = ctx.spy(personalInfoData);

    const handleChange = (field: string, value: string) => {
        updatePersonalInfo(ctx, { [field]: value });
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-xl font-medium">
                <User size={24} className="text-blue-500" />
                Personal Information
            </h2>
            
            <form>
                <div className="flex gap-2">
                    <Input
                        label="Full Name"
                        name="name"
                        value={ctx.spy(personalInfo.name)}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <Input
                        label="Job Title"
                        name="job"
                        value={ctx.spy(personalInfo.job)}
                        onChange={(e) => handleChange('job', e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Input
                        label="Email"
                        name="email"
                        value={ctx.spy(personalInfo.email)}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        value={ctx.spy(personalInfo.phone)}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        label="Location"
                        name="location"
                        value={ctx.spy(personalInfo.location)}
                        onChange={(e) => handleChange('location', e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
});

export default Personal;