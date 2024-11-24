export const convertDateToSeconds = (initialTime) => {
  return Math.floor((new Date(initialTime) - new Date()) / 1000);
};

export const getClassNames = (partClassNames = {}, part) => {
  return partClassNames[part] || "";
};
