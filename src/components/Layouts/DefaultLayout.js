import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { ApiContextProvider } from "../../context/ApiContext";

const DefaultLayout = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  return (
    <div className="p-4 flex flex-col gap-8">
      {apiContext?.setApiMessage}
      <header className="flex gap-3 shadow-md justify-between p-3 rounded-xl bg-indigo-400 bg-opacity-50">
        <div className="flex gap-4 my-auto">
          <p className="p-2 px-5 rounded-xl border bg-white">الصفحة الشخصية</p>
          <p className="p-2 px-5 rounded-xl border border-white">الدعم الفني</p>
          <p className="p-2 px-5 rounded-xl border border-white">الاعدادات</p>
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
