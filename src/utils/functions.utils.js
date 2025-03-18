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

export const formatShortDate = (date) => {
  return dayjs(date).format("D MMM, YYYY");
};

export const showPrice = (priceInDollar) => {
  if (localStorage.getItem("currency") == "egy")
    return `${(priceInDollar * 50).toFixed(2)}£`;
  else return `$${priceInDollar}`;
};

export const getChangedFields = ({ dirtyFields, data }) => {
  return Object.keys(dirtyFields).reduce((acc, key) => {
    if (dirtyFields[key] && data[key]) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};
