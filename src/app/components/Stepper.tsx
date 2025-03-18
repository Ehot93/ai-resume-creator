import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StepperProps {
    items: string[];
    labels?: string[];
    onChange: (value: number) => void;
}

const Stepper = ({items, labels, onChange}: StepperProps) => {
    const [current, setCurrent] = useState(0);
    const onClickHandler = (value: number) => {
        setCurrent(value);
        onChange(value);
    }

    return (
        <div className="flex justify-around relative">
            <hr className="absolute top-1/2 left-0 right-0 h-0.5 w-full bg-primary/20"/>
            {items.map((item, index) => (
                <div key={index} className="z-10 flex flex-col items-center gap-2">
                    <Button
                        variant={current >= index ? "default" : "outline"}
                        className={cn(
                            "rounded-full h-12 w-12",
                            current === index && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => onClickHandler(index)}
                    >
                        {item}
                    </Button>
                    {labels && (
                        <span className="text-sm">
                            {labels[index]}
                        </span>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Stepper;