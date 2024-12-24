import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Step } from '../../types';

const StepList = ({
  steps,
  onReorder,
  onEdit,
  onDelete,
}: {
  steps: Step[];
  onReorder: (reorderedSteps: Step[]) => void;
  onEdit: (step: Step) => void;
  onDelete: (id: string) => void;
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSteps = Array.from(steps);
    const [movedStep] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, movedStep);

    onReorder(reorderedSteps);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="steps">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {steps.map((step, index) => (
              <Draggable key={step.id} draggableId={step.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h4>{`${index + 1}. ${step.title}`}</h4>
                    <button onClick={() => onEdit(step)}>Edit</button>
                    <button onClick={() => onDelete(step.id)}>Delete</button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default StepList;
