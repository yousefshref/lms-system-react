import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import LoadingScreen from "./LoadingScreen";
import { Modal } from "antd";

const ChooseProfile = () => {
  const apiContext = useContext(ApiContextProvider);

  const school = apiContext?.school;
  const loading = apiContext?.profileLoading;

  useEffect(() => {
    apiContext?.getSchool();
  }, [apiContext?.createProfileSuccess]);

  const createProfile = ({ type, data }) => {
    apiContext?.createProfile({
      type: type,
      data: data,
      nav: true,
    });
  };

  useEffect(() => {
    if (school && !loading) {
      apiContext?.navigate(
        `/school/${school?.user_details?.username}/${school?.user_details?.id}/profile/`
      );
    }
  }, [school, loading]);

  const [openAddStudent, setOpenAddStudent] = React.useState(false);
  const [studentPhone, setStudentPhone] = React.useState("");

  const getSchool = () => {
    apiContext?.getSchool();
  };

  return (
    <div className="flex flex-col gap-5 h-[100vh] p-4 text-center justify-center">
      <h1 className="text-4xl">اختار نوع حسابك</h1>
      <div className="flex flex-col md:flex-row gap-3 w-full md:max-w-5xl mx-auto">
        <div
          onClick={() =>
            createProfile({
              type: "school",
              data: {
                user: localStorage.getItem("id"),
              },
            })
          }
          className="p-3 rounded-xl bg-indigo-200 cursor-pointer hover:bg-blue-200 transition-all flex flex-col md:w-1/3 text-center"
        >
          <p>مدرسة</p>
        </div>

        <div className="p-3 rounded-xl bg-indigo-200 cursor-pointer hover:bg-blue-200 transition-all flex flex-col md:w-1/3 text-center">
          <p>معلم</p>
        </div>

        <div
          onClick={() => setOpenAddStudent(true)}
          className="p-3 rounded-xl bg-indigo-200 cursor-pointer hover:bg-blue-200 transition-all flex flex-col md:w-1/3 text-center"
        >
          <p>طالب</p>
        </div>

        <Modal
          open={openAddStudent}
          onOk={() => getSchool()}
          onCancel={() => setOpenAddStudent(false)}
          centered
        >
          <div className="flex flex-col gap-2">
            <p>رقم هاتف الطالب او ولي الامر</p>
            <input
              onChange={(e) => setStudentPhone(e.target.value)}
              value={studentPhone}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ChooseProfile;
