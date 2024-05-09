import { Dropdown } from "antd";
import React, { useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ApiContextProvider } from "../../context/ApiContext";

const AdminDefault = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);
  const accountsList = [
    {
      key: "1",
      label: <p className="font">حسابات الطلاب</p>,
      onClick: () => {
        apiContext.navigate("/admin/students/");
      },
    },
  ];
  return (
    <div className="p-3 flex flex-col gap-5">
      <header className="w-full flex flex-row justify-between p-3 rounded-xl bg-white shadow-md">
        <div className="my-auto text-xl justify-center flex flex-row gap-5">
          <b>المدرسة</b>
        </div>
        <div className="my-auto justify-center flex flex-row gap-5">
          <Dropdown menu={{ items: accountsList }} placement="bottomLeft">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transform hover:scale-[102%] transition duration-300 ease-in-out flex gap-1">
              <span className="my-auto text-lg">
                <MdAccountCircle />
              </span>
              <p className="my-auto">الحسابات</p>
            </button>
          </Dropdown>
        </div>
      </header>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default AdminDefault;
