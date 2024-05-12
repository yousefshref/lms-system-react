import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import { useParams } from "react-router-dom";
import FormFieldAnswer from "../components/Form/FormFieldAnswer";

const FormAnswer = () => {
  const apiContext = useContext(ApiContextProvider);

  const params = useParams();

  const form = apiContext?.form;

  useEffect(() => {
    apiContext.getForm({
      form_id: params.formId,
    });
  }, []);

  const user = apiContext?.user;

  useEffect(() => {
    apiContext.getUser();
  }, []);

  const [answersData, setAnswersData] = useState([]);

  useEffect(() => {
    if (
      form?.form_fields &&
      form?.form_fields?.length !== answersData?.length
    ) {
      form?.form_fields?.map((field) => {
        setAnswersData((prev) => [
          ...prev,
          {
            user: user?.id || "",
            form: field?.form,
            field: field?.id,
            is_required: field?.is_required,
            answer: "",
          },
        ]);
      });
    }
  }, [form?.form_fields]);

  const createFormAnswerParent = async () => {
    apiContext
      ?.createFormAnswerParent({
        data: {
          user: answersData[0].user || "",
          form: answersData[0].form,
        },
      })
      .then((e) => {
        answersData?.map((answer) => {
          apiContext?.createFormAnswer({
            data: {
              parent: e?.id,
              field: answer?.field,
              answer: answer?.answer,
            },
          });
        });
      });
    apiContext?.navigate(-1);
    // console.log(answersData);
  };

  return (
    <div className="md:p-8 p-2 h-[100vh] overflow-y-scroll">
      <div className="shadow-xl shadow-indigo-200 bg-white p-3 rounded-2xl flex flex-col justify-center">
        <div className="flex flex-col w-full max-w-2xl mx-auto">
          <div className="flex flex-col">
            <h3 className="text-xl">
              املئ استمارة <span className="font-bold">{form?.name}</span>
            </h3>
            <small className="text-zinc-500 text-xs">{form?.description}</small>
          </div>
          {user?.student_detail?.id && (
            <>
              <hr className="my-2" />
              <div className="flex flex-col text-sm">
                <div className="flex flex-row gap-3 bg-white  rounded-xl">
                  <p>الاسم</p>
                  <b>{user?.student_detail?.full_name}</b>
                </div>
                <div className="flex flex-row gap-3 bg-white  rounded-xl">
                  <p>رقم الهاتف</p>
                  <b>{user?.student_detail?.phone_number}</b>
                </div>
                <div className="flex flex-row gap-3 bg-white  rounded-xl">
                  <p>المستوي الدراسي</p>
                  <b>{user?.student_detail?.level_details?.name}</b>
                </div>
                <div className="flex flex-row gap-3 bg-white  rounded-xl">
                  <p>الجنس</p>
                  <b>{user?.student_detail?.gender}</b>
                </div>
              </div>
            </>
          )}
          <hr className="my-2" />
          <div className="flex flex-col gap-4 min-h-fit max-h-[400px] md:p-3 p-1 rounded-xl bg-zinc-200 overflow-y-scroll">
            {form?.form_fields?.map((field, index) => (
              <FormFieldAnswer
                key={field?.id}
                field={field}
                index={index}
                answersData={answersData}
                setAnswersData={setAnswersData}
              />
            ))}
          </div>
          <button onClick={createFormAnswerParent} className="btn-green mt-2">
            ارسال الاجابة
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAnswer;
