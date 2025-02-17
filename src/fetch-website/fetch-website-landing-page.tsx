import React, { useState } from "react";
import { LoginPage } from "./login-page/login-page";
import { DogSearch } from "./dog-search/dog-search";

export const FetchWebsiteLandingPage = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
  return (
    <div className=" bg-slate-500 my-auto" style={{ minHeight: "100vh" }}>
      {isLoginSuccess ? (
        <DogSearch />
      ) : (
        <div className="p-64 my-auto">
          <LoginPage setIsLoginSuccess={setIsLoginSuccess} />
        </div>
      )}
    </div>
  );
};
