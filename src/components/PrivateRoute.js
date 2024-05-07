import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ApiContextProvider } from "../context/ApiContext";

const PrivateRoute = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  useEffect(() => {
    apiContext.getSchool().then((e) => {
      if (e?.id) {
      } else {
        apiContext?.navigate("/auth/with-phone/");
      }
    });
  }, []);

  return children;
};

export default PrivateRoute;
