import React, { useContext, useEffect } from "react";
import { CgProfile, CgWebsite } from "react-icons/cg";
import { ApiContextProvider } from "../../context/ApiContext";
import { ImProfile } from "react-icons/im";
import { BsPostcard } from "react-icons/bs";

const DefaultLayout = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  const profile = apiContext?.profile;
  useEffect(() => {
    apiContext?.checkUser({});
  }, []);
  return (
    <div className="p-4 flex flex-col gap-8">
      {apiContext?.setApiMessage}
      <header className="flex gap-3 shadow-md justify-between p-3 rounded-xl bg-indigo-400 bg-opacity-50">
        <div className="flex gap-4 my-auto">
          <div
            onClick={() =>
              apiContext?.navigate(
                `/school/${profile?.school?.user_details?.username}/${profile?.school?.user_details?.id}/profile/`
              )
            }
            className="text-sm flex gap-2 underline underline-offset-4 cursor-pointer"
          >
            <span className="my-auto">
              <ImProfile />
            </span>
            <p>الصفحة الشخصية</p>
          </div>
          <div
            onClick={() =>
              apiContext?.navigate(
                `/school/${profile?.school?.user_details?.username}/${profile?.school?.user_details?.id}/`
              )
            }
            className="text-sm flex gap-2 underline underline-offset-4 cursor-pointer"
          >
            <span className="my-auto">
              <CgWebsite />
            </span>
            <p>الموقع الالكتروني</p>
          </div>
          <div
            onClick={() =>
              apiContext?.navigate(
                `/school/${profile?.school?.user_details?.username}/${profile?.school?.user_details?.id}/posts/`
              )
            }
            className="text-sm flex gap-2 underline underline-offset-4 cursor-pointer"
          >
            <span className="my-auto">
              <BsPostcard />
            </span>
            <p>المنشورات</p>
          </div>
        </div>
        <span className="text-4xl cursor-pointer my-auto">
          <CgProfile />
        </span>
      </header>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
