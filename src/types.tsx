export interface Step {
  id: string;
  title: string;
  content: JSX.Element;
  validations?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}
