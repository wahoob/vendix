import { useRefetchMutation } from "../authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../authSlice";
import { usePersist } from "../../../hooks";
import { useMountEffect } from "primereact/hooks";

const useVerifyToken = () => {
  const token = useSelector(selectCurrentToken);
  const [persist] = usePersist();
  const [refetch, { isLoading }] = useRefetchMutation();

  useMountEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refetch().unwrap();
      } catch (err) {
        console.error("Error details:", err.message || err.data || err);
      }
    };

    if (!token && persist) verifyRefreshToken();
  });

  return { isLoading };
};

export default useVerifyToken;
