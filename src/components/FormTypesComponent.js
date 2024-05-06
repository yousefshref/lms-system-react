import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import Loading from "./Loading";
import { IoCreate } from "react-icons/io5";
import Type from "./Type";
import CreateOrUpdateFormType from "./CreateOrUpdateFormType";

const FormTypesComponent = () => {
  const apiContext = useContext(ApiContextProvider);

  useEffect(() => {
    apiContext?.getFormTypes();
  }, []);

  const types = apiContext?.formTypes;
  const loading = apiContext?.formTypesLoading;

  const [createOpen, setCreateOpen] = React.useState(false);

  return (
    <div className="p-3 rounded-xl bg-white shadow-md h-fit flex flex-col gap-3 md:w-1/2">
      <div className="flex gap-2 justify-between">
        <p className="my-auto">انواع الاستطلاعات</p>
        <span
          onClick={() => setCreateOpen(true)}
          className="my-auto text-green-600 text-2xl cursor-pointer transition-all hover:text-green-400"
        >
          <IoCreate />
        </span>

        <CreateOrUpdateFormType open={createOpen} setOpen={setCreateOpen} />
      </div>
      <hr />
      <div className="flex flex-col gap-3 p-2 rounded-xl bg-zinc-300 overflow-y-scroll min-h-fit max-h-[400px]">
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : types?.length > 0 ? (
          types?.map((type) => <Type type={type} key={type.id} />)
        ) : (
          <p>لا يوجد انواع استطلاعات حتي الان</p>
        )}
      </div>
    </div>
  );
};

export default FormTypesComponent;
