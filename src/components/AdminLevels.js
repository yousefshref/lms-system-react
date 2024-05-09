import React, { useContext, useEffect, useState } from "react";
import AdminDefault from "./Layouts/AdminDefault";
import { ApiContextProvider } from "../context/ApiContext";
import CreateOrUpdateLevel from "./Level/CreateOrUpdateLevel";
import Level from "./Level/Level";

const AdminLevels = () => {
  const apiContext = useContext(ApiContextProvider);

  const levels = apiContext?.levels;

  useEffect(() => {
    apiContext?.getLevels();
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <AdminDefault>
      <div>
        <button onClick={() => setOpen(true)} className="btn-green">
          انشاء مستوي دراسي
        </button>
        <CreateOrUpdateLevel open={open} setOpen={setOpen} />
      </div>
      <div className="flex mt-5 flex-col gap-5">
        {levels?.length > 0 ? (
          levels?.map((level) => <Level key={level?.id} level={level} />)
        ) : (
          <p>لا يوجد مستويات</p>
        )}
      </div>
    </AdminDefault>
  );
};

export default AdminLevels;
