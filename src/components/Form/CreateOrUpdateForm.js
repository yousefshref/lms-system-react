import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../../context/ApiContext";
import Loading from "../Loading";
import FormField from "./FormField";

const CreateOrUpdateForm = ({ open, setOpen, form }) => {
  const apiContext = useContext(ApiContextProvider);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [levelsData, setLevelsData] = useState([]);
  const [isStudentInfos, setIsStudentInfos] = useState(false);

  const [formFields, setFormFields] = useState([]);

  const levels = apiContext?.levels;

  useEffect(() => {
    apiContext.getLevels();
  }, []);

  useEffect(() => {
    if (form) {
      setName(form?.name);
      setDescription(form?.description);
      setLevelsData(form?.levels);
      setFormFields(form?.form_fields);
    }
  }, [form]);

  const updateForm = () => {
    apiContext
      .updateForm({
        form_id: form?.id,
        data: {
          name: name,
          description: description,
          levels: levelsData,
          is_student_information: isStudentInfos,
          form_fields: formFields,
        },
      })
      .then((res) => {
        if (res?.id) {
          setOpen(false);
          apiContext.getForms();
          setName("");
          setDescription("");
          setDescription([]);

          const updateFields = formFields?.filter((e) => e?.id);
          const createFields = formFields?.filter((e) => !e?.id);

          if (updateFields?.length > 0) {
            updateFields?.map((field) => {
              apiContext.updateFormField({
                field_id: field?.id,
                data: {
                  name: field?.name,
                  type: field?.type,
                  is_required: field?.is_required,
                },
              });
            });
          }

          if (createFields?.length > 0) {
            createFields?.map((field) => {
              apiContext.createFormField({
                data: {
                  form: form?.id,
                  name: field?.name,
                  type: field?.type,
                  is_required: field?.is_required,
                },
              });
            });
          }
        }
      });
  };

  const createForm = () => {
    apiContext
      .createForm({
        form_id: form?.id,
        data: {
          name: name,
          description: description,
          levels: levelsData,
          is_student_information: isStudentInfos,
          form_fields: formFields,
        },
      })
      .then((res) => {
        if (res?.id) {
          setOpen(false);
          apiContext.getForms();
          setName("");
          setDescription("");
          setDescription([]);

          const updateFields = formFields?.filter((e) => e?.id);
          const createFields = formFields?.filter((e) => !e?.id);

          if (updateFields?.length > 0) {
            updateFields?.map((field) => {
              apiContext.updateFormField({
                field_id: field?.id,
                data: {
                  name: field?.name,
                  type: field?.type,
                  is_required: field?.is_required,
                },
              });
            });
          }

          if (createFields?.length > 0) {
            createFields?.map((field) => {
              apiContext.createFormField({
                data: {
                  form: res?.id,
                  name: field?.name,
                  type: field?.type,
                  is_required: field?.is_required,
                },
              });
            });
          }
        }
      });
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        if (form?.id) {
          updateForm();
        } else {
          createForm();
        }
      }}
      closeIcon={false}
      className="font"
    >
      {apiContext?.formsLoading && <Loading />}
      <div className="flex flex-col gap-6 min-h-fit max-h-[400px] overflow-y-scroll">
        <div className="p-3 from-white to-indigo-50 bg-gradient-to-tr rounded-xl shadow-md">
          <p>اسم الاستمارة</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="p-3 mt-3 from-white to-indigo-50 bg-gradient-to-tr rounded-xl shadow-md">
          <p>وصف بسيط</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="p-3 from-white to-indigo-50 bg-gradient-to-tr rounded-xl shadow-md flex gap-1">
          <input
            type="checkbox"
            className="w-fit h-fit my-auto"
            checked={isStudentInfos}
            onChange={() => setIsStudentInfos(!isStudentInfos)}
          />
          <label className="my-auto">هل هل معلومات اضافية للطلاب ؟</label>
        </div>
        <div className="p-3 from-white to-indigo-50 bg-gradient-to-tr rounded-xl shadow-md">
          <p>لأي طلاب هذا الاستمارة ؟</p>
          <div className="flex gap-5 flex-wrap p-3 rounded-xl from-zinc-100 to-indigo-100 bg-gradient-to-tr">
            {levels?.map((level, index) => (
              <div className="flex gap-1" key={index}>
                <input
                  type="checkbox"
                  className="w-fit h-fit my-auto"
                  checked={levelsData?.includes(level?.id)}
                  onChange={() => {
                    if (levelsData?.includes(level?.id)) {
                      setLevelsData(levelsData?.filter((e) => e !== level?.id));
                    } else {
                      setLevelsData([...levelsData, level?.id]);
                    }
                  }}
                />
                <label className="my-auto">{level?.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 mt-3 from-white to-indigo-50 bg-gradient-to-tr rounded-xl shadow-md">
          <p>الحقول</p>
          <div className="flex flex-col gap-3 bg-zinc-300 p-3 rounded-xl min-h-fit max-h-[300px] overflow-y-scroll">
            {formFields?.length > 0 ? (
              formFields?.map((field, index) => (
                <FormField
                  formFields={formFields}
                  setFormFields={setFormFields}
                  key={index}
                  index={index}
                  field={field}
                />
              ))
            ) : (
              <p>لا يوجد حقول</p>
            )}
            <button
              className="btn-green"
              onClick={() =>
                setFormFields([
                  ...formFields,
                  {
                    name: "",
                    type: "text",
                    is_required: false,
                  },
                ])
              }
            >
              اضافة حقل
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateForm;
