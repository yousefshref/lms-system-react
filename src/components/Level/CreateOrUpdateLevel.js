import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../../context/ApiContext";

const CreateOrUpdateLevel = ({ open, setOpen, level }) => {
  const apiContext = useContext(ApiContextProvider);

  const [name, setName] = useState("");

  useEffect(() => {
    if (level) {
      setName(level?.name);
    }
  }, [level]);

  const createLevel = async () => {
    await apiContext
      ?.createLevel({
        data: { name },
      })
      .then((res) => {
        if (res?.id) {
          setOpen(false);
          apiContext?.getLevels();
        }
      });
  };

  const updateLevel = async () => {
    await apiContext
      ?.updateLevel({
        id: level?.id,
        data: { name },
      })
      .then((res) => {
        if (res?.id) {
          setOpen(false);
          apiContext?.getLevels();
        }
      });
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        if (level?.id) {
          updateLevel();
        } else {
          createLevel();
        }
      }}
      closeIcon={false}
      className="font"
    >
      <div className="flex flex-col gap-5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="اسم المستوي"
          className="input"
        />
      </div>
    </Modal>
  );
};

export default CreateOrUpdateLevel;
