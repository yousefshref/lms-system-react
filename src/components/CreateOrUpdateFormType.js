import React, { useContext } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import { Modal } from "antd";

const CreateOrUpdateFormType = ({ open, setOpen, type }) => {
  const apiContext = useContext(ApiContextProvider);

  const [name, setName] = React.useState(type?.name || "");

  const updateFormType = () => {
    apiContext?.updateFormType({ data: { name }, id: type?.id }).then(() => {
      apiContext?.getFormTypes();
      setOpen(false);
    });
  };

  const createFormType = () => {
    apiContext?.createFormType({ data: { name } }).then(() => {
      apiContext?.getFormTypes();
      setOpen(false);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        if (type?.id) {
          updateFormType();
        } else {
          createFormType();
        }
      }}
      centered
    >
      <div className="p-3 rounded-xl bg-white shadow-md h-fit flex flex-col gap-2">
        <p>اسم النوع</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-xl border outline-none transition-all hover:border-indigo-600 focus:border-indigo-400"
        />
      </div>
    </Modal>
  );
};

export default CreateOrUpdateFormType;
