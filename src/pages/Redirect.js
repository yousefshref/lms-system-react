import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import ChooseProfile from "../components/ChooseProfile";
import LoadingScreen from "../components/LoadingScreen";

const Redirect = () => {
  const apiContext = useContext(ApiContextProvider);
  const loading = apiContext?.profileLoading;

  useEffect(() => {
    apiContext?.getSchool().then((e) => {
      if (e?.id) {
        apiContext?.navigate(
          `/school/${e?.user_details?.username}/${e?.user_details?.id}/profile/`
        );
      } else {
        if (localStorage.getItem("phone")) {
          apiContext?.getStudent({ phone: localStorage.getItem("phone") });
        } else {
          apiContext?.navigate("/auth/with-phone/");
        }
      }
    });
  }, []);

  if (loading) return <LoadingScreen />;
};

export default Redirect;
