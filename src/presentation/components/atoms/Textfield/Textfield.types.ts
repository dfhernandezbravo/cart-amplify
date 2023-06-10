import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
