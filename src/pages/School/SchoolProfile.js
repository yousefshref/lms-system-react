import React, { useContext, useEffect } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { ApiContextProvider } from "../../context/ApiContext";
import Loading from "../../components/Loading";
import { server } from "../../utlits/Variable";
import LoadingScreen from "../../components/LoadingScreen";
import { BiEdit } from "react-icons/bi";
import CreateOrUpdateProfile from "../../components/schoolProfile/CreateOrUpdateProfile";
import ChooseProfile from "../../components/ChooseProfile";

const SchoolProfile = () => {
  const apiContext = useContext(ApiContextProvider);

  const school = apiContext?.school;
  const loading = apiContext?.profileLoading;
  useEffect(() => {
    apiContext?.getSchool();
  }, [apiContext?.createProfileSuccess]);

  const [openEdit, setOpenEdit] = React.useState(false);

  useEffect(() => {
    if (
      (!school?.profile_image ||
        !school?.name ||
        school?.levels?.length === 0 ||
        school?.subjects?.length === 0) &&
      school?.id
    ) {
      setOpenEdit(true);
    }
  }, [school, openEdit]);

  if (!school && !apiContext?.profileLoading) {
    return <ChooseProfile />;
  }

  return (
    <DefaultLayout>
      {apiContext?.profileLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* school and info */}
          <div className="w-full p-4 rounded-xl bg-white shadow-md">
            {loading ? (
              <div className="w-full flex justify-center">
                <Loading />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="w-full max-w-lg mx-auto">
                  <img
                    className="rounded-xl"
                    alt={school?.name}
                    src={server + school?.profile_image}
                  />
                </div>
                <div className="relative flex flex-col gap-2 p-3 rounded-xl bg-indigo-400 bg-opacity-50">
                  {/* edit school */}
                  <span
                    onClick={() => setOpenEdit(!openEdit)}
                    className="absolute left-3 top-3 cursor-pointer"
                  >
                    <BiEdit />
                  </span>
                  <CreateOrUpdateProfile
                    create={false}
                    open={openEdit}
                    setOpen={setOpenEdit}
                  />
                  <h1 className="text-3xl">{school?.name}</h1>
                  <p className="text-sm">
                    {school?.level_details
                      ?.map((level) => level.name)
                      ?.join(", ")}
                  </p>
                  <p className="text-sm">
                    {school?.subject_details
                      ?.map((level) => level.name)
                      ?.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default SchoolProfile;
