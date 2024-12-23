import React, { useState } from 'react';
import { Step } from '../../types';

interface FormPreviewProps {
  steps: Step[];
}

const FormPreview = ({ steps }: FormPreviewProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex];

  const validateStep = () => {
    if (!formData[currentStep.id]) {
      setErrors('This field is required');
      return false;
    }
    setErrors('');
    return true;
  };

  const nextHandler = () => {
    if (validateStep() && currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousHandler = () => {
    if (validateStep() && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [currentStep.id]: event.target.value });
  };

  if (!steps.length) {
    return <p>No steps available. Please add a step in the editor.</p>;
  }

  return (
    <div>
      <h3>{currentStep.title}</h3>
      <input
        type="text"
        value={formData[currentStep.id] || ''}
        onChange={changeHandler}
        placeholder={currentStep.content.props.children}
      />
      {errors && <p style={{ color: 'red' }}>{errors}</p>}

      <div>
        <button onClick={previousHandler} disabled={currentStepIndex === 0}>
          Previous
        </button>
        <button
          onClick={nextHandler}
          disabled={currentStepIndex === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormPreview;
