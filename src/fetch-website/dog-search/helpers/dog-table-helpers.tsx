import { HeadCell, Order } from "../../types";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const getHeadCells = () => {
  const headCells: readonly HeadCell[] = [
    {
      id: "img",
      numeric: false,
      disablePadding: true,
      label: "Photo",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "breed",
      numeric: false,
      disablePadding: false,
      label: "Breed",
    },
    {
      id: "age",
      numeric: false,
      disablePadding: false,
      label: "Age",
    },
    {
      id: "zip_code",
      numeric: false,
      disablePadding: false,
      label: "Zip Code",
    },
  ];
  return headCells;
};
