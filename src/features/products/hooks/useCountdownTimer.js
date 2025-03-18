import { useEffect, useState } from "react";

const useCountdownTimer = (initialTimeInSeconds) => {
  const [timer, setTimer] = useState(initialTimeInSeconds);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const days = Math.max(0, Math.floor(seconds / (24 * 3600)));
    const hours = Math.max(0, Math.floor((seconds % (24 * 3600)) / 3600));
    const minutes = Math.max(0, Math.floor((seconds % 3600) / 60));
    const secs = Math.max(0, seconds % 60);

    return [
      { label: "day", value: days },
      { label: "hrs", value: hours },
      { label: "min", value: minutes },
      { label: "sec", value: secs },
    ];
  };

  return {
    timer,
    formattedTime: formatTime(timer),
  };
};

export default useCountdownTimer;
