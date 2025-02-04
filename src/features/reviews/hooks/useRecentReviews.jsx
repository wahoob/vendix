import dayjs from "dayjs";

const useRecentReviews = (reviews) => {
  return reviews.reduce((acc, { createdAt, updatedAt, user }) => {
    const creationDate = dayjs(createdAt);
    const updateDate = dayjs(updatedAt);

    const latestDate = updateDate.isAfter(creationDate)
      ? updateDate
      : creationDate;
    const formattedDate = latestDate.format("D MMM");

    const action = updateDate.isAfter(creationDate)
      ? "updated his review"
      : "created a new review";

    acc.push({
      date: formattedDate,
      text: `${user?.username || "Unknown"} has ${action}.`,
    });

    return acc;
  }, []);
};

export default useRecentReviews;
