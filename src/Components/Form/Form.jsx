import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import Toast from "../Toast/Toast";
import { FaPlus } from "react-icons/fa6";
import Button from "../Button/Button";

const Form = ({ inputState, setInputState, getAllIncomes }) => {
  const { title, amount, date, category, description } = inputState;
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleInput = (value, name) => {
    setInputState({ ...inputState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome();
  };

  const addIncome = async () => {
    try {
      const payload = {
        ...inputState,
        amount: Number(inputState.amount),
        date: inputState.date?.toISOString() || "",
        type: "income",
      };

      const response = await axios.post(BASE_URL + "/add-income", payload);
      setToastMessage(response?.data?.message);
      await getAllIncomes();
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      setInputState({
        title: "",
        amount: "",
        date: null,
        description: "",
        category: "",
      });
    } catch (err) {
      setErrorMessage(err?.response?.data?.message);
      // console.log(err?.response?.data?.message);
    }
  };

  return (
    <>
      <FormStyled onSubmit={handleSubmit}>
        <div className="input-control">
          <input
            type="text"
            name="title"
            placeholder="Enter the Title"
            value={title}
            onChange={(e) => handleInput(e.target.value, "title")}
          />
        </div>
        <div className="input-control">
          <input
            type="number"
            name="amount"
            placeholder="Salary Amount"
            value={amount}
            onChange={(e) => handleInput(e.target.value, "amount")}
          />
        </div>
        <div className="input-control">
          <DatePicker
            id="date"
            placeholderText="Enter A Date"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              setInputState({ ...inputState, date: date });
            }}
          />
        </div>
        <div className="selects input-control">
          <select
            required
            value={category}
            name="category"
            id="category"
            placeholder="Enter the Description"
            onChange={(e) => handleInput(e.target.value, "category")}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="salary">Salary</option>
            <option value="freelancing">Freelancing</option>
            <option value="investments">Investiments</option>
            <option value="stocks">Stocks</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="bank">Bank Transfer</option>
            <option value="youtube">Youtube</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-control">
          <textarea
            name="description"
            cols="30"
            rows="4"
            placeholder="Add A Reference"
            value={description}
            onChange={(e) => handleInput(e.target.value, "description")}
          ></textarea>
        </div>
        <p>{errorMessage}</p>
        <div className="submit-btn">
          <Button
            name={"Add Income"}
            icon={FaPlus}
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-accent"}
            color={"#ffffff"}
          />
        </div>
      </FormStyled>
      {showToast && <Toast message={toastMessage} />}
    </>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  p {
    color: red;
    padding-left: 1rem;
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default Form;
