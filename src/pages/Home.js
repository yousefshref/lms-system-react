import React, { useContext } from "react";
import { FiVideo } from "react-icons/fi";
import { GrTechnology } from "react-icons/gr";
import { IoLockOpenOutline } from "react-icons/io5";
import { ApiContextProvider } from "../context/ApiContext";

const Home = () => {
  const apiContext = useContext(ApiContextProvider);
  const features = [
    {
      id: 1,
      icon: <GrTechnology />,
      title: "التكامل التكنولوجي",
      description:
        "نهتم بتصميم برامج متكاملة حديثة لكل مستوي دراسي للمساعدة في التعلم بشكل افضل.",
    },
    {
      id: 2,
      icon: <FiVideo />,
      title: "كورسات مجانية",
      description:
        "كورسات مجانية لكل مستوي دراسي شاملة الدراسة والتعلم في الدراسة او غيرها!.",
    },
    {
      id: 3,
      icon: <IoLockOpenOutline />,
      title: "سهولة الوصول والحماية",
      description:
        "يمكن للطالب او ولي امره الوصول الي البيانات الخاصه بيه في اي وقت.",
    },
  ];
  return (
    <div className="flex flex-col">
      <header className="hidden md:flex w-full flex-row justify-between p-3 rounded-xl bg-white">
        <div className="my-auto w-1/3 justify-center flex flex-row gap-5">
          <button
            onClick={() => apiContext.navigate("/login")}
            className="btn-blue"
          >
            تسجيل كطالب
          </button>
        </div>
        <div className="my-auto w-1/3 justify-center">
          <img
            className="w-32 mx-auto"
            src="/images/logo.png"
            alt="school logo"
          />
        </div>
        <div className="my-auto w-1/3 justify-center flex flex-row gap-5">
          <button>الرئيسية</button>
          <button>عننا</button>
          <button>مشاريعنا</button>
          <button>كورسات</button>
        </div>
      </header>

      <header className="flex gap-3 md:hidden w-full flex-col justify-between p-3 rounded-xl bg-white">
        <div className="my-auto md:w-1/3 justify-center">
          <img
            className="w-32 mx-auto"
            src="/images/logo.png"
            alt="school logo"
          />
        </div>
        <div className="my-auto md:w-1/3 justify-center flex flex-row gap-5">
          <button>الرئيسية</button>
          <button>عننا</button>
          <button>مشاريعنا</button>
          <button>كورسات</button>
        </div>
        <div className="my-auto md:w-1/3 mt-2 justify-center flex flex-row gap-5">
          <button className="btn-blue">تسجيل كطالب</button>
        </div>
      </header>

      <div
        className="p-3 bg-cover bg-fixed h-[70vh] bg-center relative"
        style={{ backgroundImage: "url(/images/hero_image.jpg)" }}
      >
        <div className="absolute top-0 right-0 w-full h-full bg-black opacity-50"></div>
        <div className="flex h-full z-50 flex-col gap-3 justify-center">
          <h1 className="md:text-5xl text-3xl z-50 font-bold text-center text-white">
            مرحبا بكم في المدرسة
          </h1>
          <h2 className="md:text-3xl text-xl z-50 font-bold text-center text-white">
            نحن نعمل على تطوير وتحسين مدرستك
          </h2>
          <div className="w-full flex justify-center">
            <button className="btn-blue z-50 ">جميع الكورسات</button>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className="w-full flex sm:flex-row flex-col gap-5 justify-around p-5">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="felx flex-col gap-2 p-2 py-7 rounded-xl transition-all hover:shadow-lg w-full sm:max-w-xs text-center from-white to-indigo-50 shadow-md bg-gradient-to-br"
          >
            <span className="text-7xl flex justify-center">{feature.icon}</span>
            <b>{feature.title}</b>
            <p className="text-xs text-zinc-500">{feature.description} </p>
          </div>
        ))}
      </div>

      <br />
      <br />
      <br />

      <div className="w-full flex flex-col gap-5 justify-around md:p-5 p-2">
        <div className="w-full p-5 bg-white rounded-xl flex md:flex-row flex-col justify-between">
          <div className="md:w-1/2 text-center md:text-start w-full flex flex-col justify-center gap-6">
            <h1 className="text-3xl font-bold">نبذه سريعة عنا.</h1>
            <p className="text-zinc-500">
              تمتاز مدرستنا بتقديم بيئة تعليمية ملهمة ومتنوعة، حيث نسعى جاهدين
              لتطوير قدرات طلابنا وتعزيز مهاراتهم الأكاديمية والشخصية. نحن نلتزم
              بتوفير برامج تعليمية مبتكرة وشاملة، تدعم التعلم النشط وتشجع على
              التفكير الإبداعي.
            </p>
            <div className="w-full flex md:justify-start justify-center">
              <button className="btn-blue w-full max-w-[200px] flex flex-row justify-center">
                المزيد
              </button>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-row justify-center">
            <img
              src="/images/about_us.jpg"
              className="rounded-xl mx-auto sm:w-1/2 md:w-full w-full"
              alt="hero image"
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className="w-full flex flex-col gap-5 p-5">
        <div className="w-full p-3 bg-white shadow-md rounded-xl flex flex-col gap-4">
          <h1 className="text-3xl font-bold flex justify-center">
            اخر الكورسات
          </h1>
          <div className="flex flex-row gap-5 overflow-x-scroll max-w-full p-5 rounded-xl from-indigo-300 to-indigo-500 bg-gradient-to-br">
            <div
              style={{ minWidth: "300px", maxWidth: "300px" }}
              className="flex flex-col p-3 rounded-xl from-white to-indigo-100 bg-gradient-to-tr"
            >
              <img
                className="rounded-xl"
                src="https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
                alt="course"
              />
              <h1 className="text-xl font-bold mt-2">اسم الكورس</h1>
              <p>نوع الكورس</p>
              <p className="text-zinc-600 text-xs mt-2">
                وصف بسيط لا يتعدي مثلا السطرين او من الممكن ان يكون اكثر من ذلك
                لكن سوف يتم اقتصصاصة
              </p>
              <button className="w-full mt-4 btn-blue">المزيد</button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <footer className="text-center p-5 flex flex-col gap-2">
        <p className="text-zinc-500">
          جميع الحقوق محفوظة لمدرستنا © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Home;
