const StepEditor = ({
  stepTitle,
  isEditing,
  onTitleChange,
  onSave,
  onAdd,
}: {
  stepTitle: string;
  isEditing: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onAdd: () => void;
}) => (
  <div>
    <h3>{isEditing ? 'Edit Step' : 'Create a New Step'}</h3>
    <input
      type="text"
      placeholder="Step Title"
      value={stepTitle}
      onChange={onTitleChange}
    />
    {isEditing ? (
      <button onClick={onSave}>Save Changes</button>
    ) : (
      <button onClick={onAdd}>Add Step</button>
    )}
  </div>
);

export default StepEditor;
