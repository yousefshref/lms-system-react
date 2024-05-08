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

  // const user = decodeToken(localStorage.getItem('access'))

  const [subjects, setSubjects] = React.useState([]);

  const getSubjects = async () => {
    try {
      const res = await axios.get(`${server}api/v1/subjects/`, headers);
      setSubjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [levels, setLevels] = React.useState([]);

  const getLevels = async () => {
    try {
      const res = await axios.get(`${server}api/v1/levels/`, headers);
      setLevels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const [profile, setProfile] = React.useState({})
  // const [profileLoading, setProfileLoading] = React.useState(false)
  // const getProfile = async () => {
  //   setProfileLoading(true)
  //   try {
  //     const res = await axios.get(`${server}api/v1/check-user/`, headers)
  //     setProfile(res.data)
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   finally {
  //     setProfileLoading(false)
  //   }
  // }

  // const [loginLoading, setLoginLoading] = React.useState(false)
  // const logIn = async (data) => {
  //   setLoginLoading(true)
  //   try {
  //     const res = await axios.post(`${server}api/v1/token/`, data)
  //     if (res?.data?.access) {
  //       localStorage.setItem('access', res.data.access)
  //       localStorage.setItem('refresh', res.data.refresh)
  //       success('تم تسجيل الدخول')
  //       navigate('/redirect/')
  //     }
  //   } catch (err) {
  //     Object.entries(err.response.data).forEach(([key, value]) => {
  //       error(`${key}: ${value}`,)
  //     })
  //   }
  //   finally {
  //     setLoginLoading(false)
  //   }
  // }

  // const [signupLogin, setSignupLogin] = React.useState(false)
  // const signUp = async (data) => {
  //   setSignupLogin(true)
  //   try {
  //     const res = await axios.post(`${server}api/v1/sign-up/`, data)
  //     if (res?.data?.id) {
  //       success('تم تسجيل الدخول')
  //       logIn({ email: data.email, password: data.password })
  //     } else {
  //       console.log('error in singup');
  //     }
  //   } catch (err) {
  //     Object.entries(err.response.data).forEach(([key, value]) => {
  //       error(`${key}: ${value}`,)
  //     })
  //   }
  //   finally {
  //     setSignupLogin(false)
  //   }
  // }

  // const [schoolProfile, setSchoolProfile] = React.useState({})
  // const [schooProfileLoading, setSchoolProfileLoading] = React.useState(false)

  // const getSchoolProfile = async () => {
  //   setSchoolProfileLoading(true)
  //   try {
  //     const res = await axios.get(`${server}api/v1/schools/`, headers)
  //     setSchoolProfile(res.data)
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   finally {
  //     setSchoolProfileLoading(false)
  //   }
  // }

  // const createSchoolProfile = async (data) => {
  //   setSchoolProfileLoading(true)
  //   try {
  //     const res = await axios.post(`${server}api/v1/schools/`, data, headers)
  //     if (res?.data?.id) {
  //       success('تم انشاء حساب مدرسة')
  //       navigate(`/school/${res?.data?.user_details?.username}/${res?.data?.user_details?.id}/profile/`)
  //     } else {
  //       console.log('error in create school profile');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     Object.entries(err.response.data).forEach(([key, value]) => {
  //       error(`${key}: ${value}`)
  //     })
  //   }
  //   finally {
  //     setSchoolProfileLoading(false)
  //   }
  // }

  // const [website, setWebsite] = React.useState({})
  // const [websiteLoading, setWebsiteLoading] = React.useState(false)

  // const getWebsite = async ({ pk = '' }) => {
  //   setWebsiteLoading(true)
  //   try {
  //     const res = await axios.get(`${server}api/v1/website/?pk=${pk}`, headers)
  //     setWebsite(res.data)
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setWebsiteLoading(false)
  //   }
  // }

  // const updateWebsite = async (data) => {
  //   setWebsiteLoading(true)
  //   try {
  //     const res = await axios.put(`${server}api/v1/website/update/`, data, headers)
  //     if (res?.data?.id) {
  //       success('تم تحديث الموقع')
  //     } else {
  //       console.log('error in create school profile');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setWebsiteLoading(false)
  //   }
  // }

  const singUp = async (data) => {
    try {
      const res = await axios.post(`${server}api/v1/signup/`, data, headers);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        success("تم تسجيل الدخول");
        navigate("/redirect/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logIn = async (data) => {
    try {
      const res = await axios.post(`${server}api/v1/login/`, data, headers);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        success("تم تسجيل الدخول");
        navigate("/redirect/");
      } else {
        Object.entries(res.data).forEach(([key, value]) => {
          error(`${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [school, setSchool] = React.useState({});
  const [profileLoading, setProfileLoading] = React.useState(false);

  const getSchool = async () => {
    try {
      const res = await axios.get(`${server}api/v1/school/`, headers);
      setSchool(res.data);
      return await res.data;
    } catch (error) {
      console.log(error);
      setSchool({ error: true });
    } finally {
    }
  };

  const [student, setStudent] = React.useState({});
  const getStudent = async ({ phone, noNav = false }) => {
    try {
      const res = await axios.get(
        `${server}api/v1/student/?phone=${phone ?? ""}`,
        headers
      );
      setStudent(res.data);
      return await res.data;
    } catch (error) {
      console.log(error);
      if (!noNav && !localStorage.getItem("phone"))
        navigate("/auth/with-phone/");
    } finally {
    }
  };

  const [loading, setLoading] = React.useState(false);
  const [createProfileSuccess, setCreateProfileSuccess] = React.useState(false);
  const createProfile = async ({
    type = "",
    data = {},
    setOpen = "",
    nav = false,
  }) => {
    try {
      const res = await axios.post(
        `${server}api/v1/profile/?type=${type}`,
        data,
        headers
      );
      if (res.data.id) {
        setCreateProfileSuccess(true);
        if (setOpen) setOpen(false);
        if (nav) {
          navigate(`/redirect/`);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCreateProfileSuccess(false);
    }
  };

  const updateProfile = async ({ data = {}, setOpen = "" }) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${server}api/v1/profile/update/`,
        data,
        headers
      );
      if (res.data.id) {
        if (setOpen) setOpen(false);
        setCreateProfileSuccess(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setCreateProfileSuccess(false);
    }
  };

  const [website, setWebsite] = React.useState({});
  const [websiteLoading, setWebsiteLoading] = React.useState(false);

  const getWebsite = async ({ user_id = "" }) => {
    setWebsiteLoading(true);
    try {
      const res = await axios.get(
        `${server}api/v1/website/${user_id}/`,
        headers
      );
      setWebsite(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setWebsiteLoading(false);
    }
  };

  const updateWebsite = async ({ data = {}, user_id = "" }) => {
    setWebsiteLoading(true);
    try {
      const res = await axios.put(
        `${server}api/v1/website/${user_id}/`,
        data,
        headers
      );
      if (res?.data?.id) {
        success("تم تحديث الموقع");
      } else {
        console.log("error in create school profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWebsiteLoading(false);
    }
  };

  const [posts, setPosts] = React.useState([]);
  const [postsLoading, setPostsLoading] = React.useState(false);

  const getPosts = async () => {
    setPostsLoading(true);
    try {
      const res = await axios.get(`${server}api/v1/posts/`, headers);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setPostsLoading(false);
    }
  };

  const createPost = async ({ data = {}, getThem = false }) => {
    setPostsLoading(true);
    try {
      const res = await axios.post(`${server}api/v1/posts/`, data, headers);
      if (res.data.id) {
        success("تم انشاء المنشور");
        if (getThem) {
          getPosts();
        }
      } else {
        Object.entries(res.data).forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPostsLoading(false);
    }
  };

  const deletePost = async (id) => {
    setPostsLoading(true);
    try {
      const res = await axios.delete(`${server}api/v1/posts/${id}/`, headers);
      if (res.data.id) {
        success("تم حذف المنشور");
        getPosts();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPostsLoading(false);
    }
  };

  // forms
  const [formTypes, setFormTypes] = React.useState([]);
  const [formTypesLoading, setFormTypesLoading] = useState(false);
  const getFormTypes = async () => {
    setFormTypesLoading(true);
    try {
      const res = await axios.get(`${server}api/v1/form-types/`, headers);
      setFormTypes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFormTypesLoading(false);
    }
  };

  const createFormType = async ({ data = {} }) => {
    setFormTypesLoading(true);
    try {
      const res = await axios.post(
        `${server}api/v1/form-types/`,
        data,
        headers
      );
      if (res.data.id) {
        success("تم انشاء نوع الاستطلاع");
      } else {
        Object.entries(res.data).forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormTypesLoading(false);
    }
  };

  const updateFormType = async ({ data = {}, id = "" }) => {
    setFormTypesLoading(true);
    try {
      const res = await axios.put(
        `${server}api/v1/form-type/${id}/`,
        data,
        headers
      );
      if (res?.data?.id) {
        success("تم تحديث نوع الاستطلاع");
      } else {
        console.log("error in create school profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormTypesLoading(false);
    }
  };

  const deleteFormType = async (id) => {
    setFormTypesLoading(true);
    try {
      const res = await axios.delete(
        `${server}api/v1/form-type/${id}/`,
        headers
      );
      if (res.data.id) {
        success("تم حذف نوع الاستطلاع");
        getFormTypes();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormTypesLoading(false);
    }
  };

  const [forms, setForms] = React.useState([]);
  const [formsLoading, setFormsLoading] = React.useState(false);

  const getForms = async ({}) => {
    setFormsLoading(true);
    try {
      const res = await axios.get(`${server}api/v1/forms/`, headers);
      setForms(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const createForm = async ({ data = {}, setOpen = false }) => {
    setFormsLoading(true);
    try {
      const res = await axios.post(`${server}api/v1/forms/`, data, headers);
      if (res.data.id) {
        success("تم انشاء استطلاع, قم باضافة الحقول المطلوبة");
        if (setOpen) setOpen(false);
        getForms({});
        return await res.data;
      } else {
        Object.entries(res.data).forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const [form, setForm] = React.useState({});
  const getForm = async ({ id = "" }) => {
    setFormsLoading(true);
    try {
      const res = await axios.get(`${server}api/v1/form/${id}/`, headers);
      setForm(res.data);
      return await res.data;
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const updateForm = async ({ data = {}, id = "", setOpen = false }) => {
    setFormsLoading(true);
    try {
      const res = await axios.put(`${server}api/v1/form/${id}/`, data, headers);
      if (res?.data?.id) {
        success("تم تحديث استطلاع");
        if (setOpen) setOpen(false);
        getForms({});
      } else {
        console.log("error in create school profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const deleteForm = async (id) => {
    setFormsLoading(true);
    try {
      const res = await axios.delete(`${server}api/v1/form/${id}/`, headers);
      if (res.data.id) {
        success("تم حذف استطلاع");
        getForms({});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormsLoading(false);
    }
  };

  const [formFields, setFormFields] = React.useState([]);
  const [formFieldsLoading, setFormFieldsLoading] = React.useState(false);

  const getFormFields = async ({ id = "" }) => {
    setFormFieldsLoading(true);
    try {
      const res = await axios.get(
        `${server}api/v1/form-fields/?form=${id}`,
        headers
      );
      setFormFields(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFormFieldsLoading(false);
    }
  };

  const createFormField = async ({ data = {}, setOpen = false }) => {
    setFormFieldsLoading(true);
    try {
      const res = await axios.post(
        `${server}api/v1/form-fields/`,
        data,
        headers
      );
      if (res.data.id) {
        success("تم انشاء حقل الاستطلاع");
        if (setOpen) setOpen(false);
      } else {
        Object.entries(res.data).forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateFormField = async ({ data = {}, id = "", setOpen = false }) => {
    setFormFieldsLoading(true);
    try {
      const res = await axios.put(
        `${server}api/v1/form-field/${id}/`,
        data,
        headers
      );
      if (res?.data?.id) {
        success("تم تحديث حقل الاستطلاع");
        if (setOpen) setOpen(false);
      } else {
        console.log("error in create school profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormFieldsLoading(false);
    }
  };

  const deleteFormField = async (id) => {
    setFormFieldsLoading(true);
    try {
      const res = await axios.delete(
        `${server}api/v1/form-field/${id}/`,
        headers
      );
      if (res.data.id) {
        success("تم حذف حقل الاستطلاع");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormFieldsLoading(false);
    }
  };

  const createFormApplicatipn = async ({ data = {}, setOpen = false }) => {
    setFormFieldsLoading(true);
    try {
      const res = await axios.post(
        `${server}api/v1/form-applications/`,
        data,
        headers
      );
      if (res.data.id) {
        success("تم انشاء استطلاع");
        navigate(`/redirect/`);
      } else {
        Object.entries(res.data).forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // students
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);

  const getStudents = async () => {
    setStudentLoading(true);
    try {
      const res = await axios.get(`${server}api/v1/students/`, headers);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setStudentLoading(false);
    }
  };

  const createStudent = async ({ data = {}, setOpen = false }) => {
    setStudentLoading(true);
    try {
      const res = await axios.post(`${server}api/v1/students/`, data, headers);
      if (res.data.id) {
        success("تم انشاء طالب");
        if (setOpen) setOpen(false);
        getStudents();
      } else {
        Object.entries(res.data).forEach(([key, value]) => {
          error(`${key}: ${value}`);
        });
        console.log("error in create student");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setStudentLoading(false);
    }
  };

  const updateStudent = async ({ data = {}, id = "", setOpen = false }) => {
    setStudentLoading(true);
    try {
      const res = await axios.put(
        `${server}api/v1/student/${id}/`,
        data,
        headers
      );
      if (res?.data?.id) {
        success("تم تحديث طالب");
        if (setOpen) setOpen(false);
        getStudents();
      } else {
        console.log("error in create school profile");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setStudentLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setStudentLoading(true);
    try {
      const res = await axios.delete(`${server}api/v1/student/${id}/`, headers);
      success("تم حذف طالب");
      getStudents();
    } catch (err) {
      console.log(err);
    } finally {
      setStudentLoading(false);
    }
  };

  // form applications
  const [formApplications, setFormApplications] = useState([]);
  const [formAppLoading, setFormAppLoading] = useState(false);

  const getFormApplications = async ({ form = "", phone = "" }) => {
    setFormAppLoading(true);
    try {
      const res = await axios.get(
        `${server}api/v1/form-applications/?form=${form}&phone=${phone}`,
        headers
      );
      setFormApplications(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFormAppLoading(false);
    }
  };

  return (
    <ApiContextProvider.Provider
      value={{
        setApiMessage,
        navigate,
        success,
        error,
        singUp,
        logIn,

        formApplications,
        formAppLoading,
        getFormApplications,

        students,
        studentLoading,
        getStudents,
        createStudent,
        updateStudent,
        deleteStudent,

        createFormApplicatipn,

        formFields,
        formFieldsLoading,
        getFormFields,
        createFormField,
        updateFormField,
        deleteFormField,

        forms,
        formsLoading,
        getForms,
        form,
        getForm,
        createForm,
        updateForm,
        deleteForm,

        formTypes,
        formTypesLoading,
        getFormTypes,
        createFormType,
        updateFormType,
        deleteFormType,

        posts,
        postsLoading,
        getPosts,
        createPost,
        deletePost,

        school,
        profileLoading,
        getSchool,

        student,
        getStudent,

        loading,

        createProfileSuccess,
        createProfile,
        updateProfile,

        website,
        websiteLoading,
        getWebsite,
        updateWebsite,

        // user,

        subjects,
        getSubjects,

        levels,
        getLevels,

        // website,
        // websiteLoading,
        // getWebsite,
        // updateWebsite,

        // schoolProfile,
        // schooProfileLoading,
        // getSchoolProfile,
        // createSchoolProfile,

        // profileLoading,
        // profile,
        // getProfile,

        // loginLoading,
        // logIn,

        // signupLogin,
        // signUp,
      }}
    >
      {children}
    </ApiContextProvider.Provider>
  );
};

export const ApiContextProvider = createContext();
export default ApiContext;
