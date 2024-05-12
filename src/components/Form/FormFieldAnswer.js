import React, { useState } from "react";

const FormFieldAnswer = ({
  field,
  answersData,
  setAnswersData,
  fields,
  index,
}) => {
  const [answer, setAnswer] = useState(answersData[index]?.answer);

  return (
    <div key={field?.id} className="bg-white md:p-3 p-2 rounded-xl">
      <p>{field?.name}</p>
      {field?.type === "text" && (
        <input
          onChange={(e) => {
            setAnswer(e.target.value);
            answersData[index].answer = e.target.value;
          }}
          value={answer}
          type="text"
        />
      )}
      {field?.type === "number" && (
        <input
          onChange={(e) => {
            setAnswer(e.target.value);
            answersData[index].answer = e.target.value;
          }}
          value={answer}
          type="number"
        />
      )}
      {field?.type === "date" && (
        <input
          onChange={(e) => {
            setAnswer(e.target.value);
            answersData[index].answer = e.target.value;
          }}
          value={answer}
          type="date"
        />
      )}
      {field?.type === "time" && (
        <input
          onChange={(e) => {
            setAnswer(e.target.value);
            answersData[index].answer = e.target.value;
          }}
          value={answer}
          type="time"
        />
      )}
      {field?.type === "checkbox" && (
        <input
          onChange={(e) => {
            setAnswer(e.target.value);
            answersData[index].answer = e.target.value;
          }}
          value={answer}
          type="checkbox"
        />
      )}
      {field?.type === "textarea" && <textarea value={answer} />}
      {field?.type === "image" && <input type="file" />}
    </div>
  );
};

export default FormFieldAnswer;
