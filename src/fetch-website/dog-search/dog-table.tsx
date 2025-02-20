import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { DogsObject } from "./apis/get-dogs";
import { Order } from "../types";
import { getComparator } from "./helpers/dog-table-helpers";
import { EnhancedTableToolbar } from "./dog-table-components.tsx/enhanced-table-toolbar";
import { EnhancedTableHead } from "./dog-table-components.tsx/enhanced-table-header";
import { ImageCell } from "./dog-table-components.tsx/image-cell";

import { DogSearchResults } from "./apis/get-dogs-search";
import { searchDogs } from "./helpers/search-dogs";

type DogTableProps = {
  rows: DogsObject[];
  dogIdsObject: DogSearchResults;
  setDogIdsObject: React.Dispatch<React.SetStateAction<DogSearchResults>>;
  setCurrentDogsResults: React.Dispatch<React.SetStateAction<DogsObject[]>>;
};

export default function DogTable({
  rows,
  dogIdsObject,
  setDogIdsObject,
  setCurrentDogsResults,
}: DogTableProps) {
  const rowsPerPage = 25;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DogsObject>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof DogsObject
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = async (_event: unknown, newPage: number) => {
    // page down
    if (page > newPage) {
      const pageDownRes = await searchDogs([], dogIdsObject.prev);
      setDogIdsObject(pageDownRes.dogIds);
      setCurrentDogsResults(pageDownRes.dogsObject);
    } else if (page < newPage) {
      const pageUpRes = await searchDogs([], dogIdsObject.next);
      setDogIdsObject(pageUpRes.dogIds);
      setCurrentDogsResults(pageUpRes.dogsObject);
    }
    setPage(newPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dogIdsObject.total) : 0;

  return (
    <Box sx={{ width: "66.66%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dogIdsObject.total}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <ImageCell alt={row.name} imgUrl={row.img} />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.breed}</TableCell>
                    <TableCell align="left">{row.age}</TableCell>
                    <TableCell align="left">{row.zip_code}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={dogIdsObject.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
