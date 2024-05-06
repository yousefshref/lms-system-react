import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../../context/ApiContext";
import LoadingScreen from "../../components/LoadingScreen";
import { ImImage } from "react-icons/im";
import WebsiteElement from "../../components/WebsiteElement";
import { useDrop } from "react-dnd";
import { PiTextT } from "react-icons/pi";
import AddedElement from "../../components/AddedElement";
import axios from "axios";
import { BiArrowBack, BiSpaceBar } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";

const SchoolWebsite = () => {
  const apiContext = useContext(ApiContextProvider);

  const url = window.location.href;
  const id = url.split("/").reverse()[1];

  const profile = apiContext?.profile;
  const loading = apiContext?.profileLoading;

  useEffect(() => {
    apiContext?.checkUser({
      noNavigate: true,
    });
  }, []);

  const website = apiContext?.website;
  const websiteLoading = apiContext?.websiteLoading;
  useEffect(() => {
    apiContext?.getWebsite({
      user_id: id,
    });
  }, []);

  const elements = [
    {
      id: 1,
      title: "نص",
      check: "text",
      icon: <PiTextT />,
      value: "نص جديد يمكنك تعديله",
      size: "small",
      weight: "font-normal",
      position: "text-center",
    },
    {
      id: 2,
      title: "صورة",
      check: "image",
      icon: <ImImage />,
      value:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      width: 300,
      imagePosition: "",
    },
    {
      id: 3,
      title: "مسافة من الاسفل",
      check: "space",
      icon: <BiSpaceBar />,
      value: "",
    },
    {
      id: 4,
      title: "جزء من المنشورات",
      check: "posts",
      icon: <MdPostAdd />,
      value: [],
    },
  ];

  const [websiteHolder, setWebsiteHolder] = React.useState([]);

  useEffect(() => {
    if (website?.details !== null || website?.details != [])
      setWebsiteHolder(website?.details || []);
  }, [website]);

  const addItemToHolder = (item) => {
    setWebsiteHolder((prev) => {
      const index = prev.length + 1;
      const newObj = {
        index: index,
        title: item?.title,
        check: item?.check,
        value: item?.value,
        // image
        width: item?.width,
        imagePosition: item?.imagePosition,
        // text
        size: item?.size,
        weight: item?.weight,
        position: item?.position,
      };
      return [...prev, newObj];
    });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["image", "text", "space", "posts"],
    drop: (element) => addItemToHolder(element),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [loadingUpdate, setLoadingUpdate] = React.useState(false);

  const updateWebsite = () => {
    setLoadingUpdate(true);
    const images = websiteHolder?.filter(
      (item) => item?.check === "image" && typeof item?.value === "object"
    );

    Promise.all(
      images?.map(async (item) => {
        const body = new FormData();
        body.set("key", "e4b8ad3db37cc93ecaf2897f75edc685");
        body.append("image", item.value);

        const res = await axios({
          method: "post",
          url: "https://api.imgbb.com/1/upload",
          data: body,
        });

        item.value = res?.data?.data?.url;
      })
    )
      .then(() => {
        const data = new FormData();
        data.append("details", JSON.stringify(websiteHolder));
        apiContext?.updateWebsite({
          user_id: id,
          data: data,
        });
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  const is_admin = profile?.school?.user == id;

  return (
    <div className="w-full max-w-7xl mx-auto">
      {loading || loadingUpdate ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col gap-8 p-5">
          {is_admin && (
            <>
              {/* header */}
              <div className="p-3 flex flex-col justify-center rounded-xl bg-white shadow-md relative">
                <span
                  onClick={() =>
                    apiContext?.navigate(
                      `/school/${profile?.school?.user_details?.username}/${profile?.school?.user_details?.id}/profile/`
                    )
                  }
                  className="absolute left-3 cursor-pointer my-auto"
                >
                  <BiArrowBack />
                </span>
              </div>
              {/* elements */}
              <div className="flex gap-5 p-3 rounded-xl overflow-x-scroll bg-white shadow-md">
                {elements?.map((element) => (
                  <WebsiteElement
                    key={element?.id}
                    type={element.check}
                    element={element}
                  />
                ))}
              </div>

              <div>
                <button className="btn-primary" onClick={updateWebsite}>
                  تحديث
                </button>
              </div>
            </>
          )}

          <div
            ref={drop}
            className="website flex flex-col p-3 rounded-xl bg-white shadow-md"
          >
            {websiteHolder?.length > 0 ? (
              websiteHolder?.map((element) => (
                <AddedElement
                  is_admin={is_admin}
                  setWebsiteHolder={setWebsiteHolder}
                  websiteHolder={websiteHolder}
                  key={element?.index}
                  element={element}
                />
              ))
            ) : (
              <div>
                <p className="text-center">الموقع فارغ</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolWebsite;
