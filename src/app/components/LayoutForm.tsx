'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Stepper from "./Stepper";
import { useState, useCallback } from "react";
import Personal from "./personal";
import Work from "./work";
import Education from "./education";
import Skills from "./skills";
import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Summary from "./summary";

const LayoutForm = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const totalSteps = 5;

    const handleNext = useCallback(() => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep]);

    const handleBack = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <Personal/>;
            case 1:
                return <Work />;
            case 2:
                return <Education />;
            case 3:
                return <Skills />;
            case 4: 
            return <Summary/>
            default:
                return null;
        }
    };

    return(
        <Card className="p-4">
            <CardHeader>
                <Stepper 
                    items={["1", "2", "3", "4", "5"]} 
                    labels={["Personal", "Experience", "Education", "Skills", "Summary"]}
                    onChange={setCurrentStep}
                />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {renderStep()}
                
                <hr className="border-t border-gray-200 my-4" />
                
                <div className="flex justify-between">
                    <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                    >
                        <CaretLeft size={16} />
                        Back
                    </Button>
                    
                    <Button 
                        className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
                        onClick={handleNext}
                        disabled={currentStep === totalSteps - 1}
                    >
                        Next
                        <CaretRight size={16} />
                    </Button>
                </div>
            </CardContent> 
        </Card>        
    )
}

export default LayoutForm;