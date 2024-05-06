import React from "react";

const FormApplications = () => {
  return (
    <div className="p-3 rounded-xl bg-white shadow-md h-fit flex flex-col gap-3 md:w-1/2">
      <div className="flex gap-2 justify-between">
        <p>جميع الردود علي الاستطلاعات</p>
        <small>
          رد حوالي <span className="text-red-700">11.3k</span> شخص
        </small>
      </div>
      <hr />
      <div className="flex flex-col gap-1 p-2 rounded-xl bg-zinc-200 overflow-y-scroll min-h-fit max-h-[400px]">
        <p>one</p>
        <p>two</p>
        <p>three</p>
      </div>
    </div>
  );
};

export default FormApplications;
