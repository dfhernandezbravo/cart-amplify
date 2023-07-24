import { AppError, ResponseError } from "@entities/error/error.entity";

const handleHttpError = (error: ResponseError): AppError => {
  switch (error.statusCode) {
    case 400:
      return {
        error: "HttpException",
        message: "Error al agregar producto",
      };

    default:
      return {
        error: "InternalServerError",
        message: "Error al agregar producto",
      };
  }
};

export default handleHttpError;
