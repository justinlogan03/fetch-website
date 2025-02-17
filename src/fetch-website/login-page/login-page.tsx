import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { PrimaryButton, SecondaryButton } from "../common-components/buttons";
import { TextField } from "@mui/material";

export const LoginPage = () => {
  return (
    <div className="grid p-20 gap-y-12 bg-blue-100 w-128 rounded">
      <div className="flex mx-auto text-2xl ">
        <PetsIcon fontSize="large" />
        <h1 className="font-bold ml-2 my-auto">Login</h1>
      </div>
      <TextField
        required
        id="username"
        label="Username"
        defaultValue="Hello World"
        variant="filled"
        color="primary"
      />
      <TextField
        required
        id="password"
        label="Password"
        defaultValue="Hello World"
        variant="filled"
        color="primary"
      />
      <div className="flex gap-x-4 mx-auto">
        <PrimaryButton label={"Submit"} onClick={() => {}} />
        <SecondaryButton label={"Reset"} onClick={() => {}} />
      </div>
    </div>
  );
};
