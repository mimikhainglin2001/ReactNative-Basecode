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

// Instead of returning:

// return user;

// we return

// return Result.ok(user);

// Instead of throwing:

// throw new Error("Invalid password");

// we return

// return Result.fail("Invalid password");
