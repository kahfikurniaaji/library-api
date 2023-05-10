class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "Client Error";
    this.code = statusCode;
  }
}

export default ClientError;
