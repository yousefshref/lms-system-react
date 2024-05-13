import React, { useContext, useEffect } from "react";
import AdminDefault from "../../../components/Layouts/AdminDefault";
import { ApiContextProvider } from "../../../context/ApiContext";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const apiContext = useContext(ApiContextProvider);

  const params = useParams();

  const student = apiContext?.student;

  useEffect(() => {
    if (params.studentId) apiContext?.getStudent(params.studentId);
  }, [params.studentId]);

  const answers = apiContext?.formAnswers;

  useEffect(() => {
    if (typeof student !== "undefined")
      apiContext?.getFormAnswers({ student_id: student?.user });
  }, [student]);

  return (
    <AdminDefault>
      <div className="header flex flex-col gap-4">
        <div className="flex gap-5">
          <span className="my-auto">
            <img
              className="w-72 rounded-xl"
              src="https://tse4.mm.bing.net/th/id/OIG2.MIT4SgA5xMr77XCXFGf_?pid=ImgGn"
            />
          </span>
          <div className="flex flex-col text-zinc-600 my-auto">
            <h1 className="text-3xl font-sans text-black">
              {student?.full_name}
            </h1>
            <p>{student?.level_details?.name}</p>
            <p className="font-sans">{student?.birthday}</p>
          </div>
        </div>
      </div>

      <br />
      <hr className="w-full py-[0.5px] bg-indigo-600" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <b>الارقام</b>
          <div className="flex flex-row gap-2">
            <p>رقم هاتف الطالب: </p>
            <p className="font-sans text-indigo-900">{student?.phone_number}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>رقم هاتف الاب: </p>
            <p className="font-sans text-indigo-900">{student?.father_phone}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>رقم هاتف الام: </p>
            <p className="font-sans text-indigo-900">{student?.mother_phone}</p>
          </div>
        </div>
      </div>

      <hr className="w-full py-[0.5px] bg-indigo-600" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <b>معلومات اخري</b>
          <div className="flex flex-row gap-2">
            <p>العنوان: </p>
            <p className="font-sans text-indigo-900">{student?.address}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>النوع: </p>
            <p className="font-sans text-indigo-900">{student?.gender}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>الرقم القومي: </p>
            <p className="font-sans text-indigo-900">
              {student?.national_id_number}
            </p>
          </div>
          {/* additional informations */}
          {answers?.length > 0 &&
            answers?.map((answer) => {
              return answer?.answers_details?.map((answer) => (
                <div className="flex flex-row gap-2">
                  <p>{answer?.field_details?.name}: </p>
                  <p className="font-sans text-indigo-900">{answer?.answer}</p>
                </div>
              ));
            })}
        </div>
      </div>
    </AdminDefault>
  );
};

export default StudentDetails;
