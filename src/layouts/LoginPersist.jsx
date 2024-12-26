import { Outlet } from "react-router-dom";
import useVerifyToken from "../features/auth/hooks/useVerifyToken";

const LoginPersist = () => {
  const { isLoading } = useVerifyToken();

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default LoginPersist;
