'use client';

import { Sparkle, X } from "@phosphor-icons/react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { addSkill, deleteSkill, skillListData, updateSkill } from "@/app/model/skills";
import { Input } from "@/components/ui/input";
import { reatomComponent } from "@reatom/npm-react";

const Skills = reatomComponent(({ctx}) => {
    const idPrefix = useId();

    const handleAdd = () => {
        const newId = `${idPrefix}-${ctx.get(skillListData).length}`;
        addSkill(ctx, newId);
    };

    const handleDelete = (id: string) => {
        deleteSkill(ctx, id);
    };

    const handleSkillChange = (id: string, name: string) => {
        updateSkill(ctx, {id, name});
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-2 text-xl font-medium">
                <Sparkle size={24} className="text-blue-500" />
                Skills
            </h2>
            
            <p className="text-gray-500">
                Add skills that are relevant to the job you&apos;re applying for.
            </p>
            
            <div className="flex flex-col gap-4">
                {ctx.spy(skillListData).map((item, index) => (
                    <div key={item.id} className="relative">
                        <Input 
                            placeholder={`Skill ${index + 1}`}
                            value={item.name}
                            onChange={(e) => handleSkillChange(item.id, e.target.value)}
                            className="pr-12"
                        />
                        <button 
                            onClick={() => handleDelete(item.id)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            type="button"
                            aria-label="Remove skill"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ))}
                
                <Button 
                    variant="outline" 
                    className="border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    onClick={handleAdd}
                >
                    + Add Another Skill
                </Button>
            </div>
        </div>
    );
});

export default Skills; 