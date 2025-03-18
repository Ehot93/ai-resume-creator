'use client';

import { Sparkle, X } from "@phosphor-icons/react";
import { useCallback, useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { SkillItemData } from "@/app/model/skills";
import { Input } from "@/components/ui/input";

interface SkillsProps {
    items: SkillItemData[];
    onChange: (value: SkillItemData[]) => void;
}

const Skills = ({items}: SkillsProps) => {
    const [skillItems, setSkillItems] = useState<SkillItemData[]>(items.length ? items : [{id: "initial-1", name: ""}]); 
    const idPrefix = useId();

    const handleAdd = () => {
        const newId = `${idPrefix}-${skillItems.length}`;
        setSkillItems([...skillItems, {
            name: "",
            id: newId,
        }]);
    };

    const handleDelete = useCallback((id: string) => {
        setSkillItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const handleSkillChange = (id: string, name: string) => {
        setSkillItems(prev => prev.map(item => 
            item.id === id ? { ...item, name } : item
        ));
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
                {skillItems.map((item, index) => (
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
};

export default Skills; 