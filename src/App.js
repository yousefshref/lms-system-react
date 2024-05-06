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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />

      <Route path="/auth/sign-up/" element={<SignUp />} />
      <Route path="/auth/log-in/" element={<LogIn />} />

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
    </Routes>
  );
}

export default App;
