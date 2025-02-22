import * as React from "react";
import { postAuthLogout } from "../login-page/apis/post-auth-logout";

type LogoutButtonProps = {
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LogoutButton = ({ setIsLoginSuccess }: LogoutButtonProps) => {
  const onLogout = async () => {
    const authLogout = await postAuthLogout();
    if (authLogout.isSuccess) {
      setIsLoginSuccess(false);
    }
  };
  return (
    <button
      className="ml-auto mr-8 mt-2 hover:underline font-bold"
      onClick={onLogout}
    >
      Logout
    </button>
  );
};
