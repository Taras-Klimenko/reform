import React, { useState } from 'react';

interface FormStep {
  id: string;
  title: string;
  content: JSX.Element;
}

interface FormPreviewProps {
  steps: FormStep[];
}

const FormPreview = ({ steps }: FormPreviewProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <div className="form-step">{steps[currentStep]?.content}</div>
      <div className="form-navigation">
        <button onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormPreview;
