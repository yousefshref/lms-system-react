import React, { useContext } from "react";
import { ApiContextProvider } from "../../context/ApiContext";

const Login = () => {
  const apiContext = useContext(ApiContextProvider);

  const [auth, setAuth] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex min-h-[100vh] from-white to-indigo-100 bg-gradient-to-br flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          قم بالتسجيل بحسابك معنا
        </h2>
        <small className="text-center text-red-500 flex justify-center  ">
          يجب عليك ان تكون مسجل لدينا اولا
        </small>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            apiContext.LogIn({ auth: auth, password: password });
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              رقم الهاتف او بريدك الالكتروني
            </label>
            <div className="mt-2">
              <input
                id="auth"
                name="auth"
                type="auth"
                autoComplete="auth"
                required
                value={auth}
                onChange={(e) => setAuth(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                كلمة المرور
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  نسيت كلمة السر ؟
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          لست مسجل لدينا{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            يمكنك اخبارنا...
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
