import { Dropdown } from "antd";
import React, { useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ApiContextProvider } from "../../context/ApiContext";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const AdminDefault = ({ children, width }) => {
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

  const othersList = [
    {
      key: "1",
      label: <p className="font">المستويات الدراسية</p>,
      onClick: () => {
        apiContext.navigate("/admin/levels/");
      },
    },
    {
      key: "2",
      label: <p className="font">الاستمارات</p>,
      onClick: () => {
        apiContext.navigate("/admin/forms/");
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
          <Dropdown menu={{ items: othersList }} placement="bottomLeft">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transform hover:scale-[102%] transition duration-300 ease-in-out flex gap-1">
              <span className="my-auto text-lg">
                <BiDotsHorizontalRounded />
              </span>
              <p className="my-auto">اخري</p>
            </button>
          </Dropdown>
        </div>
      </header>
      <div
        className={
          width
            ? "flex flex-col gap-5 w-full mx-auto"
            : "flex flex-col gap-5 w-full max-w-3xl mx-auto"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AdminDefault;
