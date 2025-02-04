const prepareBarChartData = ({ datasets, data, labels }) => ({
  labels: labels.map(({ label }) => label),
  datasets: datasets.map((dataset) => ({
    ...dataset,
    data: labels.map(({ value }) =>
      data.reduce((acc, { total, orderStatus, paymentStatus }) => {
        if (paymentStatus === value && orderStatus === dataset.label)
          acc += total;

        return acc;
      }, 0)
    ),
  })),
});

export default prepareBarChartData;
