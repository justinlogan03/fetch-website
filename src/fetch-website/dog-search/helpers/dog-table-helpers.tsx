import { HeadCell } from "../../types";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getHeadCells = () => {
  const headCells: readonly HeadCell[] = [
    {
      id: "img",
      numeric: false,
      disablePadding: true,
      label: "Photo",
      sortable: false,
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
      sortable: true,
    },
    {
      id: "breed",
      numeric: false,
      disablePadding: false,
      label: "Breed",
      sortable: true,
    },
    {
      id: "age",
      numeric: false,
      disablePadding: false,
      label: "Age",
      sortable: true,
    },
    {
      id: "zip_code",
      numeric: false,
      disablePadding: false,
      label: "Zip Code",
      sortable: false,
    },
  ];
  return headCells;
};
