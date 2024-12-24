import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { InputField } from '../../types';

const InputList = ({
  inputs,
  onReorder,
  onDelete,
}: {
  inputs: InputField[];
  onReorder: (reorderedInputs: InputField[]) => void;
  onDelete: (id: string) => void;
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedInputs = Array.from(inputs);
    const [movedInput] = reorderedInputs.splice(result.source.index, 1);
    reorderedInputs.splice(result.destination.index, 0, movedInput);

    onReorder(reorderedInputs);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="input-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            {inputs.map((input, index) => (
              <Draggable key={input.id} draggableId={input.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <span>
                      {input.label} ({input.type})
                    </span>
                    <button onClick={() => onDelete(input.id)}>Delete</button>
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

export default InputList;
