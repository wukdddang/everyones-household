import { useEffect, useState } from "react";
import Papa from "papaparse";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import HouseHoldTable from "./components/HouseHoldTable/HouseHoldTable";
import { Bar } from "react-chartjs-2";

import "./App.css";

function App() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [csvData, setCsvData] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    Papa.parse("/2024-03.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        setCsvData(data);
        const categories = [...new Set(data.map((item) => item.카테고리))];

        let totalIncome = 0;
        let totalExpense = 0;

        const financials = categories.map((category) => {
          let categoryIncome = 0;
          let categoryExpense = 0;

          data.forEach((item) => {
            if (item.카테고리 === category) {
              const income =
                item.수입 && !isNaN(item.수입.replace(/,/g, ""))
                  ? parseInt(item.수입.replace(/,/g, ""), 10)
                  : 0;
              const expense =
                item.지출 && !isNaN(item.지출.replace(/,/g, ""))
                  ? parseInt(item.지출.replace(/,/g, ""), 10)
                  : 0;

              categoryIncome += income;
              categoryExpense += expense;
            }
          });

          // 여기서 전체 수입과 지출을 계산합니다.
          totalIncome += categoryIncome;
          totalExpense += categoryExpense;

          return categoryIncome - categoryExpense;
        });

        // 여기에서 남은 금액(순수입)을 계산하고 상태를 설정합니다.
        const balance = totalIncome - totalExpense;
        setRemainingAmount(balance);

        setChartData({
          labels: categories,
          datasets: [
            {
              label: "카테고리별 순수입(수입 - 지출)",
              data: financials,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        });
      },
    });
  }, []);

  return (
    <div>
      <HouseHoldTable csvData={csvData} />

      <h1>나의 가계부</h1>
      <Bar
        data={chartData}
        options={{
          scales: { y: { beginAtZero: true } },

          onClick: (event, elements) => {
            if (elements.length === 0) return; // 클릭된 막대가 없을 경우

            const elementIndex = elements[0].index; // 첫 번째 클릭된 요소의 인덱스
            const category = chartData.labels[elementIndex]; // 클릭된 카테고리
            const amount = chartData.datasets[0].data[elementIndex]; // 클릭된 카테고리의 금액

            // 여기에서 필요한 정보를 표시합니다. 예: 콘솔에 출력
            console.log(`카테고리: ${category}, 금액: ${amount}`);

            // 이 정보를 사용하여 모달을 띄우거나 페이지 내의 다른 요소를 업데이트할 수 있습니다.
          },
        }}
      />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>이번 달 남은 금액은</h1>
        <h2
          style={{
            fontSize: "48px",
            color: remainingAmount >= 0 ? "green" : "red",
          }}
        >
          {remainingAmount.toLocaleString()}원
        </h2>
      </div>
    </div>
  );
}

export default App;
