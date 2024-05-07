import React, { useContext } from "react";
import { server } from "../utlits/Variable";
import { ApiContextProvider } from "../context/ApiContext";
import CreateOrUpdateStudent from "./CreateOrUpdateStudent";
import { Popconfirm } from "antd";

const Student = ({ student }) => {
  const apiContext = useContext(ApiContextProvider);

  const [openUpdateStudent, setOpenUpdateStudent] = React.useState(false);

  return (
    <div className="p-3 rounded-xl bg-white shadow-md">
      <div className="top flex gap-5 overflow-x-scroll p-1 justify-between w-full max-w-full">
        <div
          style={{ width: "130px", minWidth: "130px" }}
          className="my-auto flex flex-col gap-2 text-xs"
        >
          <p>{student?.name}</p>
          {student?.email && <p>{student?.email}</p>}
          {student?.phone && <p>{student?.phone}</p>}
          <p>{student?.levels_details[0]?.name}</p>
        </div>
        <div style={{ width: "130px", minWidth: "130px" }} className="my-auto">
          <p>{student?.parent_phone}</p>
        </div>
        {student?.profile_image && (
          <div
            style={{ width: "130px", minWidth: "130px" }}
            className="w-[100px] min-w-[100px] my-auto"
          >
            <img
              className="w-full rounded-xl"
              src={server + student?.profile_image}
            />
          </div>
        )}
      </div>

      <div className="actions flex gap-4 justify-around">
        <button
          onClick={() => setOpenUpdateStudent(true)}
          className="bg-sky-500 transition-all hover:bg-opacity-75 text-white p-2 text-xs rounded-lg w-[300px] max-w-[300px]"
        >
          تعديل
        </button>
        <CreateOrUpdateStudent
          open={openUpdateStudent}
          setOpen={setOpenUpdateStudent}
          student={student}
        />

        <Popconfirm
          title="هل تريد حذف هذا الطالب؟"
          onConfirm={() => {
            apiContext?.deleteStudent(student?.id);
          }}
        >
          <button className="bg-red-500 transition-all hover:bg-opacity-75 text-white p-2 text-xs rounded-lg w-[300px] max-w-[300px]">
            حذف
          </button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Student;
