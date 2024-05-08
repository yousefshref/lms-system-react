import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../context/ApiContext";
import LoadingScreen from "./LoadingScreen";
import { server } from "../utlits/Variable";

const CreateOrUpdateStudent = ({ open, setOpen, student, new_student }) => {
  const apiContext = useContext(ApiContextProvider);

  const allLevels = apiContext?.levels;

  useEffect(() => {
    apiContext?.getLevels();
  }, []);

  const [profile_image, setProfileImage] = React.useState(
    student?.profile_image || ""
  );
  const [name, setName] = React.useState(student?.name || "");
  const [phone, setPhone] = React.useState(student?.phone || "");
  const [email, setEmail] = React.useState(student?.email || "");
  const [birth_date, setBirthDate] = React.useState(student?.birth_date || "");
  const [levels, setLevels] = React.useState(student?.levels || []);
  const [parent_phone, setParentPhone] = React.useState(
    student?.parent_phone || ""
  );
  const [address, setAddress] = React.useState(student?.address || "");
  const [isOnline, setIsOnline] = React.useState(student?.is_online || "");

  useEffect(() => {
    if (student) {
      setProfileImage(student?.profile_image || "");
      setName(student?.name || "");
      setPhone(student?.phone || "");
      setEmail(student?.email || "");
      setBirthDate(student?.birth_date || "");
      setLevels(student?.levels || []);
      setParentPhone(student?.parent_phone || "");
      setAddress(student?.address || "");
      setIsOnline(student?.is_online || false);
    }
  }, [student]);

  const updateStudent = () => {
    const body = new FormData();

    if (typeof profile_image == "object" || profile_image == "")
      body.append("profile_image", profile_image);
    body.append("name", name);
    body.append("phone", phone);
    body.append("email", email);
    body.append("birth_date", birth_date);
    body.append("levels", levels);
    body.append("parent_phone", parent_phone);
    body.append("address", address);
    body.append("is_online", isOnline);

    apiContext?.updateStudent({
      id: student?.id,
      data: body,
      setOpen: setOpen,
    });
  };

  const createStudent = () => {
    const body = new FormData();

    body.append("profile_image", profile_image);
    body.append("name", name);
    body.append("phone", phone);
    body.append("email", email);
    body.append("birth_date", birth_date);
    body.append("levels", levels);
    body.append("parent_phone", parent_phone);
    body.append("address", address);
    body.append("is_online", isOnline);

    apiContext?.createStudent({
      data: body,
      setOpen: setOpen,
    });
  };

  return (
    <Modal
      closeIcon={false}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      onOk={() => {
        if (student?.id) {
          updateStudent();
        } else {
          createStudent();
        }
      }}
    >
      {apiContext?.studentLoading ? (
        <LoadingScreen />
      ) : (
        <div className="p-3 rounded-xl bg-zinc-500 bg-opacity-35 flex flex-col gap-4 min-h-fit max-h-[500px] overflow-y-scroll">
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>صورة للطالب</b>
            <input
              className="bg-white"
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            {profile_image && (
              <div className="flex flex-col gap-1 w-full max-w-[200px]">
                {profile_image && typeof profile_image == "object" && (
                  <img
                    className="rounded-xl"
                    src={URL.createObjectURL(profile_image)}
                    alt={name}
                  />
                )}
                {profile_image && typeof profile_image == "string" && (
                  <img
                    className="rounded-xl"
                    src={server + profile_image}
                    alt={name}
                  />
                )}
                <span
                  onClick={() => setProfileImage("")}
                  className="text-xs cursor-pointer text-red-600"
                >
                  <p>حذف الصورة</p>
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>اسم الطالب</b>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>رقم الهاتف</b>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>البريد الإلكتروني</b>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>تاريخ الميلاد</b>
            <input
              type="date"
              value={birth_date}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>المرحلة الدراسية</b>
            {
              <select
                value={levels}
                onChange={(e) => setLevels(e.target.value)}
              >
                <option value="">اختيار</option>
                {allLevels?.map((level) => (
                  <option key={level?.id} value={level?.id}>
                    {level?.name}
                  </option>
                ))}
              </select>
            }
          </div>
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>رقم هاتف ولي الأمر</b>
            <input
              type="text"
              value={parent_phone}
              onChange={(e) => setParentPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 bg-white p-3 rounded-xl">
            <b>العنوان</b>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-1 bg-white p-3 rounded-xl">
            <input
              type="checkbox"
              checked={new_student ? true : isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
            />
            <b>هل تم التقديم عبر الانترنت</b>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateOrUpdateStudent;
