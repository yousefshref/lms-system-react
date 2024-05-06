import React, { useContext, useEffect } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ApiContextProvider } from "../context/ApiContext";
import Post from "./Post";
import Loading from "./Loading";
import { CiWarning } from "react-icons/ci";
import { useParams } from "react-router-dom";

const AddedElement = ({
  element,
  websiteHolder,
  setWebsiteHolder,
  is_admin,
}) => {
  const index = websiteHolder?.findIndex(
    (item) => item.index === element.index
  );

  const [value, setValue] = React.useState(websiteHolder[index]?.value);

  const [textEdit, setTextEdit] = React.useState(false);
  const updateText = (e) => {
    const newValue = e.target.value;
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].value = newValue;
    setValue(newValue);
  };
  const updateTextSize = (e) => {
    const newValue = e.target.value;
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].size = newValue;
  };
  const updateTextWeight = (e) => {
    const newValue = e.target.value;
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].weight = newValue;
  };
  const updateTextPosition = (e) => {
    const newValue = e.target.value;
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].position = newValue;
  };

  const [imageEdit, setImageEdit] = React.useState(false);
  const [imageWidth, setImageWidth] = React.useState(
    websiteHolder[index]?.width
  );
  const updateImage = (e) => {
    const newValue = e.target.files[0];
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].value = newValue;
    setValue(newValue);
  };

  const updateImagePosition = (e) => {
    const newValue = e.target.value;
    const updatedHolder = [...websiteHolder];
    updatedHolder[index].imagePosition = newValue;
  };

  const deleteElement = () => {
    const exist = websiteHolder?.find((item) => item.index === element.index);
    setWebsiteHolder((prev) =>
      prev?.filter((item) => item.index !== exist?.index)
    );
    setValue(null);
  };

  // posts
  const apiContext = useContext(ApiContextProvider);

  const posts = apiContext?.posts;
  const postsLoading = apiContext?.postsLoading;

  useEffect(() => {
    apiContext?.getPosts();
  }, []);

  const params = useParams();

  return (
    <div className="flex flex-col gap-4">
      {element?.check === "space" && <br />}
      {element?.check === "posts" && (
        <div className="flex flex-col-reverse p-2 rounded-xl relative gap-2">
          {is_admin && (
            <div className="flex gap-3">
              <span
                className="text-red-600 cursor-pointer my-auto"
                onClick={() => deleteElement()}
              >
                <BiTrash />
              </span>
            </div>
          )}
          <div className="flex overflow-y-scroll min-h-fit max-h-[600px] flex-col gap-4 md:p-8 p-3 rounded-xl border border-indigo-800">
            <div className="flex gap-3 justify-between">
              <p className="my-auto text-xl">أخر المنشورات</p>
              <p
                onClick={() =>
                  apiContext?.navigate(
                    `/school/${params.schoolName}/${params.schoolId}/posts/`
                  )
                }
                className="my-auto text-blue-800 text-sm cursor-pointer"
              >
                جميع المنشورات
              </p>
            </div>
            <hr />
            {postsLoading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts
                ?.slice(0, 5)
                ?.map((post, index) => <Post key={index} post={post} />)
            ) : (
              <p className="flex gap-3">
                <span className="my-auto">
                  <CiWarning />
                </span>
                <p className="my-auto">لا يوجد متشروات اليوم</p>
              </p>
            )}
          </div>
        </div>
      )}
      {element?.check === "image" && (
        <div className="flex flex-col-reverse p-2 rounded-xl relative gap-2">
          {is_admin && (
            <div className="flex gap-3">
              <span
                className="text-blue-600 cursor-pointer my-auto"
                onClick={() => setImageEdit(!imageEdit)}
              >
                <BiEdit />
              </span>
              <span
                className="text-red-600 cursor-pointer my-auto"
                onClick={() => deleteElement()}
              >
                <BiTrash />
              </span>
            </div>
          )}
          {typeof value === "string" ? (
            <img
              style={{ width: `${imageWidth}px` }}
              className={`rounded-xl ${element?.imagePosition}`}
              alt={element?.title}
              src={value}
            />
          ) : typeof value === "object" && value ? (
            <img
              style={{ width: `${imageWidth}px` }}
              className={`rounded-xl ${element?.imagePosition}`}
              alt={element?.title}
              src={URL.createObjectURL(value)}
            />
          ) : null}
          {imageEdit ? (
            <div className="flex flex-col gap-2">
              <input
                type="file"
                onChange={(e) => {
                  updateImage(e);
                }}
              />
              <input
                placeholder="عرض الصورة مثال: 300"
                value={imageWidth}
                onChange={(e) => {
                  const newValue = e.target.value;
                  const updatedHolder = [...websiteHolder];
                  updatedHolder[index].width = newValue;
                  setImageWidth(newValue);
                }}
              />
              <select onChange={(e) => updateImagePosition(e)}>
                <option value="">اختر مكان الصورة</option>
                <option value={"mx-auto"}>في الوسط</option>
                <option value={"me-auto"}>علي اليمين</option>
                <option value={"ms-auto"}>علي اليسار</option>
              </select>
            </div>
          ) : null}
        </div>
      )}
      {element?.check === "text" && (
        <div className="flex p-2 rounded-xl relative gap-2">
          {is_admin && (
            <div className="flex gap-3">
              <span
                className="text-blue-600 cursor-pointer my-auto"
                onClick={() => setTextEdit(!textEdit)}
              >
                <BiEdit />
              </span>
              <span
                className="text-red-600 cursor-pointer my-auto"
                onClick={() => deleteElement()}
              >
                <BiTrash />
              </span>
            </div>
          )}
          <div className="w-full">
            {element?.check === "text" &&
              (textEdit ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={value}
                    onChange={(e) => {
                      updateText(e);
                    }}
                  />
                  <select onChange={(e) => updateTextSize(e)}>
                    <option value="">اختر حجم الخط</option>
                    <option value={"text-xs"}>خط صغير جدا</option>
                    <option value={"text-sm"}>خط صغير</option>
                    <option value={"text-lg"}>خط عادي</option>
                    <option value={"text-2xl"}>خط كبير</option>
                    <option value={"text-3xl"}>خط كبير جدا</option>
                  </select>
                  <select onChange={(e) => updateTextWeight(e)}>
                    <option value="">اختر ثقل الخط</option>
                    <option value={"font-normal"}>خط رفيع</option>
                    <option value={"font-bold"}>خط ثقيل</option>
                  </select>
                  <select onChange={(e) => updateTextPosition(e)}>
                    <option value="">اختر مكان الخط</option>
                    <option value={"font-right"}>علي اليمين</option>
                    <option value={"text-center"}>علي الوسط</option>
                    <option value={"text-left"}>علي اليسار</option>
                  </select>
                </div>
              ) : (
                <p
                  className={`${element?.size} ${element?.position} ${element?.weight}`}
                >
                  {value}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddedElement;
