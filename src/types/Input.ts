


export interface InputOption {
  id: string;
  inputId: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  color?: string;
  cols?: number | null;
  className?: string;
  disabled?: boolean;
  options?: string[];
  onChange?: (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => void; // for Select
}