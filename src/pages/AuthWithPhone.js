import React, { useContext } from "react";
import { ApiContextProvider } from "../context/ApiContext";

const AuthWithPhone = () => {
  const apiContext = useContext(ApiContextProvider);

  const [phone, setPhone] = React.useState("");

  const getStudent = () => {
    apiContext?.getStudent({ phone }).then((res) => {
      if (res?.id) {
        apiContext?.navigate(
          `/student/${res?.name?.replace(" ", "-")}/${res?.id}/profile/`
        );
        localStorage.setItem("phone", phone);
      } else {
        alert("لا يوجد طالب بهذا الرقم");
      }
    });
  };

  return (
    <div className="w-full p-3 flex flex-col text-center h-[100vh] justify-center items-center">
      <div className="flex w-full max-w-[400px] flex-col gap-3 my-auto p-3 rounded-xl bg-white shadow-md">
        <p>سجل برقم هاتفك</p>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="رقم الهاتف"
        />
        <button onClick={getStudent} className="btn-primary">
          تسجيل
        </button>
      </div>
    </div>
  );
};

export default AuthWithPhone;
