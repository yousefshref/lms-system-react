import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import { ApiContextProvider } from "./context/ApiContext";
import Loading from "./components/Loading";
import Admin from "./pages/Admin/Admin";
import AdminStudents from "./pages/Admin/Students/AdminStudents";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminLevels from "./components/AdminLevels";

function App() {
  const apiContext = useContext(ApiContextProvider);
  return (
    <>
      {apiContext?.setApiMessage}
      {apiContext?.loginLoading ||
      apiContext?.studentsLoading ||
      apiContext?.signUpLoading ||
      apiContext?.usersLoading ? (
        <Loading />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />

        <Route
          path="/admin/"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/students/"
          element={
            <AdminRoute>
              <AdminStudents />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/levels/"
          element={
            <AdminRoute>
              <AdminLevels />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
