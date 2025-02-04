import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { AsyncContentWrapper } from "../../../components";
import { useGetProductsOverviewQuery } from "../productsApiSlice";
import prepareLineChartData from "../utils/prepareLineChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SaleStatisticsChart = () => {
  const { isError, isFetching, isLoading, isSuccess, error, data } =
    useGetProductsOverviewQuery();

  const additionalData = {
    fill: true,
    tension: 0.25,
  };

  return (
    <AsyncContentWrapper
      error={error}
      isError={isError}
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      render={() => {
        const statistics = prepareLineChartData({
          datasets: [
            {
              label: "Sales",
              data: data.monthlySales,
              borderColor: "rgb(17, 210, 136)",
              backgroundColor: "rgba(17, 210, 136, 0.2)",
            },
            {
              label: "Products",
              data: data.monthlyProducts,
              borderColor: "rgb(46, 121, 215)",
              backgroundColor: "rgba(46, 121, 215, 0.2)",
            },
          ],
          additionalData,
        });

        return (
          <Line
            className="max-w-full max-h-72 sm:max-h-96 lg:max-h-[28.5rem]"
            data={statistics}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    pointStyle: "circle",
                    usePointStyle: true,
                    color: "#787878",
                    font: { weight: 700, family: '"Roboto", sans-serif' },
                  },
                },
              },
            }}
          />
        );
      }}
    />
  );
};

export default SaleStatisticsChart;
