import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";

const ApplicationSearchModal = ({ open, setOpen }) => {
  const apiContext = useContext(ApiContextProvider);

  const [formId, setFormId] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const forms = apiContext?.forms;
  useEffect(() => {
    apiContext?.getForms({});
  }, []);

  return (
    <Modal
      title="بحث عن ردود الاستطلاعات"
      open={open}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      centered
      className="font"
      onOk={() =>
        apiContext?.getFormApplications({
          form: formId,
          phone,
        })
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-zinc-700">الاستطلاع</p>
            <select value={formId} onChange={(e) => setFormId(e.target.value)}>
              <option value={""}>اختر</option>
              {forms?.map((form) => (
                <option key={form.id} value={form.id}>
                  {form.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-zinc-700">رقم هاتف الطالب/ هاتف ولي الامر</p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="رقم الهاتف"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationSearchModal;
