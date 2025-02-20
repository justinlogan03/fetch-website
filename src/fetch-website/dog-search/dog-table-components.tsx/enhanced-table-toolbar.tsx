import { Toolbar, Typography } from "@mui/material";
import * as React from "react";

export const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Dogs
      </Typography>
    </Toolbar>
  );
};
