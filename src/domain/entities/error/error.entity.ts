export type ErrorType = 'http' | 'payload';
export type StatusError = 'error' | 'warning';

export type AppError = {
  errorType: ErrorType;
  status: StatusError;
  title?: string;
  content?: string;
  ean?: string;
};

export type ResponseError = {
  error: string;
  errorCode: string;
  message: string;
  statusCode: number;
};

export enum CartAction {
  ADD = 'agregar',
  UPDATE = 'actualizar',
  DELETE = 'eliminar',
}
