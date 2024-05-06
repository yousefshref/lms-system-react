import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import CreateOrUpdateFormField from "./CreateOrUpdateFormField";

const CreateOrUpdateForm = ({ open, setOpen, form }) => {
  const apiContext = useContext(ApiContextProvider);

  const [openCreateFields, setCreateFields] = React.useState(false);

  const formTypes = apiContext?.formTypes;
  useEffect(() => {
    apiContext?.getFormTypes();
  }, []);

  const [name, setName] = React.useState(form?.name || "");
  const [description, setDescription] = React.useState(form?.description || "");
  const [formType, setFormType] = React.useState(form?.form_type || "");

  const updateForm = () => {
    apiContext
      ?.updateForm({
        data: { name, description, form_type: formType },
        id: form?.id,
        setOpen: setOpen,
      })
      .then(() => {
        apiContext?.getForms();
      });
  };

  const createForm = async () => {
    await apiContext
      ?.createForm({
        data: { name, description, form_type: formType },
        setOpen: setOpen,
      })
      .then((res) => {
        if (res?.id) {
          setName("");
          setDescription("");
          setFormType("");
        }
      });
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        if (form?.id) {
          updateForm();
        } else {
          createForm();
        }
      }}
      centered
      closeIcon={false}
    >
      {/* fields */}
      <CreateOrUpdateFormField
        open={openCreateFields}
        setOpen={setCreateFields}
        formData={form}
      />

      <div className="flex flex-col gap-3 p-3 rounded-xl bg-zinc-300">
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>اسم الاستطلاع</p>
          <input
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>وصف الاستطلاع</p>
          <textarea
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>نوع الاستطلاع</p>
          <select
            className="w-full"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
          >
            <option value="">اختر نوع الاستطلاع</option>
            {formTypes?.map((formType) => (
              <option key={formType?.id} value={formType?.id}>
                {formType?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateForm;
