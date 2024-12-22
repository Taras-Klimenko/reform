import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import FormPreview from '../components/FormPreview/FormPreview.component';
import { v4 as uuidv4 } from 'uuid';

interface Step {
  id: string;
  title: string;
  content: JSX.Element;
}

const EditorPage = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepTitle, setStepTitle] = useState('');
  const [stepContent, setStepContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);

  const addStepHandler = () => {
    if (!stepTitle || !stepContent) {
      alert('Please fill out both title and content.');
      return;
    }

    const newStep: Step = {
      id: uuidv4(),
      title: stepTitle,
      content: <div>{stepContent}</div>,
    };

    setSteps([...steps, newStep]);

    setStepTitle('');
    setStepContent('');
  };

  const deleteStepHandler = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const editStepHandler = (step: Step) => {
    setStepTitle(step.title);
    setStepContent((step.content as JSX.Element).props.children);
    setIsEditing(true);
    setEditingStepId(step.id);
  };

  const saveEditedStepHandler = () => {
    if (!stepTitle || !stepContent) {
      alert('Please fill out both title and content.');
      return;
    }

    setSteps(
      steps.map((step) =>
        step.id === editingStepId
          ? { ...step, title: stepTitle, content: <div>{stepContent}</div> }
          : step
      )
    );

    setIsEditing(false);
    setEditingStepId(null);
    setStepTitle('');
    setStepContent('');
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedSteps = Array.from(steps);
    const [movedStep] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, movedStep);

    setSteps(reorderedSteps);
  };

  return (
    <div>
      <h2>Steps Editor</h2>
      <div>
        <h3>{isEditing ? 'Edit Step' : 'Create a New Step'}</h3>
        <input
          type="text"
          placeholder="Step Title"
          value={stepTitle}
          onChange={(e) => setStepTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Step Content"
          value={stepContent}
          onChange={(e) => setStepContent(e.target.value)}
        />
        {isEditing ? (
          <button onClick={saveEditedStepHandler}>Save Changes</button>
        ) : (
          <button onClick={addStepHandler}>Add Step</button>
        )}
      </div>
      <div>
        <h3>Steps</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {steps.map((step, index) => (
                  <Draggable
                    key={step.id}
                    draggableId={step.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h4>{`${index + 1}. ${step.title}`}</h4>
                        <button onClick={() => editStepHandler(step)}>
                          Edit
                        </button>
                        <button onClick={() => deleteStepHandler(step.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <FormPreview steps={steps}></FormPreview>
    </div>
  );
};

export default EditorPage;
