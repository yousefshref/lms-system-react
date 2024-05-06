import axios from "axios";
import React from "react";

const FormField = ({ field, data, setLoading }) => {
  return (
    <div className="flex flex-col text-start gap-1 p-3 rounded-xl bg-zinc-200">
      <p className="font-bold">{field?.name}</p>
      {field?.type === "text" && (
        <input
          onChange={(e) => (data[field?.name] = e.target.value)}
          type="text"
          className="p-2 rounded-md"
        />
      )}
      {field?.type === "number" && (
        <input
          onChange={(e) => (data[field?.name] = e.target.value)}
          type="number"
          className="p-2 rounded-md"
        />
      )}
      {field?.type === "email" && (
        <input
          onChange={(e) => (data[field?.name] = e.target.value)}
          type="email"
          className="p-2 rounded-md"
        />
      )}
      {field?.type === "date" && (
        <input
          onChange={(e) => (data[field?.name] = e.target.value)}
          type="date"
          className="p-2 rounded-md"
        />
      )}
      {field?.type === "time" && (
        <input
          onChange={(e) => (data[field?.name] = e.target.value)}
          type="time"
          className="p-2 rounded-md"
        />
      )}
      {field?.type === "checkbox" && (
        <select onChange={(e) => (data[field?.name] = e.target.value)}>
          <option value={true}>نعم</option>
          <option value={false}>لا</option>
        </select>
      )}
      {field?.type === "textarea" && <textarea className="p-2 rounded-md" />}
      {field?.type === "file" && (
        <input
          onChange={async (e) => {
            setLoading(true);
            // get the file
            const file = e.target.files[0];

            // send it to imgbb
            const body = new FormData();
            body.set("key", "e4b8ad3db37cc93ecaf2897f75edc685");
            body.append("image", file);

            const res = await axios({
              method: "post",
              url: "https://api.imgbb.com/1/upload",
              data: body,
            });

            // add the link of the imgbb to the data
            data[field?.name] = res?.data?.data?.url;
            setLoading(false);
          }}
          type="file"
          className="p-2 rounded-md bg-white"
        />
      )}
    </div>
  );
};

export default FormField;
