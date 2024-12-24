import React from 'react';

const InputConfigurator = ({
  inputType,
  inputLabel,
  inputName,
  inputPlaceholder,
  onTypeChange,
  onLabelChange,
  onNameChange,
  onPlaceholderChange,
  onAdd,
}: {
  inputType: string;
  inputLabel: string;
  inputName: string;
  inputPlaceholder: string;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceholderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}) => (
  <div>
    <h3>Configure Inputs</h3>
    <label>
      Type:
      <select value={inputType} onChange={onTypeChange}>
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="password">Password</option>
        <option value="number">Number</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio</option>
      </select>
    </label>
    <label>
      Label:
      <input
        type="text"
        value={inputLabel}
        onChange={onLabelChange}
        placeholder="Input Label"
      />
    </label>
    <label>
      Name:
      <input
        type="text"
        value={inputName}
        onChange={onNameChange}
        placeholder="Input Name"
      />
    </label>
    <label>
      Placeholder:
      <input
        type="text"
        value={inputPlaceholder}
        onChange={onPlaceholderChange}
        placeholder="Input Placeholder"
      />
    </label>
    <button onClick={onAdd}>Add Input</button>
  </div>
);

export default InputConfigurator;
