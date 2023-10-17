import { ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: (arg: any) => void;
  disabled?: boolean;
};
