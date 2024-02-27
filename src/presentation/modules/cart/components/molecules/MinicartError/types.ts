import { ErrorType, StatusError } from '@entities/error/error.entity';

export type MinicartErrorProps = {
  title?: string;
  content?: string;
  type: ErrorType;
  status: StatusError;
};
