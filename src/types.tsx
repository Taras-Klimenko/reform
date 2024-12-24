export interface InputField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio';
  label: string;
  name: string;
  placeholder?: string;
  validation?: (value: string | number) => string | null;
}

export interface Step {
  id: string;
  title: string;
  inputs: InputField[];
}
