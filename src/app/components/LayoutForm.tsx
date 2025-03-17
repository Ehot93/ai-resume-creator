'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Stepper from "./Stepper";
import { useState } from "react";
import Personal from "./personal";
import Work from "./work";

const LayoutForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    console.log(currentStep);

    return(
        <Card className="p-4">
            <CardHeader>
                <Stepper items={["1", "2", "3", "4", "5"]} onChange={setCurrentStep}/>
            </CardHeader>
            <CardContent>
                <Personal/>
                <Work items={[]} onChange={() => {}}/>
            </CardContent> 
        </Card>        
    )
}

export default LayoutForm;