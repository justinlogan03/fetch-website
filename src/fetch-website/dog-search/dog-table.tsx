import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { DogsObject } from "./apis/get-dogs";
import { Order } from "../types";
import { EnhancedTableToolbar } from "./dog-table-components.tsx/enhanced-table-toolbar";
import { EnhancedTableHead } from "./dog-table-components.tsx/enhanced-table-header";
import { ImageCell } from "./dog-table-components.tsx/image-cell";

import { DogSearchResults } from "./apis/get-dogs-search";
import { searchDogs } from "./helpers/search-dogs";
import { HeartCell } from "./dog-table-components.tsx/heart-cell";

type DogTableProps = {
  rows: DogsObject[];
  dogIdsObject: DogSearchResults;
  setDogIdsObject: React.Dispatch<React.SetStateAction<DogSearchResults>>;
  favoritedDogs: DogsObject[];
  setFavoritedDogs: React.Dispatch<React.SetStateAction<DogsObject[]>>;
  setCurrentDogsResults: React.Dispatch<React.SetStateAction<DogsObject[]>>;
  isLoading: boolean;
};

export const DogTable = ({
  rows,
  dogIdsObject,
  setDogIdsObject,
  favoritedDogs,
  setFavoritedDogs,
  setCurrentDogsResults,
  isLoading, //TODO - add loading state
}: DogTableProps) => {
  const rowsPerPage = 25;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DogsObject>("name");
  const [page, setPage] = React.useState(0);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof DogsObject
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
        <EnhancedTableToolbar />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow tabIndex={-1} key={row.id}>
                    <TableCell padding="checkbox">
                      <HeartCell
                        currentDog={row}
                        favoritedDogs={favoritedDogs}
                        setFavoritedDogs={setFavoritedDogs}
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
};
