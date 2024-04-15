import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import HouseHold from "./components/HouseHold/HouseHold";
import { Bar } from "react-chartjs-2";

import "./App.css";
import useHousehold from "./hooks/useHousehold";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./common/components/ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "지출",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "수입",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [selectedMonth, setSelectedMonth] = useState("");
  const today = new Date();
  const year = today.getFullYear();

  // 초기 설정으로 현재 월을 선택
  const initialMonth = today.getMonth() + 1; // getMonth는 0-11을 반환하므로 1을 추가
  const [formattedMonth, setFormattedMonth] = useState(
    `${year}-${initialMonth.toString().padStart(2, "0")}`
  );
  const context = useHousehold({ date: formattedMonth });
  // console.log(context);

  // 월 선택 드롭다운에서 사용할 월 목록 생성
  const months = Array.from({ length: 12 }, (_, i) =>
    `${i + 1}`.padStart(2, "0")
  );

  useEffect(() => {
    if (!context.isLoading) {
      const categoryAmountMap = {};

      context.data.forEach((item) => {
        const category = item.category;
        const expense = parseInt(item.expense, 10) || 0;
        const income = parseInt(item.income, 10) || 0;

        // 기존 값에 지출은 빼고 수입은 더함으로써 한 카테고리 내에서 처리
        categoryAmountMap[category] =
          (categoryAmountMap[category] || 0) - expense + income;
      });

      const labels = Object.keys(categoryAmountMap);
      const amountData = labels.map((label) => categoryAmountMap[label]);

      setChartData({
        labels,
        datasets: [
          {
            label: "수입/지출",
            data: amountData,
            backgroundColor: labels.map((label) =>
              categoryAmountMap[label] >= 0
                ? "rgba(75, 192, 192, 0.5)"
                : "rgba(255, 99, 132, 0.5)"
            ),
            borderColor: labels.map((label) =>
              categoryAmountMap[label] >= 0
                ? "rgba(75, 192, 192, 1)"
                : "rgba(255, 99, 132, 1)"
            ),
            borderWidth: 1,
          },
        ],
      });
    }
  }, [context.data, context.isLoading]);

  // Select 컴포넌트에서 월을 변경할 때마다 실행
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    setFormattedMonth(`${year}-${newMonth}`);
  };

  if (context.isFetching) {
    return <div>Loading...</div>;
  } else if (context.isError) {
    return <div>Error: {context.error.message}</div>;
  }

  return (
    <div>
      <HouseHold csvData={context.data} />
      <Select
        value={selectedMonth}
        onValueChange={handleMonthChange}
        placeholder="월 선택"
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month" disabled>
            월 선택
          </SelectItem>
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              {month}월
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <h1 className="text-[20px] font-bold text-left tracking-[-0.1em]">
        나의 가계부
      </h1>
      <Bar
        data={chartData}
        height={100}
        options={{
          onClick: (event, elements) => {
            if (elements.length === 0) {
              return;
            }
            const datasetIndex = elements[0].datasetIndex;
            const elementIndex = elements[0].index;
            const category = chartData.labels[elementIndex];
            const amount = chartData.datasets[datasetIndex].data[elementIndex];
            console.log(`카테고리: ${category}, 금액: ${amount}`);
          },
        }}
      />
    </div>
  );
}

export default App;
