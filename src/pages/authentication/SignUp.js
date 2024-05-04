import React, { useContext } from "react";
import Loading from "../../components/Loading";
import { ApiContextProvider } from "../../context/ApiContext";

const SignUp = () => {
  const apiContext = useContext(ApiContextProvider);

  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div
      style={{ backgroundImage: "url(/images/signup-page.jpg)" }}
      className="p-3 h-[100vh] bg-cover bg-center flex flex-col justify-center"
    >
      {apiContext?.setApiMessage}
      <div className="flex text-center flex-col gap-3 p-3 rounded-xl bg-white w-full max-w-xl mx-auto shadow-lg">
        <h1 className="text-2xl">تسجيل حساب جديد</h1>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            apiContext.singUp({
              username: username?.replace(" ", "_"),
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: password,
            });
          }}
          className="flex flex-col gap-2 text-start"
        >
          <div className="flex flex-col">
            <p>اسم مستخدم نادر</p>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <p>الاسم الاول</p>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <p>الاسم الثاني</p>
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <p>البريد الالكتروني</p>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="flex flex-col">
            <p>كلمة المرور</p>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <hr />
          <div className="flex gap-3">
            <p
              onClick={() => apiContext?.navigate("/auth/log-in/")}
              className="text-sm text-blue-600 cursor-pointer"
            >
              ليس لديك حساب؟
            </p>
          </div>
          {apiContext?.signupLogin ? (
            <button className="btn-primary">
              <Loading />
            </button>
          ) : (
            <button type="submit" className="btn-primary">
              تسجيل
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
