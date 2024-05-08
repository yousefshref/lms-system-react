import React, { useContext, useEffect } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { ApiContextProvider } from "../../context/ApiContext";
import Loading from "../../components/Loading";
import Student from "../../components/Student";
import CreateOrUpdateStudent from "../../components/CreateOrUpdateStudent";

const SchoolStudents = () => {
  const apiContext = useContext(ApiContextProvider);

  const students = apiContext?.students;
  const loading = apiContext?.studentLoading;

  useEffect(() => {
    apiContext?.getStudents();
  }, []);

  const [openCreateStudent, setOpenCreateStudent] = React.useState(false);

  return (
    <DefaultLayout>
      {apiContext?.setApiMessage}
      <div className="w-full max-w-2xl shadow-md mx-auto flex flex-col gap-12 p-3 rounded-xl bg-white">
        <div className="SEARCH flex flex-col gap-1">
          <p className="text-xs">
            بحث بالاسم/رقم الهاتف/ هاتف ولي الامر/ البريد الالكتروني
          </p>
          <input placeholder="اكتب بعناية" />
        </div>
      </div>

      <div className="w-full max-w-sm">
        <button
          onClick={() => setOpenCreateStudent(true)}
          className="bg-green-500 transition-all hover:bg-opacity-75 text-white p-2 text-xs rounded-lg w-full"
        >
          اضافة طالب
        </button>

        <CreateOrUpdateStudent
          open={openCreateStudent}
          setOpen={setOpenCreateStudent}
        />
      </div>

      <table>
        <thead className="bg-white rounded-xl">
          <tr className="text-xs">
            <th className="text-start p-2">الأسم</th>
            <th className="text-start p-2">رقم الهاتف</th>
            <th className="text-start p-2">البريد الالكرتوني</th>
            <th className="text-start p-2">تاريخ الميلاد</th>
            <th className="text-start p-2">المستوي الدراسي</th>
            <th className="text-start p-2">رقم هاتف ولي الامر</th>
            <th className="text-start p-2">التقديم عبر الانترنت</th>
            <th className="text-start p-2">تم الانشاء في</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : students?.length > 0 ? (
            students?.map((student, index) => (
              <Student student={student} key={index} />
            ))
          ) : (
            <p>لا يوجد بيانات اي طالب</p>
          )}
        </tbody>
      </table>

      {/* <div className="top flex gap-5 bg-white overflow-x-scroll text-xs p-2 justify-between w-full max-w-full">
        <div
          style={{ width: "130px", minWidth: "130px" }}
          className="my-auto flex flex-col gap-2"
        >
          <p>معلومات الطالب</p>
        </div>
        <div
          style={{ width: "130px", minWidth: "130px" }}
          className="min-w-1/3 w-1/3 my-auto"
        >
          <p>رقم هاتف ولي الامر</p>
        </div>
        <div
          style={{ width: "130px", minWidth: "130px" }}
          className="w-[130px] min-w-[130px] my-auto"
        >
          <p>صورة الطالب</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : students?.length > 0 ? (
          students?.map((student, index) => (
            <Student student={student} key={index} />
          ))
        ) : (
          <p>لا يوجد بيانات اي طالب</p>
        )}
      </div> */}
    </DefaultLayout>
  );
};

export default SchoolStudents;
