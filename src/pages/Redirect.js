import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import ChooseProfile from "../components/ChooseProfile";
import LoadingScreen from "../components/LoadingScreen";

const Redirect = () => {
  const apiContext = useContext(ApiContextProvider);

  const profile = apiContext?.profile;
  const loading = apiContext?.profileLoading;

  const profileCreation = apiContext?.createProfileSuccess;
  useEffect(() => {
    apiContext?.checkUser({});
  }, [profileCreation]);

  if (profile?.error && !loading) {
    apiContext?.navigate(`/check-profile/`);
  }

  if (profile?.school && !loading) {
    apiContext?.navigate(
      `/school/${profile?.school?.user_details?.username}/${profile?.school?.user_details?.id}/profile/`
    );
  }
};

export default Redirect;
