import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import Chart from "../Chart/Chart";
import { FaDollarSign } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import History from "../History/History";

const Dashboard = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    getIncome();
    getExpense();
  }, []);

  const getIncome = async () => {
    const res = await axios.get(BASE_URL + "/get-income");
    setIncome(res?.data?.data);
  };
  const getExpense = async () => {
    const res = await axios.get(BASE_URL + "/get-expense");
    setExpense(res?.data?.data);
  };

  const totalIncome = () => {
    let totalIncome = 0;
    income.forEach((element) => {
      totalIncome += element.amount;
    });
    return totalIncome;
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expense.forEach((element) => {
      totalExpense += element.amount;
    });
    return totalExpense;
  };

  const totalBalance = () => {
    let balance = 0;
    balance = totalIncome() - totalExpense();
    return balance;
  };

  const transactionHistory = () => {
    let history = [...income, ...expense];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.splice(0, 3);
  };

  const minIncome = Math.min(...income.map((item) => item.amount));
  const maxIncome = Math.max(...income.map((item) => item.amount));
  const minExpense = Math.min(...expense.map((item) => item.amount));
  const maxExpense = Math.max(...expense.map((item) => item.amount));

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>Dashboard</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  <FaDollarSign /> {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  <FaDollarSign /> {totalExpense()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  <FaDollarSign /> {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History transactionHistory={transactionHistory} />
            <h2 className="salary-title">
              Min <span>Salary</span> Max
            </h2>
            <div className="salary-item">
              <p>{minIncome >= 0 ? minIncome : 0}</p>
              <p>{maxIncome <= 0 ? 0 : maxIncome}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span> Max
            </h2>
            <div className="salary-item">
              <p>{minExpense >= 0 ? minExpense : 0}</p>
              <p>{maxExpense <= 0 ? 0 : maxExpense}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 3rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
