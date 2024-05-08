import React from "react";
import DisplayApplication from "./DisplayApplication";

const Application = ({ application }) => {
  const data = application?.form_data;

  const [openApplication, setOpenApplication] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setOpenApplication(true)}
        className="flex transition-all hover:bg-indigo-300 hover:bg-opacity-40 cursor-pointer flex-col gap-1 p-2 rounded-xl bg-white min-h-fit max-h-[400px]"
      >
        <div className="flex justify-between">
          <p className="text-zinc-500">{"الاستطلاع"}</p>
          <p>{application?.form_details?.name}</p>
        </div>
        {Object.entries(data)
          .filter(([key]) => key === "اسم الطالب")
          .map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <p className="text-zinc-500">{key}</p>
              <p>{value}</p>
            </div>
          ))}
      </div>
      <DisplayApplication
        open={openApplication}
        setOpen={setOpenApplication}
        application={application}
      />
    </>
  );
};

export default Application;
