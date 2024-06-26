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
        localStorage.setItem("id", response.data.user?.id);
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

  const createLevel = async ({ data = {} }) => {
    setLoginLoading(true);
    try {
      const response = await axios.post(
        `${server}api/v1/levels/`,
        data,
        headers
      );
      if (response.data?.id) {
        success("تم اضافة المستوي بنجاح");
        return await response.data;
      } else {
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoginLoading(false);
    }
  };

  const updateLevel = async ({ id, data = {} }) => {
    setLoginLoading(true);
    try {
      const response = await axios.put(
        `${server}api/v1/levels/${id}/`,
        data,
        headers
      );
      if (response.data?.id) {
        success("تم تعديل المستوي بنجاح");
        return await response.data;
      } else {
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoginLoading(false);
    }
  };

  const deleteLevel = async (id) => {
    try {
      const response = await axios.delete(
        `${server}api/v1/levels/${id}/`,
        headers
      );
      if (response.data.success) {
        success("تم حذف المستوي بنجاح");
        getLevels();
      }
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

  const [student, setStudent] = useState({});

  const getStudent = async (id) => {
    setStudentsLoading(true);
    try {
      const response = await axios.get(
        `${server}api/v1/students/${id}/`,
        headers
      );
      setStudent(response.data);
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

  const storeStudentsWithExcel = async ({ data = {} }) => {
    setStudentsLoading(true);
    try {
      const response = await axios.post(
        `${server}api/v1/students/excel/`,
        data,
        headers
      );
      success("تم تحميل الطلاب بنجاح");
      return await response.data;
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

  const [forms, setForms] = useState([]);
  const [formsLoading, setFormsLoading] = useState(false);

  const getForms = async () => {
    setFormsLoading(true);
    try {
      const response = await axios.get(`${server}api/v1/forms/`, headers);
      setForms(response.data);
      return await response.data;
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const [form, setForm] = useState({});

  const getForm = async ({ form_id = "" }) => {
    setFormsLoading(true);
    try {
      const response = await axios.get(
        `${server}api/v1/forms/${form_id}/`,
        headers
      );
      setForm(response.data);
      return await response.data;
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const updateForm = async ({ data = {}, form_id = "" }) => {
    setFormsLoading(true);
    try {
      const response = await axios.put(
        `${server}api/v1/forms/${form_id}/`,
        data,
        headers
      );
      if (response.data?.id) {
        success("تم تعديل النموذج بنجاح");
        getForms();
        return await response.data;
      } else {
        console.log(response.data);
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const deleteForm = async ({ form_id = "" }) => {
    setFormsLoading(true);
    try {
      const response = await axios.delete(
        `${server}api/v1/forms/${form_id}/`,
        headers
      );
      success("تم حذف النموذج بنجاح");
      getForms();
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const createForm = async ({ data = {} }) => {
    setFormsLoading(true);
    try {
      const response = await axios.post(
        `${server}api/v1/forms/`,
        data,
        headers
      );
      if (response.data?.id) {
        success("تم تسجيل النموذج بنجاح");
        getForms();
        return await response.data;
      } else {
        console.log(response.data);
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const createFormField = async ({ data = {} }) => {
    setFormsLoading(true);
    try {
      const response = await axios.post(
        `${server}api/v1/form-fields/`,
        data,
        headers
      );
      if (response.data?.id) {
        getForms();
        return await response.data;
      } else {
        console.log(response.data);
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const updateFormField = async ({ data = {}, field_id = "" }) => {
    setFormsLoading(true);
    try {
      const response = await axios.put(
        `${server}api/v1/form-fields/${field_id}/`,
        data,
        headers
      );
      if (response.data?.id) {
        getForms();
        return await response.data;
      } else {
        console.log(response.data);
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const deleteFormField = async ({ field_id = "" }) => {
    setFormsLoading(true);
    try {
      const response = await axios.delete(
        `${server}api/v1/form-fields/${field_id}/`,
        headers
      );
      getForms();
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const createFormAnswerParent = async ({ data = {} }) => {
    setFormsLoading(true);
    try {
      const response = await axios.post(
        `${server}api/v1/form-answers/`,
        data,
        headers
      );
      if (response.data?.id) {
        return await response.data;
      } else {
        console.log(response.data);
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const [formAnswers, setFormAnswers] = useState([]);

  const getFormAnswers = async ({ form_id = "", student_id = "" }) => {
    setFormsLoading(true);
    try {
      const response = await axios.get(
        `${server}api/v1/form-answers/?form_id=${form_id}&student_id=${student_id}`,
        headers
      );
      setFormAnswers(response.data);
      return await response.data;
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const createFormAnswer = async ({ data = {} }) => {
    try {
      const response = await axios.post(
        `${server}api/v1/answers/`,
        data,
        headers
      );
      if (response.data?.id) {
        return await response.data;
      } else {
        console.log(response.data);
        Object?.entries(response?.data)?.forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <ApiContextProvider.Provider
      value={{
        createFormAnswerParent,
        formAnswers,
        getFormAnswers,

        createFormAnswer,

        forms,
        formsLoading,
        getForms,
        form,
        getForm,
        updateForm,
        deleteForm,
        createForm,

        createFormField,
        updateFormField,
        deleteFormField,

        students,
        studentsLoading,
        getStudents,
        student,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent,
        storeStudentsWithExcel,

        createStudentImage,
        deleteStudentImage,

        levels,
        getLevels,
        createLevel,
        updateLevel,
        deleteLevel,

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
