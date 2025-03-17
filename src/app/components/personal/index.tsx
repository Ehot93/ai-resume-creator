import { Input } from "@/components/ui/input";
import { User } from "@phosphor-icons/react";

const Personal = () => {
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
                        name="name"
                    />
                    <Input
                        label="Job Title"
                        name="job"
                    />
                </div>
                <div className="flex gap-2">
                    <Input
                        label="Email"
                        name="email"
                    />
                    <Input
                        label="Phone"
                        name="phone"
                    />
                </div>
                <div>
                    <Input
                        label="Location"
                        name="location"
                    />
                </div>
            </form>
        </div>
    )
}

export default Personal;