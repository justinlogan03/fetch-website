import React, { Dispatch, SetStateAction, useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { PrimaryButton, SecondaryButton } from "../common-components/buttons";

import { postAuthLogin } from "./apis/post-auth-login";
import { PrimaryField } from "../common-components/primary-field";
import { PrimaryHeader } from "../common-components/primary-header";

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
    <div>
      <PrimaryHeader icon={<PetsIcon fontSize="large" />} label="Login" />
      <div className="grid py-20 px-28 gap-y-12 bg-white w-128 rounded-b">
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
    </div>
  );
};
