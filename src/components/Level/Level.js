import React, { useContext, useState } from "react";
import { ApiContextProvider } from "../../context/ApiContext";
import CreateOrUpdateLevel from "./CreateOrUpdateLevel";
import { Popconfirm } from "antd";

const Level = ({ level }) => {
  const apiContext = useContext(ApiContextProvider);

  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-row gap-5 p-3 justify-between from-indigo-300 to-blue-300 bg-gradient-to-tr rounded-full">
      <b className="my-auto">{level.name}</b>
      <div className="my-auto flex flex-row gap-5">
        <button className="btn-indigo" onClick={() => setOpen(true)}>
          تعديل
        </button>
        <Popconfirm
          title="هل تريد حذف هذا المستوي؟"
          onConfirm={() => {
            apiContext?.deleteLevel(level?.id);
          }}
        >
          <button className="btn-red">حذف</button>
        </Popconfirm>
      </div>

      <CreateOrUpdateLevel open={open} setOpen={setOpen} level={level} />
    </div>
  );
};

export default Level;
