export type ErrorResponse<T> =
  | { isError: true; error: unknown }
  | { isError: false; value: T };
