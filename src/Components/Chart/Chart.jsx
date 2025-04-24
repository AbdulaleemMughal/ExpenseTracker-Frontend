import React, { useEffect, useState } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { dateFormatter } from "../../utils/formatDate";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const getIncome = async () => {
    const res = await axios.get(BASE_URL + "/get-income");
    setIncome(res?.data?.data);
  };

  const getExpense = async () => {
    const res = await axios.get(BASE_URL + "/get-expense");
    setExpense(res?.data?.data);
  };

  useEffect(() => {
    getIncome();
    getExpense();
  }, []);

  const data = {
    labels: income.map((inc) => {
      const { date } = inc;
      return dateFormatter(date);
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...income.map((inc) => {
            const { amount } = inc;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2
      },
      {
        label: "Expense",
        data: [
          ...expense.map((exp) => {
            const { amount } = exp;
            return amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2 
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
