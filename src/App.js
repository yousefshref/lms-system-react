import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/authentication/SignUp";
import LogIn from "./pages/authentication/LogIn";
import Redirect from "./pages/Redirect";
import SchoolProfile from "./pages/School/SchoolProfile";
import SchoolWebsite from "./pages/School/SchoolWebsite";
import ChooseProfile from "./components/ChooseProfile";
import SchoolPosts from "./pages/School/SchoolPosts";
import SchoolForms from "./pages/School/SchoolForms";
import FormDetails from "./components/FormDetails";
import SchoolStudents from "./pages/School/SchoolStudents";
import AuthWithPhone from "./pages/AuthWithPhone";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />

      {/* <Route path="/auth/sign-up/" element={<SignUp />} /> */}
      <Route path="/auth/log-in/" element={<LogIn />} />
      <Route path="/auth/with-phone/" element={<AuthWithPhone />} />

      <Route path="/redirect/" element={<Redirect />} />

      <Route path="/check-profile/" element={<ChooseProfile />} />

      <Route
        path="/school/:schoolName/:schoolId/profile/"
        element={<SchoolProfile />}
      />

      <Route
        path="/school/:schoolName/:schoolId/"
        element={<SchoolWebsite />}
      />

      <Route
        path="/school/:schoolName/:schoolId/posts/"
        element={<SchoolPosts />}
      />

      <Route
        path="/school/:schoolName/:schoolId/forms/"
        element={<SchoolForms />}
      />
      <Route path="/form/:formId/" element={<FormDetails />} />

      <Route
        path="/school/:schoolName/:schoolId/students/"
        element={<SchoolStudents />}
      />
    </Routes>
  );
}

export default App;
