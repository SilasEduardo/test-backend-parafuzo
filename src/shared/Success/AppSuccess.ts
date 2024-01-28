export class AppSuccess<T> {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: T;

  constructor(data: T, message: string | number = 'Operação bem-sucedida', statusCode: number = 200) {
    this.data = data;

    if (typeof message === 'string') {
      this.message = message;
    } else {
      this.statusCode = message;
    }

    this.statusCode = statusCode;
  }
}
