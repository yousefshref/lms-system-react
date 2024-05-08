import { Modal } from "antd";
import React from "react";

const DisplayApplication = ({ open, setOpen, application }) => {
  const form_data = application?.form_data;
  const form_details = application?.form_details;

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      centered
      footer={null}
      closeIcon={false}
      className="font"
    >
      <div className="flex flex-col min-h-fit overflow-y-scroll max-h-[600px] p-3">
        <div>
          <p>{form_details?.name}</p>
          <small className="text-zinc-500 text-xs">
            {form_details?.description}
          </small>
        </div>
        <hr className="my-3" />
        <div className="flex flex-col gap-3">
          {Object.entries(form_data)
            ?.filter(
              ([key]) =>
                key !== "name" && key !== "phone" && key !== "parent_phone"
            )
            .map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <p className="text-zinc-500">{key}</p>
                <p>{value}</p>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default DisplayApplication;
