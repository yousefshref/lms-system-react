import React, { useContext, useEffect } from "react";
import { CgMore, CgProfile, CgWebsite } from "react-icons/cg";
import { ApiContextProvider } from "../../context/ApiContext";
import { ImProfile } from "react-icons/im";
import { BsPersonAdd, BsPostcard } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";
import { Button, Dropdown } from "antd";
import { useParams } from "react-router-dom";
import { GiPapers } from "react-icons/gi";
import { server } from "../../utlits/Variable";

const DefaultLayout = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  const school = apiContext?.school;
  useEffect(() => {
    apiContext?.getSchool();
  }, []);

  const params = useParams();

  const accountsItems = [
    {
      key: "1",
      label: <p>صفحتك الشخصية</p>,
      onClick: () => {
        apiContext?.navigate(
          `/school/${params?.schoolName}/${params?.schoolId}/profile/`
        );
      },
    },
    {
      key: "2",
      label: <p>حسابات الطلاب</p>,
      onClick: () => {
        apiContext?.navigate(
          `/school/${params?.schoolName}/${params?.schoolId}/students/`
        );
      },
    },
  ];

  const formsOthers = [
    {
      key: "1",
      label: <p>المنشورات</p>,
      onClick: () => {
        apiContext?.navigate(
          `/school/${params?.schoolName}/${params?.schoolId}/posts/`
        );
      },
    },
    {
      key: "2",
      label: <p>الاستطلاعات</p>,
      onClick: () => {
        apiContext?.navigate(
          `/school/${params?.schoolName}/${params?.schoolId}/forms/`
        );
      },
    },
    {
      key: "2",
      label: <p>الموقع الالكتروني</p>,
      onClick: () => {
        apiContext?.navigate(
          `/school/${params?.schoolName}/${params?.schoolId}/`
        );
      },
    },
  ];

  return (
    <div className="p-4 flex flex-col gap-8">
      {apiContext?.setApiMessage}
      <header className="flex gap-3 shadow-md justify-between p-3 rounded-xl bg-indigo-400 bg-opacity-50">
        <div className="flex gap-4 my-auto">
          <Dropdown
            menu={{
              items: accountsItems,
            }}
            placement="bottomLeft"
            arrow
          >
            <div className="text-sm px-4 min-w-fit flex gap-3 p-2 rounded-xl bg-white cursor-pointer">
              <span className="my-auto text-xl">
                <BsPersonAdd />
              </span>
              <p className="my-auto">الحسابات</p>
            </div>
          </Dropdown>

          <Dropdown
            menu={{
              items: formsOthers,
            }}
            placement="bottomLeft"
            arrow
          >
            <div className="text-sm px-4 min-w-fit flex gap-3 p-2 rounded-xl bg-white cursor-pointer">
              <span className="my-auto text-xl">
                <CgMore />
              </span>
              <p className="my-auto">اخري</p>
            </div>
          </Dropdown>
        </div>
        {server + school?.profile_image ? (
          <span className="text-4xl cursor-pointer my-auto">
            <img
              src={server + school?.profile_image}
              alt={school?.name}
              className="rounded-full w-10 h-10"
            />
          </span>
        ) : null}
      </header>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
