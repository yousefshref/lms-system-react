import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../../../context/ApiContext";
import CreateOrUpdateStudent from "../../../components/Student/CreateOrUpdateStudent";

const StudentsList = () => {
  const apiContext = useContext(ApiContextProvider);

  const students = apiContext?.students;

  useEffect(() => {
    apiContext?.getStudents();
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-x-scroll">
      <table className="w-full text-xs">
        <thead className="bg-white">
          <tr>
            <th className="p-2">الاسم كامل</th>
            <th className="p-2">رقم الهاتف</th>
            <th className="p-2">المستوي الدراسي</th>
            <th className="p-2">الجنس</th>
            <th className="p-2">رقم الاب</th>
            <th className="p-2">رقم الام</th>
            <th className="p-2">تاريخ الميلاد</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {students?.map((student, index) => {
            return (
              <tr
                className="bg-indigo-100 hover:bg-indigo-300 transition-all cursor-pointer"
                key={index}
                onClick={() => setOpen(student)}
              >
                <td className="p-2">{student?.full_name}</td>
                <td className="p-2">{student?.phone_number}</td>
                <td className="p-2">{student?.level_details?.name}</td>
                <td className="p-2">{student?.gender}</td>
                <td className="p-2">{student?.father_phone}</td>
                <td className="p-2">{student?.mother_phone}</td>
                <td className="p-2">{student?.birthday}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <CreateOrUpdateStudent open={open} setOpen={setOpen} student={open} />
    </div>
  );
};

export default StudentsList;
