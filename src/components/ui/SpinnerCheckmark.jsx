import Lottie from "lottie-react";
import loadingSpinner from "../../assets/animation/spinner-animation.json";
import successCheckmark from "../../assets/animation/success-animation.json";
import errorPulse from "../../assets/animation/error-animation.json";
import { Tooltip } from "primereact/tooltip";
import { useRef } from "react";
import { getClassNames } from "../../utils/functions.utils";
import { classNames } from "primereact/utils";

const SpinnerCheckmark = ({ isLoading, isSuccess, isError, error, pt }) => {
  const errorRef = useRef(null);

  let animation;
  if (isLoading) {
    animation = loadingSpinner;
  } else if (isSuccess) {
    animation = successCheckmark;
  } else if (isError) {
    animation = errorPulse;
  }

  return (
    <>
      {isError && (
        <Tooltip
          target={errorRef}
          content={isError && error.data.message}
          mouseTrack
          mouseTrackLeft={10}
          pt={{
            text: { className: "text-xs" },
          }}
        />
      )}
      <div
        className={classNames("w-14", getClassNames(pt, "root"))}
        ref={errorRef}
      >
        <Lottie loop={!isSuccess} animationData={animation} />
      </div>
    </>
  );
};

export default SpinnerCheckmark;