import { Modal } from "antd";
import React, { useContext } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import { types } from "../utlits/Variable";

const CreateOrUpdateFormField = ({ open, setOpen, field, formData }) => {
  const apiContext = useContext(ApiContextProvider);

  const [form, setForm] = React.useState(field?.form || formData?.id || "");
  const [name, setName] = React.useState(field?.name || "");
  const [type, setType] = React.useState(field?.type || "");
  const [isRequired, setIsRequired] = React.useState(
    field?.is_required || false
  );

  const updateFormField = () => {
    apiContext
      ?.updateFormField({
        data: { name, type, is_required: isRequired, form },
        id: field?.id,
        setOpen: setOpen,
      })
      .then(() => {
        apiContext?.getFormFields({
          id: form,
        });
      });
  };

  const createFormField = () => {
    apiContext
      ?.createFormField({
        data: { form, name, type, is_required: isRequired },
        setOpen: setOpen,
      })
      .then(() => {
        apiContext?.getFormFields({
          id: form,
        });
      });
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        if (field?.id) {
          updateFormField();
        } else {
          createFormField();
        }
      }}
      centered
      closeIcon={false}
    >
      <div className="flex flex-col gap-3 p-3 rounded-xl bg-zinc-300">
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>اسم الحقل</p>
          <input
            className="w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>نوع الحقل</p>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value={""}>اختر</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>مطلوب</p>
          <select
            value={isRequired}
            onChange={(e) => setIsRequired(e.target.value)}
          >
            <option value={true}>نعم</option>
            <option value={false}>لا</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateFormField;
