export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    name: string = "HttpError"
  ) {
    super(message);
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}
