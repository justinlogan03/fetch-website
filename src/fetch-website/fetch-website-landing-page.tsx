import React, { useState } from "react";
import { LoginPage } from "./login-page/login-page";

export const FetchWebsiteLandingPage = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
  return (
    <div className=" bg-slate-500 my-auto" style={{ height: "100vh" }}>
      {isLoginSuccess ? (
        <div>success</div>
      ) : (
        <div className="p-64 my-auto">
          <LoginPage setIsLoginSuccess={setIsLoginSuccess} />
        </div>
      )}
    </div>
  );
};
