import React, { createContext, useState } from "react";

const GlobalContext = createContext();
const GlobalContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const getToken = () => {
    setToken(localStorage.getItem("token"));
  };

  return (
    <GlobalContext.Provider
      value={{
        getToken,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalContext, GlobalContextProvider };
