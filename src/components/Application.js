import React from "react";

const Application = ({ application }) => {
  const data = application?.form_data;
  return (
    <div className="flex flex-col gap-1 p-2 rounded-xl bg-white min-h-fit max-h-[400px]">
      <div className="flex justify-between">
        <p className="text-zinc-500">{"الاستطلاع"}</p>
        <p>{application?.form_details?.name}</p>
      </div>
      {Object.entries(data)
        .filter(([key]) => key === "اسم الطالب")
        .map(([key, value]) => (
          <div className="flex justify-between">
            <p className="text-zinc-500">{key}</p>
            <p>{value}</p>
          </div>
        ))}
    </div>
  );
};

export default Application;
