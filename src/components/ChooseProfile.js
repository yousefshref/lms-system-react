import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import LoadingScreen from "./LoadingScreen";

const ChooseProfile = () => {
  const apiContext = useContext(ApiContextProvider);

  const profile = apiContext?.profile;
  const loading = apiContext?.profileLoading;

  useEffect(() => {
    apiContext?.checkUser();
  }, [apiContext?.createProfileSuccess]);

  const createProfile = ({ type, data }) => {
    apiContext?.createProfile({
      type: type,
      data: data,
      navigate: true,
    });
  };

  useEffect(() => {
    if (profile?.error && !loading) {
      apiContext?.navigate(`/check-profile/`);
    }

    if (profile?.school && !loading) {
      apiContext?.navigate(
        `/school/${profile?.school?.user_details?.username}/${profile?.school?.user_details?.id}/profile/`
      );
    }
  }, [profile, loading]);

  return (
    <div className="flex flex-col gap-5 h-[100vh] p-4 text-center justify-center">
      <h1 className="text-4xl">اختار نوع حسابك</h1>
      <div className="flex flex-col md:flex-row gap-3 w-full md:max-w-5xl mx-auto">
        <div
          onClick={() =>
            createProfile({
              type: "school",
              data: {
                user: localStorage.getItem("id"),
              },
            })
          }
          className="p-3 rounded-xl bg-indigo-200 cursor-pointer hover:bg-blue-200 transition-all flex flex-col md:w-1/3 text-center"
        >
          <p>مدرسة</p>
        </div>

        <div className="p-3 rounded-xl bg-indigo-200 cursor-pointer hover:bg-blue-200 transition-all flex flex-col md:w-1/3 text-center">
          <p>معلم</p>
        </div>
        <div className="p-3 rounded-xl bg-indigo-200 cursor-pointer hover:bg-blue-200 transition-all flex flex-col md:w-1/3 text-center">
          <p>طالب</p>
        </div>
      </div>
    </div>
  );
};

export default ChooseProfile;
