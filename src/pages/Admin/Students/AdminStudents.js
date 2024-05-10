import React, { useContext, useState } from "react";
import AdminDefault from "../../../components/Layouts/AdminDefault";
import StudentSearch from "../../../components/Search/StudentSearch";
import StudentsList from "./StudentsList";
import CreateOrUpdateStudent from "../../../components/Student/CreateOrUpdateStudent";
import { Modal } from "antd";
import { ApiContextProvider } from "../../../context/ApiContext";
import Loading from "../../../components/Loading";

const AdminStudents = () => {
  const apiContext = useContext(ApiContextProvider);

  const [openCreate, setOpenCreate] = useState(false);
  const [open, setOpen] = useState(false);

  const [excelFile, setExcelFile] = useState(null);

  const storeStudentsWithExcel = () => {
    const formData = new FormData();

    formData.append("file", excelFile);

    apiContext?.storeStudentsWithExcel({ data: formData }).then((e) => {
      apiContext?.getStudents();
      setExcelFile(null);
      setOpen(false);
    });
  };
  return (
    <AdminDefault>
      <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
        <StudentSearch />

        <div className="flex flex-row gap-5">
          <div className="createStudent w-1/2 flex flex-col gap-5">
            <button onClick={() => setOpenCreate(true)} className="btn-green">
              اضافة طالب جديد
            </button>
            <CreateOrUpdateStudent open={openCreate} setOpen={setOpenCreate} />
          </div>
          <div className="createStudent w-1/2 flex flex-col gap-5">
            <button onClick={() => setOpen(true)} className="btn-blue">
              اضافة طلاب من اكسل
            </button>
          </div>
          <Modal
            centered
            open={open}
            onCancel={() => setOpen(false)}
            onOk={storeStudentsWithExcel}
            closeIcon={false}
            className="font"
          >
            {apiContext?.studentsLoading && <Loading />}
            <div className="flex flex-col gap-2">
              <p>اضف ملف اكسل فيه الطلاب</p>
              <input
                onChange={(e) => setExcelFile(e.target.files[0])}
                type="file"
              />
            </div>
          </Modal>
        </div>

        <StudentsList />
      </div>
    </AdminDefault>
  );
};

export default AdminStudents;
