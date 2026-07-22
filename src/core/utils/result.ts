export class Result<T> {
  constructor(
    public success: boolean,
    public data?: T,
    public error?: string,
  ) {}

  static ok<T>(data: T) {
    return new Result<T>(true, data);
  }

  static fail<T>(error: string) {
    return new Result<T>(false, undefined, error);
  }
}
