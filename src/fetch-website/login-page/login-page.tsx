import React, { Dispatch, SetStateAction, useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { PrimaryButton, SecondaryButton } from "../common-components/buttons";

import { postAuthLogin } from "./apis/post-auth-login";
import { PrimaryField } from "../common-components/primary-field";

type Props = {
  setIsLoginSuccess: Dispatch<SetStateAction<boolean>>;
};

export const LoginPage = ({ setIsLoginSuccess }: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  const onSubmit = () => {
    if (!name || !email) {
      setIsLoginError(true);
    } else {
      postAuthLogin(name, email)
        .then((res) => {
          setIsLoginSuccess(res.isSuccess);
          setIsLoginError(!res.isSuccess);
        })
        .catch(() => {
          setIsLoginSuccess(false);
          setIsLoginError(true);
        });
    }
  };

  const onReset = () => {
    setName("");
    setEmail("");
    setIsLoginError(false);
  };

  return (
    <div className="grid py-20 px-28 gap-y-12 bg-blue-100 w-128 rounded">
      <div className="flex mx-auto text-2xl ">
        <PetsIcon fontSize="large" />
        <h1 className="font-bold ml-2 my-auto">Login</h1>
      </div>
      <PrimaryField
        label="Name"
        setString={setName}
        hasError={isLoginError}
        value={name}
      />
      <PrimaryField
        label="Email"
        setString={setEmail}
        hasError={isLoginError}
        value={email}
      />
      <div className="flex gap-x-4 mx-auto">
        <PrimaryButton label={"Submit"} onClick={onSubmit} />
        <SecondaryButton label={"Reset"} onClick={onReset} />
      </div>
    </div>
  );
};
