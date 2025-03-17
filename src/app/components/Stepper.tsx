import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StepperProps {
    items: string[];
    onChange: (value: number) => void;
}
const Stepper = ({items, onChange}: StepperProps) => {
    const [current, setCurrent] = useState(0);
    const onClickHandler = (value: number) => {
        setCurrent(value);
        onChange(value);
    }

    return (
        <div className="flex justify-around">
            <hr className="absolute top-1/2 left-1/2 h-1 w-full -translate-x-1/2 -translate-y-1/2 transform bg-primary"/>
            {items.map((item, index) => <div key={index}>
                <Button
                className={cn(current >= index && "bg-primary text-primary-foreground")}
                    onClick={() => onClickHandler(index)}
                >{index + 1}</Button>
                <span>{item}</span>
            </div>
            )}
        </div>
    )
}

export default Stepper;