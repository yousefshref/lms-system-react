import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { server } from "../utlits/Variable";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const ApiContext = ({ children }) => {
  const headers = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };

  const [apiMessage, setApiMessage] = message.useMessage();
  const error = (msg) => {
    apiMessage.error(msg);
  };
  const success = (msg) => {
    apiMessage.success(msg);
  };

  const navigate = useNavigate();

  const [signUpLoading, setSignUpLoading] = useState(false);

  const SignUp = async ({ data = {}, admin = false }) => {
    setSignUpLoading(true);
    try {
      const response = await axios.post(`${server}api/v1/signup/`, data);
      if (response.data.token) {
        success("تم انشاء الحساب بنجاح");
        if (!admin) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
        }
        if (response.data.user.is_superuser) {
          navigate("/admin");
        }
        return await response.data;
      } else {
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      error("حدث خطأ ما, من الممكن ان تكون غير مسجل او المستخدم غير صحيح");
      console.log(err);
    } finally {
      setSignUpLoading(false);
    }
  };

  const [loginLoading, setLoginLoading] = useState(false);

  const LogIn = async (data) => {
    setLoginLoading(true);
    try {
      const response = await axios.post(`${server}api/v1/login/`, data);
      if (response.data.token) {
        success("تم تسجيل الدخول بنجاح");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        if (response.data.user.is_superuser) {
          navigate("/admin");
        } else {
          navigate(
            `/student/${response.data.user.student_detail?.full_name?.replace(
              " ",
              "-"
            )}/${response.data.user.student_detail?.id}/profile/`
          );
        }
      } else {
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      error("حدث خطأ ما, من الممكن ان تكون غير مسجل او المستخدم غير صحيح");
      console.log(err);
    } finally {
      setLoginLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `${server}api/v1/users/${id}/`,
        headers
      );
      if (response.data) {
        success("تم حذف الطالب بنجاح");
        getStudents();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [user, setUser] = useState({});
  const [usersLoading, setUsersLoading] = useState(false);

  const getUser = async () => {
    if (localStorage.getItem("token")) {
      setUsersLoading(true);
      try {
        const response = await axios.get(`${server}api/v1/user/`, headers);
        setUser(response.data);
        return await response.data;
      } catch (err) {
        console.log(err);
      } finally {
        setUsersLoading(false);
      }
    }
  };

  const [levels, setLevels] = useState([]);

  const getLevels = async () => {
    try {
      const response = await axios.get(`${server}api/v1/levels/`, headers);
      setLevels(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  const getStudents = async () => {
    setStudentsLoading(true);
    try {
      const response = await axios.get(`${server}api/v1/students/`, headers);
      setStudents(response.data);
      return await response.data;
    } catch (err) {
      console.log(err);
    } finally {
      setStudentsLoading(false);
    }
  };

  const createStudent = async ({ data = {} }) => {
    setStudentsLoading(true);
    try {
      const response = await axios.post(
        `${server}api/v1/students/`,
        data,
        headers
      );
      if (response.data?.id) {
        success("تم اضافة الطالب بنجاح");
        getStudents();
        return await response.data;
      } else {
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setStudentsLoading(false);
    }
  };

  const updateStudent = async ({ data = {}, student_id = "" }) => {
    setStudentsLoading(true);
    try {
      const response = await axios.put(
        `${server}api/v1/students/${student_id}/`,
        data,
        headers
      );
      if (response.data?.id) {
        success("تم تعديل الطالب بنجاح");
        getStudents();
        return await response.data;
      } else {
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setStudentsLoading(false);
    }
  };

  const deleteStudent = async ({ student_id = "" }) => {
    setStudentsLoading(true);
    try {
      const response = await axios.delete(
        `${server}api/v1/students/${student_id}/`,
        headers
      );
      success("تم حذف الطالب بنجاح");
      getStudents();
    } catch (err) {
      console.log(err);
    } finally {
      setStudentsLoading(false);
    }
  };

  const createStudentImage = async ({ images = {}, student_id = "" }) => {
    setStudentsLoading(true);
    const data = new FormData();
    images.forEach(async (image) => {
      data.append("student", student_id);
      data.append("name", image?.name);
      data.append("image", image?.image);

      try {
        const response = await axios.post(
          `${server}api/v1/students-images/`,
          data,
          headers
        );
      } catch (err) {
        console.log(err);
      }
    });
    setStudentsLoading(false);
  };

  const deleteStudentImage = async ({ image_id = "" }) => {
    setStudentsLoading(true);
    try {
      const response = await axios.delete(
        `${server}api/v1/students-images/${image_id}/`,
        headers
      );
    } catch (err) {
      console.log(err);
    } finally {
      setStudentsLoading(false);
    }
  };

  return (
    <ApiContextProvider.Provider
      value={{
        students,
        studentsLoading,
        getStudents,
        createStudent,
        updateStudent,
        deleteStudent,

        createStudentImage,
        deleteStudentImage,

        levels,
        getLevels,

        user,
        usersLoading,
        getUser,

        deleteUser,

        loginLoading,
        LogIn,
        signUpLoading,
        SignUp,

        setApiMessage,
        navigate,
        success,
        error,
      }}
    >
      {children}
    </ApiContextProvider.Provider>
  );
};

export const ApiContextProvider = createContext();
export default ApiContext;
