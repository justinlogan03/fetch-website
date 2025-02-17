import { TextField } from "@mui/material";

import React, { Dispatch, SetStateAction } from "react";

type Props = {
  label: string;
  setString: Dispatch<SetStateAction<string>>;
  hasError: boolean;
  value: string;
};

export const PrimaryField = ({ label, setString, hasError, value }: Props) => {
  return (
    <TextField
      required
      id={`${label}-id`}
      label={label}
      defaultValue=""
      variant="filled"
      color="primary"
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        setString(target.value);
      }}
      value={value}
      error={hasError}
    />
  );
};
