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

  const profile = apiContext?.profile?.school;
  const loading = apiContext?.profileLoading;
  useEffect(() => {
    apiContext?.checkUser();
  }, [apiContext?.createProfileSuccess]);

  const [openEdit, setOpenEdit] = React.useState(false);

  useEffect(() => {
    if (
      (!profile?.profile_image ||
        !profile?.name ||
        profile?.levels?.length === 0 ||
        profile?.subjects?.length === 0) &&
      profile?.id
    ) {
      setOpenEdit(true);
    }
  }, [profile, openEdit]);

  if (!profile && !apiContext?.profileLoading) {
    return <ChooseProfile />;
  }

  return (
    <DefaultLayout>
      {apiContext?.profileLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* profile and info */}
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
                    alt={profile?.name}
                    src={server + profile?.profile_image}
                  />
                </div>
                <div className="relative flex flex-col gap-2 p-3 rounded-xl bg-indigo-400 bg-opacity-50">
                  {/* edit profile */}
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
                  <h1 className="text-3xl">{profile?.name}</h1>
                  <p className="text-sm">
                    {profile?.level_details
                      ?.map((level) => level.name)
                      ?.join(", ")}
                  </p>
                  <p className="text-sm">
                    {profile?.subject_details
                      ?.map((level) => level.name)
                      ?.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* list of navigation */}
          <div className="flex gap-5 p-3 rounded-xl">
            <button
              onClick={() => apiContext?.navigate(`/`)}
              className="p-2 px-6 rounded-xl border bg-lime-600 bg-opacity-50 transition-all hover:bg-lime-600 cursor-pointer hover:bg-opacity-30 active:bg-opacity-50"
            >
              الموقع الالكتروني
            </button>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default SchoolProfile;
