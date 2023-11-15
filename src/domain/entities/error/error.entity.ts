type HttpError = 'HttpException' | 'InternalServerError';
type PayloadError = 'Error';

export type AppError = {
  error: HttpError | PayloadError;
  message: string;
};

export type ResponseError = {
  error: string;
  errorCode: string;
  message: string;
  statusCode: number;
};

type Fields = {
  id: string;
};

export type MessagesError = {
  code: string;
  fields: Fields;
  status: string;
  text: string;
};

export enum CartAction {
  ADD = 'agregar',
  UPDATE = 'actualizar',
  DELETE = 'eliminar',
}
