import { AppError, MessagesError } from "@entities/error/error.entity";

const handlePayloadError = (error: MessagesError): AppError => {
  switch (error.status) {
    case "error":
      return {
        error: "Error",
        message: "Error al agregar producto",
      };

    default:
      return {
        error: "InternalServerError",
        message: "Error al agregar producto",
      };
  }
};

export default handlePayloadError;
