import React, { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { PrimaryButton, SecondaryButton } from "../common-components/buttons";
import { TextField } from "@mui/material";

export const LoginPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <div className="grid py-20 px-28 gap-y-12 bg-blue-100 w-128 rounded">
      <div className="flex mx-auto text-2xl ">
        <PetsIcon fontSize="large" />
        <h1 className="font-bold ml-2 my-auto">Login</h1>
      </div>
      <TextField
        required
        id="username"
        label="Name"
        defaultValue=""
        variant="filled"
        color="primary"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          setName(target.value);
        }}
        value={name}
      />
      <TextField
        required
        id="password"
        label="Email"
        defaultValue=""
        variant="filled"
        color="primary"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          setEmail(target.value);
        }}
        value={email}
      />
      <div className="flex gap-x-4 mx-auto">
        <PrimaryButton label={"Submit"} onClick={() => {}} />
        <SecondaryButton
          label={"Reset"}
          onClick={() => {
            setName("");
            setEmail("");
          }}
        />
      </div>
    </div>
  );
};
