import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../../context/ApiContext";
import { Modal } from "antd";

const Answer = ({ form }) => {
  const apiContext = useContext(ApiContextProvider);

  const [open, setOpen] = useState(false);

  const answers = apiContext?.formAnswers;

  useEffect(() => {
    if (open) apiContext.getFormAnswers({ form_id: form?.id });
  }, [form, open]);

  return (
    <>
      <tr
        className="hover:bg-indigo-100 transition-all cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <td className="px-4 py-2">{form?.name}</td>
        <td className="px-4 py-2">{form?.created_at}</td>
      </tr>
      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        centered
        closeIcon={false}
      >
        <div className="flex flex-col gap-3 min-fit max-h-[400px] overflow-y-scroll">
          {answers?.length > 0 ? (
            answers?.map((answer, index) => (
              <div
                key={index}
                className="flex w-full flex-row max-w-full overflow-x-scroll gap-8 p-3 rounded-xl bg-zinc-300"
              >
                <p className="w-full flex min-w-fit gap-1">
                  <span className="">{"المستخدم"}:</span>{" "}
                  <b className="">
                    {answer?.user_details?.username || "لا يوجد"}
                  </b>
                </p>
                {answer?.answers_details?.map((e) => (
                  <p key={e?.id} className="w-full flex min-w-fit gap-1">
                    <span className="">{e?.field_details?.name}:</span>{" "}
                    <b className="">{e?.answer || "لا يوجد"}</b>
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>لا يوجد ردود</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Answer;
