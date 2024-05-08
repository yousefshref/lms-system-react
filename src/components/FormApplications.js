import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import Loading from "./Loading";
import Application from "./Application";
import { BiSearch } from "react-icons/bi";
import { Modal } from "antd";
import ApplicationSearchModal from "./ApplicationSearchModal";

const FormApplications = () => {
  const apiContext = useContext(ApiContextProvider);

  const applications = apiContext?.formApplications;
  const loading = apiContext?.formApplicationsLoading;

  useEffect(() => {
    apiContext?.getFormApplications({});
  }, []);

  const [openSearch, setOpenSearch] = React.useState(false);

  return (
    <div className="p-3 rounded-xl bg-white shadow-md h-fit flex flex-col gap-3 md:w-1/2">
      <div className="flex gap-2 justify-between">
        <p className="my-auto">جميع الردود علي الاستطلاعات</p>
        <span
          onClick={() => setOpenSearch(true)}
          className="my-auto text-zinc-700 hover:text-zinc-500 bg-blue-500 bg-opacity-40 transition-all hover:bg-opacity-35 cursor-pointer p-2 rounded-full"
        >
          <BiSearch />
        </span>
        <ApplicationSearchModal open={openSearch} setOpen={setOpenSearch} />
      </div>
      <hr />
      <div className="flex flex-col gap-1 p-2 rounded-xl bg-zinc-200 overflow-y-scroll min-h-fit max-h-[400px]">
        {loading ? (
          <Loading />
        ) : applications?.length > 0 ? (
          applications?.map((application) => (
            <Application key={application.id} application={application} />
          ))
        ) : (
          <p>لا يوجد ردود</p>
        )}
      </div>
    </div>
  );
};

export default FormApplications;
