import React, { useContext, useEffect, useState } from "react";
import AdminDefault from "../../../components/Layouts/AdminDefault";
import { ApiContextProvider } from "../../../context/ApiContext";
import Form from "../../../components/Form/Form";
import Answer from "../../../components/Form/Answer";

const AdminForms = () => {
  const apiContext = useContext(ApiContextProvider);

  const forms = apiContext?.forms;
  useEffect(() => {
    apiContext.getForms();
  }, []);

  return (
    <AdminDefault>
      <div
        style={{ backgroundImage: `url(/images/Forms/forms_bg.png)` }}
        className="p-3 bg-opacity-30 rounded-xl flex flex-col gap-3 max-h-[300px] min-h-fit bg-cover"
      >
        <h3 className="text-xl">جميع الاستمارات</h3>
        <hr />
        <div className="flex rounded-xl flex-col gap-3 max-h-full overflow-y-scroll">
          {forms?.length > 0 ? (
            forms?.map((form, index) => <Form key={index} form={form} />)
          ) : (
            <p>لا يوجد استمارات</p>
          )}
        </div>
      </div>

      <div
        style={{ backgroundColor: `white` }}
        className="mt-5 p-3 bg-opacity-30 rounded-xl flex flex-col gap-3 shadow-md min-h-fit max-h-[500px] overflow-y-scroll"
      >
        <h3 className="text-xl">ردود الاستمارات</h3>
        <hr />
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">اسم الاستمارة</th>
              <th className="px-4 py-2">تاريخ الانشاء</th>
            </tr>
          </thead>
          <tbody>
            {forms?.length > 0 ? (
              forms?.map((form, index) => <Answer key={index} form={form} />)
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  لا يوجد استمارات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminDefault>
  );
};

export default AdminForms;
