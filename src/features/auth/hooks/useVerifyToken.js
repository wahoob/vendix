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
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  useMountEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refetch().unwrap();
      } catch (err) {
        console.error("Error details:", err.message || err.data || err);
      } finally {
        setIsLoading(false);
        setVerificationAttempted(true);
      }
    };

    if (!token && persist) verifyRefreshToken();
    else setIsLoading(false);
  });
  return {
    isLoading:
      (isLoading || isUninitialized) &&
      (!token && persist ? !verificationAttempted : false),
  };
};

export default useVerifyToken;
