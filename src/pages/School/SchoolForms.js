import React, { useContext, useEffect } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import FormTypesComponent from "../../components/FormTypesComponent";
import FormApplications from "../../components/FormApplications";
import { IoCreate } from "react-icons/io5";
import { ApiContextProvider } from "../../context/ApiContext";
import Loading from "../../components/Loading";
import Form from "../../components/Form";
import CreateOrUpdateForm from "../../components/CreateOrUpdateForm";

const SchoolForms = () => {
  const apiContext = useContext(ApiContextProvider);

  const forms = apiContext?.forms;
  const loading = apiContext?.formsLoading;

  useEffect(() => {
    apiContext?.getForms({});
  }, []);

  const [createOpen, setCreateOpen] = React.useState(false);

  return (
    <DefaultLayout>
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex md:flex-row flex-col gap-5 justify-around p-3 rounded-xl">
          <FormTypesComponent />
          <FormApplications />
        </div>

        <div className="flex flex-col p-3 gap-3 rounded-xl bg-white shadow-md">
          <div className="flex gap-3 justify-between">
            <p className="my-auto">جميع الاستطلاعات</p>
            <span
              onClick={() => setCreateOpen(true)}
              className="my-auto text-zinc-700 hover:text-zinc-500 bg-blue-500 bg-opacity-40 transition-all hover:bg-opacity-35 cursor-pointer p-2 rounded-full"
            >
              <IoCreate />
            </span>
            <CreateOrUpdateForm open={createOpen} setOpen={setCreateOpen} />
          </div>
          <div className="flex flex-col gap-3 p-2 rounded-xl bg-zinc-200 overflow-y-scroll min-h-fit max-h-[700px]">
            {loading ? (
              <div className="flex justify-center">
                <Loading />
              </div>
            ) : forms?.length > 0 ? (
              forms?.map((form) => <Form key={form?.id} form={form} />)
            ) : (
              <p>لا يوجد استطلاعات</p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SchoolForms;
