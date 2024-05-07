import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";

const MainPage = () => {
  const apiContext = useContext(ApiContextProvider);

  const school = apiContext?.school;

  useEffect(() => {
    apiContext?.getSchool();
  }, []);

  return (
    <div className="p-3">
      <p>الصفحة الرئيسية, سيكون فيها معلومات عن الموقع</p>
      {!localStorage.getItem("token") && (
        <button
          onClick={() => apiContext?.navigate(`/auth/log-in/`)}
          className="btn-secondary"
        >
          هل تريد تسجيل الدخول
        </button>
      )}
      <button
        onClick={() =>
          apiContext?.navigate(
            `/school/${school?.user_details?.username}/${school?.user_details?.id}/profile`
          )
        }
        className="btn-primary"
      >
        الصفحة الشخصية
      </button>
    </div>
  );
};

export default MainPage;
