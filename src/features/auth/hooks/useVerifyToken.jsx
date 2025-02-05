import { useSelector } from "react-redux";
import { useMountEffect } from "primereact/hooks";

import { useRefetchMutation } from "../authApiSlice";
import { usePersist } from "../../../hooks";
import { selectCurrentToken } from "../authSlice";

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
