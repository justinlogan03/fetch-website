import { DogsObject } from "./dog-search/apis/get-dogs";

export type ErrorResponse<T> =
  | { isError: true; error: unknown }
  | { isError: false; value: T };

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof DogsObject;
  label: string;
  numeric: boolean;
}
