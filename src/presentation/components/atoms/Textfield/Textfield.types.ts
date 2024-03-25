import { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';

export interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  dataId?: string;
}
