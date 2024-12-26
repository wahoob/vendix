import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  const isLoggedIn = Boolean(token);
  let isAdmin = false;
  let isUser = true;
  let isVendor = false;
  let isDelivery = false;
  let username = "guest";

  if (token) {
    const {
      userInfo: { role, username: decodedUsername },
    } = jwtDecode(token);
    isAdmin = role === "admin";
    isUser = role === "user";
    isVendor = role === "vendor";
    isDelivery = role === "delivery";
    username = decodedUsername;
  }

  return { isAdmin, isUser, isDelivery, isVendor, isLoggedIn, username };
};

export default useAuth;
