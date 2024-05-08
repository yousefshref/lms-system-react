import React, { useContext } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ApiContextProvider } from "../context/ApiContext";
import CreateOrUpdateForm from "./CreateOrUpdateForm";
import { MdTextFields } from "react-icons/md";
import DisplayFormFields from "./DisplayFormFields";
import { BsEye } from "react-icons/bs";

const Form = ({ form }) => {
  const apiContext = useContext(ApiContextProvider);

  const [openEdit, setOpenEdit] = React.useState(false);

  const deleteForm = () => {
    apiContext?.deleteForm(form?.id).then(() => {
      apiContext?.getForms({});
    });
  };

  const [openFields, setOpenFields] = React.useState(false);

  return (
    <div className="p-3 rounded-xl bg-white shadow-md h-fit flex flex-col xs:flex-row justify-between gap-3">
      <div className="xs:min-w-1/3 xs:w-1/3 xs:max-w-1/3 my-auto">
        <p>{form?.name}</p>
      </div>
      {form?.description?.length > 0 && (
        <div className="xs:min-w-1/3 xs:w-1/3 xs:max-w-1/3 my-auto">
          <small className="text-xs">
            {form?.description?.length > 40
              ? form?.description?.slice(0, 40) + "..."
              : form?.description}
          </small>
        </div>
      )}
      <div className="xs:min-w-1/3 xs:w-1/3 xs:max-w-1/3 my-auto">
        <p>{form?.form_type_details?.name}</p>
      </div>
      <div className="xs:w-fit my-auto flex flex-row w-full gap-3 justify-between xs:justify-normal">
        <span
          onClick={deleteForm}
          className="bg-red-400 h-fit w-fit text-white p-2 rounded-full cursor-pointer transition-all hover:bg-opacity-70"
        >
          <BiTrash />
        </span>

        <span
          onClick={() => setOpenEdit(true)}
          className="bg-blue-400 h-fit w-fit text-white p-2 rounded-full cursor-pointer transition-all hover:bg-opacity-70"
        >
          <BiEdit />
        </span>
        <CreateOrUpdateForm open={openEdit} setOpen={setOpenEdit} form={form} />

        <span
          onClick={() => setOpenFields(true)}
          className="bg-indigo-400 h-fit w-fit text-white p-2 rounded-full cursor-pointer transition-all hover:bg-opacity-70"
        >
          <MdTextFields />
        </span>
        <DisplayFormFields
          open={openFields}
          setOpen={setOpenFields}
          form={form}
        />

        <span
          onClick={() => {
            apiContext?.navigate(`/form/${form?.id}/`);
          }}
          className="bg-yellow-500 h-fit w-fit text-white p-2 rounded-full cursor-pointer transition-all hover:bg-opacity-70"
        >
          <BsEye />
        </span>
      </div>
    </div>
  );
};

export default Form;
