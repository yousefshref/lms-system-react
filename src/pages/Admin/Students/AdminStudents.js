import React, { useState } from "react";
import AdminDefault from "../../../components/Layouts/AdminDefault";
import StudentSearch from "../../../components/Search/StudentSearch";
import StudentsList from "./StudentsList";
import CreateOrUpdateStudent from "../../../components/Student/CreateOrUpdateStudent";

const AdminStudents = () => {
  const [openCreate, setOpenCreate] = useState(false);
  return (
    <AdminDefault>
      <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
        <StudentSearch />

        <div className="createStudent flex flex-col gap-5">
          <button onClick={() => setOpenCreate(true)} className="btn-green">
            اضافة طالب جديد
          </button>
          <CreateOrUpdateStudent open={openCreate} setOpen={setOpenCreate} />
        </div>

        <StudentsList />
      </div>
    </AdminDefault>
  );
};

export default AdminStudents;
