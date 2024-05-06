import React, { useContext } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ApiContextProvider } from "../context/ApiContext";
import CreateOrUpdateFormType from "./CreateOrUpdateFormType";

const Type = ({ type }) => {
  const apiContext = useContext(ApiContextProvider);

  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <div className="p-3 rounded-xl justify-between bg-white flex gap-3">
      <p className="my-auto">{type.name}</p>
      <div className="my-auto flex gap-4">
        <span
          onClick={() => setOpenEdit(true)}
          className="p-2 rounded-full h-fit w-fit cursor-pointer bg-blue-500 transition-all hover:bg-opacity-75 bg-opacity-45"
        >
          <BiEdit />
        </span>
        <CreateOrUpdateFormType
          open={openEdit}
          setOpen={setOpenEdit}
          type={type}
        />

        <span
          onClick={() => {
            apiContext?.deleteFormType(type.id).then(() => {
              apiContext?.getFormTypes();
            });
          }}
          className="p-2 rounded-full h-fit w-fit cursor-pointer bg-red-500 transition-all hover:bg-opacity-75 bg-opacity-45"
        >
          <BiTrash />
        </span>
      </div>
    </div>
  );
};

export default Type;
