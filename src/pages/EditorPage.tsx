import React, { useState } from 'react';
import StepEditor from '../components/StepEditor/StepEditor.component';
import InputConfigurator from '../components/InputConfigurator/InputConfigurator.component';
import StepList from '../components/StepList/StepList.component';
import InputList from '../components/InputList/InputList.component';
import FormPreview from '../components/FormPreview/FormPreview.component';
import { v4 as uuidv4 } from 'uuid';
import { Step } from '../types';

const EditorPage = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepTitle, setStepTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);

  // Step Editing

  const [inputType, setInputType] = useState<
    'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio'
  >('text');
  const [inputLabel, setInputLabel] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('');

  // Add New Input

  const addInputHandler = () => {
    if (!inputLabel || !inputName) {
      alert('Please fill out Label and Name fields.');
      return;
    }

    const newInput = {
      id: uuidv4(),
      type: inputType,
      label: inputLabel,
      name: inputName,
      placeholder: inputPlaceholder,
    };

    setSteps(
      steps.map((step) =>
        step.id === editingStepId
          ? { ...step, inputs: [...step.inputs, newInput] }
          : step
      )
    );

    setInputType('text');
    setInputLabel('');
    setInputName('');
    setInputPlaceholder('');
  };

  // Add New Input

  const addStepHandler = () => {
    if (!stepTitle) {
      alert('Please fill out the title');
      return;
    }

    const newStep: Step = {
      id: uuidv4(),
      title: stepTitle,
      inputs: [],
    };

    setSteps([...steps, newStep]);

    setStepTitle('');
  };

  // Delete a Step

  const deleteStepHandler = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  // Edit Existing Step
  const editStepHandler = (step: Step) => {
    setStepTitle(step.title);
    setIsEditing(true);
    setEditingStepId(step.id);
  };
  // Save Changes to Step

  const saveEditedStepHandler = () => {
    if (!stepTitle) {
      alert('Please fill out Title field.');
      return;
    }

    setSteps(
      steps.map((step) =>
        step.id === editingStepId ? { ...step, title: stepTitle } : step
      )
    );

    setIsEditing(false);
    setEditingStepId(null);
    setStepTitle('');
  };

  return (
    <div>
      <h2>Steps Editor</h2>
      <StepEditor
        stepTitle={stepTitle}
        isEditing={isEditing}
        onTitleChange={(e) => setStepTitle(e.target.value)}
        onSave={saveEditedStepHandler}
        onAdd={addStepHandler}
      />

      {/* Inputs Configurator */}

      {isEditing && (
        <InputConfigurator
          inputType={inputType}
          inputLabel={inputLabel}
          inputName={inputName}
          inputPlaceholder={inputPlaceholder}
          onTypeChange={(e) => setInputType(e.target.value as any)}
          onLabelChange={(e) => setInputLabel(e.target.value)}
          onNameChange={(e) => setInputName(e.target.value)}
          onPlaceholderChange={(e) => setInputPlaceholder(e.target.value)}
          onAdd={addInputHandler}
        />
      )}

      {/* Inputs List */}

      {isEditing && (
        <InputList
          inputs={steps.find((step) => step.id === editingStepId)?.inputs || []}
          onReorder={(reorderedInputs) =>
            setSteps(
              steps.map((step) =>
                step.id === editingStepId
                  ? { ...step, inputs: reorderedInputs }
                  : step
              )
            )
          }
          onDelete={(inputId) =>
            setSteps(
              steps.map((step) =>
                step.id === editingStepId
                  ? {
                      ...step,
                      inputs: step.inputs.filter((i) => i.id !== inputId),
                    }
                  : step
              )
            )
          }
        />
      )}

      {/* Steps List */}
      <StepList
        steps={steps}
        onReorder={(reorderedSteps) => setSteps(reorderedSteps)}
        onEdit={editStepHandler}
        onDelete={deleteStepHandler}
      />
      {/* <FormPreview steps={steps}></FormPreview> */}
    </div>
  );
};

export default EditorPage;
