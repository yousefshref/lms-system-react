import { useContext, useEffect } from "react";
import { ApiContextProvider } from "../../context/ApiContext";

const AdminRoute = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  const user = apiContext?.user;
  const loading = apiContext?.usersLoading;

  useEffect(() => {
    apiContext?.getUser().then((e) => {
      if (!e?.is_superuser && !loading) {
        apiContext?.navigate("/login");
      }
    });
  }, []);

  return children;
};

export default AdminRoute;
