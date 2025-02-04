import getLastTwelveMonths from "../utils/getLastTwelveMonths";

const prepareLineChartData = ({ datasets, additionalData }) => {
  const lastTwelveMonths = getLastTwelveMonths();

  const labels = lastTwelveMonths.map(({ label }) => label);

  const datasetsWithData = datasets.map(({ data: dataEntry, ...rest }) => {
    const data = lastTwelveMonths.map(({ year, month }) => {
      const existingEntry = dataEntry.find(
        (entry) => entry.year === year && entry.month === month
      );
      return existingEntry ? existingEntry.total : 0;
    });

    return {
      ...rest,
      ...additionalData,
      data,
    };
  });

  return {
    labels,
    datasets: datasetsWithData,
  };
};

export default prepareLineChartData;
