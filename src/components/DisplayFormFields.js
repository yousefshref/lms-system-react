import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import Loading from "./Loading";
import Field from "./Field";
import CreateOrUpdateFormField from "./CreateOrUpdateFormField";

const DisplayFormFields = ({ form, open, setOpen }) => {
  const apiContext = useContext(ApiContextProvider);

  const fields = apiContext?.formFields;
  const loading = apiContext?.formFieldsLoading;

  useEffect(() => {
    apiContext?.getFormFields({
      id: form?.id,
    });
  }, [open]);

  const [openCreate, setCreate] = React.useState(false);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      centered
      closeIcon={false}
      className="font"
      footer={null}
    >
      <div className="flex flex-col gap-3 p-3 rounded-xl bg-zinc-300">
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : fields?.length > 0 ? (
          fields?.map((f) => <Field key={f?.id} field={f} />)
        ) : (
          <p>لا يوجد حقول</p>
        )}
        <button
          onClick={() => setCreate(true)}
          className="w-full bg-green-400 bg-opacity-80 transition-all hover:bg-opacity-60 cursor-pointer p-2 rounded-xl"
        >
          اضافة حقل جديد
        </button>

        <CreateOrUpdateFormField
          open={openCreate}
          setOpen={setCreate}
          formData={form}
        />
      </div>
    </Modal>
  );
};

export default DisplayFormFields;
