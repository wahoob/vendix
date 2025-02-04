import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AsyncContentWrapper } from "../../../components";
import { useGetProductsOverviewQuery } from "../productsApiSlice";
import prepareBarChartData from "../utils/prepareBarChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueStatusChart = () => {
  const { isError, isFetching, isLoading, isSuccess, error, data } =
    useGetProductsOverviewQuery();

  const labels = [
    { label: "pay on delivery", value: "payOnDelivery" },
    { label: "paid", value: "paid" },
  ];

  return (
    <AsyncContentWrapper
      error={error}
      isError={isError}
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      render={() => {
        const statistics = prepareBarChartData({
          datasets: [
            { label: "pending", backgroundColor: "rgb(88, 151, 251)" },
            { label: "shipped", backgroundColor: "rgb(119, 200, 130)" },
            { label: "delivered", backgroundColor: "rgb(255, 144, 118)" },
            { label: "cancelled", backgroundColor: "rgb(213, 149, 229)" },
          ],
          data: data.revenueByOrderStatus,
          labels,
        });

        return (
          <Bar
            className="max-w-full max-h-72 sm:max-h-[21.5rem] lg:max-h-[26rem]"
            data={statistics}
            options={{
              maintainAspectRatio: false,
              datasets: { bar: { barThickness: 13 } },
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

export default RevenueStatusChart;
