import React, { useState } from 'react';
import { Step } from '../../types';

interface FormPreviewProps {
  steps: Step[];
}

const FormPreview = ({ steps }: FormPreviewProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<
    Record<string, Record<string, string>>
  >({});
  const [errors, setErrors] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex];

  const validateStep = () => {
    const stepData = formData[currentStep.id] || {};
    const missingFields = currentStep.inputs.filter(
      (input) => !stepData[input.name]
    );

    if (missingFields.length) {
      setErrors(
        `Please fill out: ${missingFields
          .map((input) => input.label)
          .join(', ')}`
      );
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
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [currentStep.id]: { ...formData[currentStep.id], [name]: value },
    });
  };

  if (!steps.length) {
    return (
      <p>
        There is nothing to preview yet. Try adding new steps in the Editor!
      </p>
    );
  }
  if (!steps[currentStepIndex]?.inputs.length) {
    return (
      <p>
        There are no form fields on this step yet. Try adding new fields in the
        Editor!
      </p>
    );
  }
  console.log(formData);

  return (
    <div>
      <h3>{currentStep.title}</h3>
      {currentStep.inputs.map((input) => (
        <label key={input.id}>
          {input.label}
          <input
            type={input.type}
            name={input.name}
            value={formData[currentStep.id]?.[input.name] || ''}
            onChange={changeHandler}
            placeholder={input.placeholder}
          />
        </label>
      ))}

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
