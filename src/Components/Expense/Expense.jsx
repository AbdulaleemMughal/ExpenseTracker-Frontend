import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import Form from "../Form/Form";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import Toast from "../Toast/Toast";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";

const Expense = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: null,
    description: "",
    category: "",
    type: "income",
  });
  const [expenseGetted, setExpenseGetted] = useState([]);

  const getAllExpenses = async () => {
    const res = await axios.get(BASE_URL + "/get-expense");
    setExpenseGetted(res?.data?.data);
    setToastMessage(res.data.message);
  };

  useEffect(() => {
    getAllExpenses().then(() => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    });
  }, []);

  const deleteExpense = async (id) => {
    try {
      await axios.delete(BASE_URL + "/delete-expense/" + id);
      await getAllExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    expenseGetted.forEach((element) => {
      totalIncome += element.amount;
    });

    return totalIncome;
  };

  return (
    <>
      {showToast && <Toast message={toastMessage} />}
      <IncomeStyle>
        <InnerLayout>
          <h1>Expenses</h1>
          <h2 className="total-income">
            Total Expenses: <span>${totalIncome()}</span>
          </h2>
          <div className="income-content">
            <div className="form-container">
              <ExpenseForm getAllExpenses={getAllExpenses} inputState={inputState} setInputState={setInputState} />
            </div>
            <div className="incomes">
              {expenseGetted.map((income) => {
                const { _id, title, amount, date, category, description, type } =
                  income;
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    type={type}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                  />
                );
              })}
            </div>
          </div>
        </InnerLayout>
      </IncomeStyle>
    </>
  );
};

const IncomeStyle = styled.div`
  display: flex;
  overflow: hidden; /* prevents accidental overflow */

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;
    width: 100%;
    height: calc(100vh - 100px); /* adjust based on any top header/footer */

    .form-container {
      width: 300px; /* or whatever fixed width you want */
      flex-shrink: 0; /* prevents it from shrinking */
      position: sticky;
      top: 0;
      align-self: flex-start;
    }

    .incomes {
      flex: 1;
      overflow-y: auto;
      padding-right: 1rem;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

export default Expense;
