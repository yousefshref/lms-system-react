import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import ChooseProfile from "../components/ChooseProfile";
import LoadingScreen from "../components/LoadingScreen";

const Redirect = () => {
  const apiContext = useContext(ApiContextProvider);

  const loading = apiContext?.profileLoading;

  const profileCreation = apiContext?.createProfileSuccess;

  useEffect(() => {
    apiContext?.getSchool().then((e) => {
      if (e?.id) {
        apiContext?.navigate(`/school/${e?.name}/${e?.id}/profile/`);
      }
    });
  }, [profileCreation]);

  useEffect(() => {
    apiContext
      ?.getStudent({ phone: localStorage.getItem("phone"), noNav: true })
      .then((e) => {
        if (e?.id) {
          apiContext?.navigate(`/student/${e?.name}/${e?.id}/profile/`);
        } else {
          if (!localStorage.getItem("token"))
            apiContext?.navigate(`/auth/with-phone/`);
        }
      });
  }, [profileCreation]);

  if (loading) return <LoadingScreen />;
};

export default Redirect;
