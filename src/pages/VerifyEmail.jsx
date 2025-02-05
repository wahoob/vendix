import { useParams } from "react-router-dom";

import { EmailVerificationSuccess } from "../features/auth";

const VerifyEmail = () => {
  const { code } = useParams();

  return <EmailVerificationSuccess code={code} />;
};

export default VerifyEmail;
