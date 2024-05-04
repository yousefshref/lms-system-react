import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignUp from './pages/authentication/SignUp';
import LogIn from './pages/authentication/LogIn';
import Redirect from './pages/Redirect';
import SchoolProfile from './pages/School/SchoolProfile';
import SchoolWebsite from './pages/School/SchoolWebsite';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/auth/sign-up/" element={<SignUp />} />
      <Route path="/auth/log-in/" element={<LogIn />} />

      <Route path="/redirect/" element={<Redirect />} />


      <Route path="/school/:schoolName/:schoolId/profile/" element={<SchoolProfile />} />
      <Route path="/school/:schoolName/:schoolId/website/" element={<SchoolWebsite />} />

    </Routes>
  );
}

export default App;
