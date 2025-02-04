import dayjs from "dayjs";

const today = dayjs();

const getLastTwelveMonths = () => {
  return Array.from({ length: 12 }).map((_, i) => {
    const date = today.subtract(11 - i, "month");
    return {
      label: date.format("MMM"),
      year: date.year(),
      month: date.month() + 1,
    };
  });
};

export default getLastTwelveMonths;
