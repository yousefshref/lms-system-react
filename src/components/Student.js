import React, { useContext } from "react";
import { server } from "../utlits/Variable";
import { ApiContextProvider } from "../context/ApiContext";
import CreateOrUpdateStudent from "./CreateOrUpdateStudent";
import { Popconfirm } from "antd";

const Student = ({ student }) => {
  const apiContext = useContext(ApiContextProvider);

  const [openUpdateStudent, setOpenUpdateStudent] = React.useState(false);

  return (
    <>
      <tr
        onClick={() => setOpenUpdateStudent(true)}
        className="my-3 bg-white transition-all hover:bg-indigo-50 cursor-pointer"
      >
        <td className="p-2 text-xs">{student?.name}</td>
        <td className="p-2 text-xs">{student?.phone}</td>
        <td className="p-2 text-xs">{student?.email}</td>
        <td className="p-2 text-xs">{student?.birth_date}</td>
        <td className="p-2 text-xs">{student?.levels_details[0]?.name}</td>
        <td className="p-2 text-xs">{student?.parent_phone}</td>
        <td className="p-2 text-xs">{student?.is_online ? "نعم" : "لا"}</td>
        <td className="p-2 text-xs">
          {new Date(student?.created_at).toISOString().substring(0, 10)}
        </td>
      </tr>
      <CreateOrUpdateStudent
        open={openUpdateStudent}
        setOpen={setOpenUpdateStudent}
        student={student}
      />
    </>
  );
};

export default Student;
