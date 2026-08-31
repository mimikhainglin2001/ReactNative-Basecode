export type Result<T> =
  | {
      success: true;
      data: T;
      error?: undefined;
    }
  | {
      success: false;
      data?: undefined;
      error: string;
    };

export const Result = {
  ok<T>(data: T): Result<T> {
    return {
      success: true,
      data,
    };
  },

  fail<T>(error: string): Result<T> {
    return {
      success: false,
      error,
    };
  },
};

// Instead of returning:

// return user;

// we return

// return Result.ok(user);

// Instead of throwing:

// throw new Error("Invalid password");

// we return

// return Result.fail("Invalid password");
