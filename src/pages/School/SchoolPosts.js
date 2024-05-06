import React, { useContext, useEffect } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import { ApiContextProvider } from "../../context/ApiContext";
import { Modal } from "antd";
import { server } from "../../utlits/Variable";
import Loading from "../../components/Loading";
import Post from "../../components/Post";

const SchoolPosts = () => {
  const apiContext = useContext(ApiContextProvider);

  const posts = apiContext?.posts;
  const postsLoading = apiContext?.postsLoading;

  useEffect(() => {
    apiContext?.getPosts();
  }, []);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");

  const [openDescription, setOpenDescription] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);

  const createPost = async () => {
    const data = new FormData();

    data.append("user", localStorage.getItem("id"));
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);

    apiContext
      ?.createPost({
        data: data,
        getThem: true,
      })
      .then(() => {
        setTitle("");
        setDescription("");
        setImage("");
      });
  };

  const url = window.location.href;
  const id = url.split("/").reverse()[2];

  const is_admin = localStorage.getItem("id") === id;

  return (
    <DefaultLayout>
      <div className="p-4 flex flex-col gap-14">
        {/* create new post */}
        {is_admin && (
          <div className="flex flex-col gap-4 p-3 rounded-xl bg-white shadow-md w-full max-w-lg mx-auto">
            <div className="flex flex-col gap-1 bg-zinc-300 p-3 rounded-xl">
              <p>اكتب عنوان المنشور</p>
              <input
                placeholder="عنوان المنشور"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-3 justify-between w-full">
              <div
                onClick={() => setOpenDescription(!openDescription)}
                className="flex w-1/2 text-center cursor-pointer transition-all hover:bg-zinc-500 hover:bg-opacity-15 flex-col gap-1 bg-zinc-300 p-3 rounded-xl"
              >
                <p>وصف المنشور</p>
              </div>
              <Modal
                center
                className="font"
                onCancel={() => setOpenDescription(!openDescription)}
                title="وصف المنشور"
                open={openDescription}
                footer={null}
                closeIcon={null}
              >
                <textarea
                  className="w-full"
                  placeholder="وصف المنشور"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Modal>

              <div
                onClick={() => setOpenImage(!openImage)}
                className="flex w-1/2 text-center cursor-pointer transition-all hover:bg-zinc-500 hover:bg-opacity-15 flex-col gap-1 bg-zinc-300 p-3 rounded-xl"
              >
                <p>صورة في المنشور</p>
              </div>
              <Modal
                center
                onCancel={() => setOpenImage(!openImage)}
                title="صورة في المنشور"
                open={openImage}
                footer={null}
                closeIcon={null}
              >
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <small
                    onClick={() => setImage("")}
                    className="text-red-500 cursor-pointer"
                  >
                    حذف الصورة
                  </small>
                  {typeof image === "string" && (
                    <img src={server + image} alt={title} />
                  )}
                  {typeof image === "object" && image ? (
                    <img src={URL.createObjectURL(image)} alt={title} />
                  ) : null}
                </div>
              </Modal>
            </div>
            <div className="flex justify-center p-e rounded-xl">
              <button onClick={createPost} className="btn-secondary w-full">
                نشر
              </button>
            </div>
          </div>
        )}

        {/* posts */}
        <div className="flex flex-col gap-5 rounded-xl w-full max-w-lg mx-auto">
          {postsLoading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : posts?.length > 0 ? (
            posts?.map((post, index) => (
              <Post is_admin={is_admin} key={index} post={post} />
            ))
          ) : (
            <p className="text-center">لا توجد منشورات</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SchoolPosts;
