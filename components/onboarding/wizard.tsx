"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface WizardProps {
  steps: { title: string; description: string }[];
  children: React.ReactNode[];
  onComplete: () => void;
}

export function Wizard({ steps, children, onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  }

  function prev() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep > index
                  ? "bg-green-600 text-white"
                  : currentStep === index
                  ? "bg-green-100 text-green-700 border-2 border-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {currentStep > index ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-12 ${
                  currentStep > index ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {steps[currentStep].description}
          </p>

          {children[currentStep]}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prev}
              disabled={currentStep === 0}
            >
              Voltar
            </Button>
            <Button onClick={next}>
              {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
