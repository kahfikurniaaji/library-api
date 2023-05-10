import ClientError from "./client-error.js";

class ConflictError extends ClientError {
  constructor(message) {
    super(message, 409);
    this.name = "Conflict Error";
  }
}

export default ConflictError;
