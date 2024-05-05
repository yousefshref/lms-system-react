import React, { useContext, useEffect } from "react";
import { server } from "../utlits/Variable";
import { ApiContextProvider } from "../context/ApiContext";
import { BiTrash } from "react-icons/bi";
import { Popconfirm } from "antd";

const Post = ({ post }) => {
  const apiContext = useContext(ApiContextProvider);

  const profile = apiContext?.profile;

  useEffect(() => {
    apiContext?.checkUser({});
  }, [post]);

  return (
    <div className="relative flex flex-col gap-1 p-3 rounded-xl bg-white shadow-md">
      {profile?.school?.user == localStorage.getItem("id") && (
        <Popconfirm
          title="حذف المنشور"
          description="هل انت متأكد ؟"
          onConfirm={() => {
            apiContext?.deletePost(post?.id).then(() => {
              apiContext?.getPosts();
            });
          }}
          okText="Yes"
          cancelText="No"
        >
          <span className="absolute top-2 left-2 text-red-600 cursor-pointer">
            <BiTrash />
          </span>
        </Popconfirm>
      )}

      <p className="text-2xl">{post?.title}</p>
      <p className="text-sm text-zinc-600">{post?.description}</p>
      <small className="text-xs text-zinc-600">
        {new Intl.DateTimeFormat("ar-EG", {
          dateStyle: "full",
          timeStyle: "short",
        }).format(new Date(post?.created_at))}
      </small>
      {post?.image && <img className="rounded-xl" src={server + post?.image} />}
    </div>
  );
};

export default Post;
