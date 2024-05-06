import React, { useContext } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ApiContextProvider } from "../context/ApiContext";
import CreateOrUpdateFormField from "./CreateOrUpdateFormField";

const Field = ({ field }) => {
  const apiContext = useContext(ApiContextProvider);

  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <div className="flex xs:flex-row flex-col justify-between gap-5 p-3 rounded-xl bg-white">
      <p className="min-w-1/3 w-full max-w-1/3 my-auto">{field?.name}</p>
      <p className="min-w-1/3 w-full max-w-1/3 my-auto">
        {field?.is_required ? "مطلوب" : "غير مطلوب"}
      </p>
      <p className="min-w-1/3 w-full max-w-1/3 my-auto">{field?.type}</p>
      <div className="min-w-fit flex gap-3">
        <span
          onClick={() => setOpenEdit(true)}
          className="bg-indigo-400 h-fit w-fit text-white p-2 rounded-full cursor-pointer transition-all hover:bg-opacity-70"
        >
          <BiEdit />
        </span>
        <CreateOrUpdateFormField
          open={openEdit}
          setOpen={setOpenEdit}
          field={field}
        />

        <span
          onClick={() => {
            apiContext?.deleteFormField(field?.id).then(() => {
              apiContext?.getFormFields({ id: field?.form });
            });
          }}
          className="bg-red-400 h-fit w-fit text-white p-2 rounded-full cursor-pointer transition-all hover:bg-opacity-70"
        >
          <BiTrash />
        </span>
      </div>
    </div>
  );
};

export default Field;
