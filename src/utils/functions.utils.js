import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const convertDateToSeconds = (initialTime) => {
  return Math.floor((new Date(initialTime) - new Date()) / 1000);
};

export const getClassNames = (partClassNames = {}, part) => {
  return partClassNames[part] || "";
};

export const getTimeToNow = (date) => {
  return dayjs().to(dayjs(date));
};
