import { useSelector } from "react-redux";
import { useMountEffect } from "primereact/hooks";
import { useState } from "react";

import { useRefetchMutation } from "../authApiSlice";
import { usePersist } from "../../../hooks";
import { selectCurrentToken } from "../authSlice";

const useVerifyToken = () => {
  const token = useSelector(selectCurrentToken);
  const [persist] = usePersist();
  const [refetch, { isUninitialized }] = useRefetchMutation();
  const [isLoading, setIsLoading] = useState(true);

  useMountEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refetch().unwrap();
      } catch (err) {
        console.error("Error details:", err.message || err.data || err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!token && persist) verifyRefreshToken();
  });

  return { isLoading: isLoading || isUninitialized };
};

export default useVerifyToken;
