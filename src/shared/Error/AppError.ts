export class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}