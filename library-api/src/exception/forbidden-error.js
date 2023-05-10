import ClientError from "./client-error.js";

class ForbiddenError extends ClientError {
  constructor(message) {
    super(message, 403);
    this.name = "Forbidden Error";
  }
}

export default ForbiddenError;
