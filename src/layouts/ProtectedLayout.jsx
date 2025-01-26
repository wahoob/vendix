import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const ProtectedLayout = ({
  allowedRoles,
  preventAccessWhenLoggedIn = false,
}) => {
  const { isLoggedIn, isAdmin, isDelivery, isUser, isVendor } = useAuth();

  if (preventAccessWhenLoggedIn && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isLoggedIn && !preventAccessWhenLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  const roles = {
    user: isUser,
    vendor: isVendor,
    delivery: isDelivery,
    admin: isAdmin,
  };

  const hasPermission = allowedRoles
    ? allowedRoles.some((role) => roles[role])
    : true;

  // TODO: create page for unauthorized access and navigate to that page
  if (!hasPermission) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
