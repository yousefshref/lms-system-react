import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import Loading from "./Loading";
import FormField from "./FormField";

const FormDetails = () => {
  const apiContext = useContext(ApiContextProvider);

  const student = apiContext?.student;
  useEffect(() => {
    if (localStorage.getItem("phone")) {
      apiContext?.getStudent({
        phone: localStorage.getItem("phone"),
        noNav: true,
      });
    } else {
      if (!localStorage?.getItem("token"))
        apiContext?.navigate("/auth/with-phone/");
    }
  }, []);

  const url = window.location.href;
  const id = url.split("/")[4];

  const form = apiContext?.form;
  const loading = apiContext?.formsLoading;

  useEffect(() => {
    apiContext?.getForm({ id: id });
  }, []);

  const fields = apiContext?.formFields;
  const fieldsLoading = apiContext?.formFieldsLoading;

  useEffect(() => {
    apiContext?.getFormFields({ id: id });
  }, []);

  const [JsonData, setJsonData] = React.useState({});

  const [loadingSend, setLoadingSend] = React.useState(false);

  const sendForm = () => {
    JsonData["اسم الطالب"] = student?.name;
    JsonData["رقم الهاتف"] = student?.phone;
    JsonData["البريد الالكتروني"] = student?.email;
    JsonData["المستوي الدراسي"] = student?.levels_details?.name;
    JsonData["رقم هاتف ولي الامر"] = student?.parent_phone;

    const formData = new FormData();
    const data = JSON.stringify(JsonData);

    formData.append("form", form?.id);
    formData.append("form_data", data);

    apiContext.createFormApplicatipn({
      data: formData,
    });
  };

  return (
    <div className="p-5 rounded-xl bg-zinc-300 h-[100vh]">
      {apiContext?.setApiMessage}
      <div className="flex flex-col gap-5 justify-center p-3 rounded-xl bg-white h-full">
        {loading || apiContext?.formFieldsLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col gap-5 text-center w-full max-w-xl mx-auto">
            <div className="flex flex-col gap-3">
              <p className="text-3xl font-bold">استطلاع "{form?.name}"</p>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              {!localStorage.getItem("token") ? (
                <>
                  <p className="text-xl font-bold text-start">معلومات الطالب</p>
                  <div className="flex flex-row gap-3  text-start">
                    <b style={{ minWidth: "130px" }}>الاسم: </b>
                    <p>{student?.name}</p>
                  </div>
                  {typeof student?.phone !== "undefined" && (
                    <div className="flex flex-row gap-3  text-start">
                      <b style={{ minWidth: "130px" }}>رقم الهاتف: </b>
                      <p>{student?.phone}</p>
                    </div>
                  )}
                  {typeof student?.email !== "undefined" && (
                    <div className="flex flex-row gap-3  text-start">
                      <b style={{ minWidth: "130px" }}>الايميل: </b>
                      <p>{student?.email}</p>
                    </div>
                  )}
                  <div className="flex flex-row gap-3  text-start">
                    <b style={{ minWidth: "130px" }}>تاريخ الميلاد: </b>
                    <p>{student?.birth_date}</p>
                  </div>
                  {student?.levels_details?.id && (
                    <div className="flex flex-row gap-3  text-start">
                      <b style={{ minWidth: "130px" }}>المستوي الدراسي: </b>
                      <p>{student?.levels_details[0]?.name}</p>
                    </div>
                  )}
                  <div className="flex flex-row gap-3  text-start">
                    <b style={{ minWidth: "130px" }}>رقم هاتف ولي الامر: </b>
                    <p>{student?.parent_phone}</p>
                  </div>
                  <div className="flex flex-row gap-3  text-start">
                    <b style={{ minWidth: "130px" }}>العنوان: </b>
                    <p>{student?.address}</p>
                  </div>
                </>
              ) : null}
            </div>
            <hr />
            <div className="fields flex flex-col gap-3">
              {fieldsLoading ? (
                <div className="flex justify-center">
                  <Loading />
                </div>
              ) : fields?.length > 0 ? (
                fields?.map((field) => (
                  <FormField
                    setLoading={setLoadingSend}
                    data={JsonData}
                    field={field}
                    key={field?.id}
                  />
                ))
              ) : (
                <p>لا يوجد حقول</p>
              )}
              {loading || loadingSend ? (
                <button className="btn-primary">
                  <Loading />
                </button>
              ) : (
                <button onClick={sendForm} className="btn-primary">
                  ارسال
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDetails;
