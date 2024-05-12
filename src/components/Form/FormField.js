import React, { useContext, useState } from "react";
import { types } from "../../utlits/Variable";
import { ApiContextProvider } from "../../context/ApiContext";

const FormField = ({ field, formFields, setFormFields, index }) => {
  const apiContext = useContext(ApiContextProvider);

  const [name, setName] = useState(formFields[index]?.name);
  const [type, setType] = useState(formFields[index]?.type);
  const [isRequired, setIsRequired] = useState(formFields[index]?.is_required);

  const deleteField = () => {
    if (field?.id) {
      apiContext.deleteFormField({ field_id: field?.id });
    } else {
      formFields.splice(index, 1);
      setFormFields([...formFields]);
    }
  };

  return (
    <div className="p-3 from-white to-indigo-50 bg-gradient-to-tr rounded-xl shadow-md">
      <div className="flex flex-col justify-between">
        <p>اسم الحقل</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
            formFields[index].name = e.target.value;
          }}
          value={name}
        />
      </div>
      <div className="flex mt-2 flex-col justify-between">
        <p>نوع الحقل</p>
        <select
          onChange={(e) => {
            setType(e.target.value);
            formFields[index].type = e.target.value;
          }}
          value={type}
        >
          {types?.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex mt-2 flex-row gap-3">
        <input
          type="checkbox"
          onChange={(e) => {
            setIsRequired(e.target.checked);
            formFields[index].is_required = e.target.checked;
          }}
          checked={isRequired}
          className="w-fit h-fit my-auto bg-none text-black"
        />
        <p>هل مطلوب</p>
      </div>

      <button className="btn-red mt-4" onClick={deleteField}>
        حذف
      </button>
    </div>
  );
};

export default FormField;
