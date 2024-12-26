import { useParams } from "react-router-dom";
import EmailVerificationSuccess from "../features/auth/components/EmailVerificationSuccess";

const VerifyEmail = () => {
  const { code } = useParams();

  return <EmailVerificationSuccess code={code} />;
};

export default VerifyEmail;
