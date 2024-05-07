import { Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../../context/ApiContext";
import { server } from "../../utlits/Variable";

const CreateOrUpdateProfile = ({ open, setOpen, create, type }) => {
  const apiContext = useContext(ApiContextProvider);

  const school = apiContext?.school;
  const profileLoading = apiContext?.profileLoading;

  useEffect(() => {
    apiContext?.getSchool();
  }, []);

  const student = apiContext?.student;
  // useEffect(() => {
  //   if (localStorage.getItem("phone")) {
  //     apiContext?.getStudent({ phone: localStorage.getItem("phone") });
  //   } else {
  //     apiContext?.navigate("/auth/with-phone/");
  //   }
  // }, []);

  const allSubjects = apiContext.subjects;
  useEffect(() => {
    apiContext?.getSubjects();
  }, []);

  const allLevels = apiContext.levels;
  useEffect(() => {
    apiContext?.getLevels();
  }, []);

  const [profileImage, setProfileImage] = React.useState(
    school ? school?.profile_image : student ? student?.profile_image : ""
  );
  const [name, setName] = React.useState(
    school ? school?.name : student ? student?.name : ""
  );
  const [levels, setLevels] = React.useState(
    school ? school?.levels : student ? student?.levels : []
  );
  const [subjects, setSubjects] = React.useState(
    school ? school?.subjects : student ? student?.subjects : []
  );

  const updateProfile = () => {
    const formData = new FormData();

    if (typeof profileImage === "object")
      formData.append("profile_image", profileImage);
    formData.append("name", name);
    formData.append("levels", levels);
    formData.append("subjects", subjects);
    apiContext.updateProfile({
      data: formData,
      setOpen: setOpen,
    });
  };

  const createProfile = () => {
    const formData = new FormData();

    formData.append("user", apiContext?.user?.user_id);
    formData.append("profile_image", profileImage);
    formData.append("name", name);
    formData.append("levels", levels);
    formData.append("subjects", subjects);

    apiContext.createProfile({
      data: formData,
      type: type,
      setOpen: setOpen,
    });
  };

  return (
    <Modal
      centered
      open={open}
      onOk={() => {
        if (create) {
          createProfile();
        } else {
          updateProfile();
        }
      }}
      onCancel={() => setOpen(false)}
      closeIcon={false}
    >
      <div className="flex flex-col gap-5 p-3 rounded-xl bg-zinc-500 bg-opacity-35">
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-zinc-200">
          <p>صورة بروفايل/ صورة المدرسة</p>
          <input
            className="bg-white"
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          {profileImage && typeof profileImage === "object" && (
            <img src={URL.createObjectURL(profileImage)} alt="profile image" />
          )}
          {profileImage && typeof profileImage === "string" && (
            <img src={server + profileImage} alt="profile image" />
          )}
          <small className="text-red-500">الحقل مطلوب</small>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-zinc-200">
          <p>اسم المدرسة</p>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <small className="text-red-500">الحقل مطلوب</small>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-zinc-200">
          <p>المستويات التي يتم تدريسها</p>
          <div className="flex flex-wrap gap-3">
            {allLevels.map((level) => (
              <div
                onClick={() => {
                  const exist = levels.find((l) => l === level.id);
                  if (exist) {
                    setLevels(levels.filter((l) => l !== level.id));
                  } else {
                    setLevels((prevLevels) => [...prevLevels, level.id]);
                  }
                }}
                key={level.id}
                className={`${
                  levels.includes(level.id) ? "bg-indigo-600 text-white" : ""
                } flex text-xs px-5 cursor-pointer transition-all active:bg-indigo-500 hover:bg-indigo-600 hover:text-white rounded-full items-center p-2 bg-indigo-200`}
              >
                <p>{level.name}</p>
              </div>
            ))}
          </div>
          <small className="text-red-500">عل الاقل واحدة</small>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-zinc-200">
          <p>المواد التي يتم تدريسها</p>
          <div className="flex flex-wrap gap-3">
            {allSubjects.map((subject) => (
              <div
                onClick={() => {
                  const exist = subjects.find((s) => s === subject.id);
                  if (exist) {
                    setSubjects(subjects.filter((s) => s !== subject.id));
                  } else {
                    setSubjects((prevSubjects) => [
                      ...prevSubjects,
                      subject.id,
                    ]);
                  }
                }}
                key={subject.id}
                className={`${
                  subjects.includes(subject.id)
                    ? "bg-indigo-600 text-white"
                    : ""
                } flex text-xs px-5 cursor-pointer transition-all active:bg-indigo-500 hover:bg-indigo-600 hover:text-white rounded-full items-center p-2 bg-indigo-200`}
              >
                <p>{subject.name}</p>
              </div>
            ))}
          </div>
          <small className="text-red-500">عل الاقل واحدة</small>
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateProfile;
