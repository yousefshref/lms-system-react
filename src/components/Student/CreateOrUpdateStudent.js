import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../../context/ApiContext";
import Loading from "../Loading";
import { server } from "../../utlits/Variable";
import { Link } from "react-router-dom";

const CreateOrUpdateStudent = ({ open, setOpen, student }) => {
  const apiContext = useContext(ApiContextProvider);

  const levels = apiContext?.levels;

  useEffect(() => {
    apiContext?.getLevels();
  }, []);

  const [fullName, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [national_id_number, setNationalIdNumber] = useState("");
  const [level, setLevel] = useState("");
  const [address, setAddress] = useState("");
  const [father_phone, setFatherPhone] = useState("");
  const [mother_phone, setMotherPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (student) {
      setFullName(student?.full_name);
      setPhoneNumber(student?.phone_number);
      setNationalIdNumber(student?.national_id_number);
      setLevel(student?.level);
      setAddress(student?.address);
      setFatherPhone(student?.father_phone);
      setMotherPhone(student?.mother_phone);
      setBirthday(student?.birthday);
      setGender(student?.gender);
      setImages(student?.images_details);
    }
  }, [student]);

  const createStudent = async () => {
    const username =
      fullName.replace(/\s+/g, "_") + "_" + national_id_number.slice(0, 4);

    const password = national_id_number;

    const newAccount = await apiContext?.SignUp({
      data: {
        username,
        password,
      },
      admin: true,
    });

    if (newAccount?.token) {
      const data = new FormData();

      data.append("user", newAccount?.user?.id);
      data.append("full_name", fullName);
      data.append("phone_number", phone_number);
      data.append("national_id_number", national_id_number);
      data.append("level", level);
      data.append("address", address);
      data.append("father_phone", father_phone);
      data.append("mother_phone", mother_phone);
      data.append("birthday", birthday);
      data.append("gender", gender);

      const response = await apiContext?.createStudent({ data });

      if (response?.id) {
        apiContext?.createStudentImage({
          images,
          student_id: response?.id,
        });
        setOpen(false);
      } else {
        apiContext?.deleteUser(newAccount?.user?.id);
      }
    }
  };

  const updateStudent = async () => {
    const data = new FormData();

    data.append("full_name", fullName);
    data.append("phone_number", phone_number);
    data.append("national_id_number", national_id_number);
    data.append("level", level);
    data.append("address", address);
    data.append("father_phone", father_phone);
    data.append("mother_phone", mother_phone);
    data.append("birthday", birthday);
    data.append("gender", gender);

    const response = await apiContext?.updateStudent({
      data,
      student_id: student?.id,
    });

    if (response?.id) {
      apiContext?.createStudentImage({
        images,
        student_id: response?.id,
      });
      setOpen(false);
    }
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        if (student?.id) {
          updateStudent();
        } else {
          createStudent();
        }
      }}
      closeIcon={false}
      className="font"
    >
      {apiContext?.studentsLoading || apiContext?.signUpLoading ? (
        <Loading />
      ) : null}
      <div className="min-h-fit max-h-[500px] overflow-y-scroll flex flex-col gap-5 p-3 rounded-xl bg-zinc-300">
        {student?.id && (
          <div className="flex gap-5">
            <button
              onClick={() =>
                apiContext
                  ?.deleteStudent({ student_id: student?.id })
                  .then(() => setOpen(false))
              }
              className="w-fit btn-red"
            >
              حذف الطالب
            </button>
            <Link
              to={`/admin/students/${student?.full_name?.replace(
                /\s+/g,
                "-"
              )}/${student?.id}/`}
            >
              <button className="btn-indigo">صفحة الطالب</button>
            </Link>
          </div>
        )}
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>الاسم بالكامل</p>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>رقم هاتف الطالب</p>
          <input
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>الرقم القومي</p>
          <input
            value={national_id_number}
            onChange={(e) => setNationalIdNumber(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>المرحلة</p>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">اختر المرحلة</option>
            {levels?.map((level) => (
              <option value={level.id} key={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>العنوان</p>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>رقم هاتف ولي الامر</p>
          <input
            value={father_phone}
            onChange={(e) => setFatherPhone(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>رقم هاتف ام</p>
          <input
            value={mother_phone}
            onChange={(e) => setMotherPhone(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>تاريخ الميلاد</p>
          <input
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            type="date"
          />
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>النوع</p>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="ذكر">ذكر</option>
            <option value="انثى">انثي</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 p-3 rounded-xl bg-white">
          <p>اضافة صور</p>
          <div className="flex flex-col gap-2">
            {images?.map((image, index) => {
              return (
                <div
                  onClick={() => {
                    if (image?.id) {
                      apiContext?.deleteStudentImage({ image_id: image?.id });
                    }
                  }}
                  key={index}
                  className="flex flex-col gap-1 p-3 rounded-xl bg-white"
                >
                  <input
                    type="text"
                    placeholder="اسم الصورة"
                    value={images[index].name}
                    onChange={(e) => {
                      const newImages = [...images];
                      newImages[index].name = e.target.value;
                      setImages(newImages);
                    }}
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const newImages = [...images];
                      newImages[index].image = e.target.files[0];
                      setImages(newImages);
                    }}
                  />
                  {image?.image && typeof image?.image === "string" ? (
                    <img
                      src={server + image?.image}
                      alt="preview"
                      className="w-20"
                    />
                  ) : null}
                  {image?.image && typeof image?.image === "object" ? (
                    <img
                      src={URL.createObjectURL(image?.image)}
                      alt="preview"
                      className="w-20"
                    />
                  ) : null}
                  <span
                    onClick={() => {
                      const newImages = [...images];
                      newImages.splice(index, 1);
                      setImages(newImages);
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    حذف الصورة
                  </span>
                </div>
              );
            })}
            <button
              className="btn-indigo"
              onClick={() =>
                setImages([
                  ...images,
                  {
                    student: "",
                    name: "",
                    image: null,
                  },
                ])
              }
            >
              اضافة صورة اخرى
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateStudent;
