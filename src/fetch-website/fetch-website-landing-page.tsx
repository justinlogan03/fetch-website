import React from "react";
import { LoginPage } from "./login-page/login-page";

export const FetchWebsiteLandingPage = () => {
  return (
    <div className=" bg-slate-500 my-auto" style={{ height: "100vh" }}>
      <div className="p-64 my-auto">
        <LoginPage />
      </div>
    </div>
  );
};
