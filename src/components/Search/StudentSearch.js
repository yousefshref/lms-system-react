import React from "react";

const StudentSearch = () => {
  return (
    <div className="search p-3 flex flex-col gap-2 w-full bg-white mx-auto shadow-md rounded-xl">
      <div className="flex flex-col gap-1">
        <p>رقم هاتف الطالب او ولي الامر او الرقم القومي</p>
        <input type="text" />
      </div>
      <div>
        <button className="btn-indigo">بحث</button>
      </div>
    </div>
  );
};

export default StudentSearch;
