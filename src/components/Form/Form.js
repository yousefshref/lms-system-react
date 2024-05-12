import React, { useContext, useState } from "react";
import { ApiContextProvider } from "../../context/ApiContext";
import CreateOrUpdateForm from "./CreateOrUpdateForm";
import { Popconfirm } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

const Form = ({ form }) => {
  const apiContext = useContext(ApiContextProvider);

  const [open, setOpen] = useState(false);
  return (
    <div className="p-3 bg-indigo-400 bg-opacity-35 transition-all shadow-lg rounded-xl flex sm:flex-row flex-col justify-between">
      <div className="my-auto">
        <h3>{form?.name}</h3>
        <small className="text-zinc-500">{form?.description}</small>
      </div>
      <div className="flex flex-row gap-3 justify-center sm:w-fit w-full sm:mt-0 mt-4">
        <span
          onClick={() => setOpen(true)}
          className="my-auto transition-all cursor-pointer hover:bg-blue-300 bg-blue-400 rounded-full p-2"
        >
          <BiEdit />
        </span>
        <CreateOrUpdateForm open={open} setOpen={setOpen} form={form} />

        <Link
          className="my-auto transition-all cursor-pointer hover:bg-yellow-300 bg-yellow-400 rounded-full p-2"
          to={`/forms/${form?.name?.replace(/ /g, "-")}/${form?.id}/apply/`}
        >
          <BsEye />
        </Link>

        <Popconfirm
          title="هل تريد حذف الاستمارة"
          onConfirm={() => {
            apiContext.deleteForm({ form_id: form?.id });
          }}
        >
          <span className="my-auto transition-all cursor-pointer hover:bg-red-300 bg-red-400 rounded-full p-2">
            <BiTrash />
          </span>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Form;
