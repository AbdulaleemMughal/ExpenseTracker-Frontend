import React from "react";
import styled from "styled-components";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import Button from "../Button/Button";
import {
  FaTrash,
  FaMoneyBill,
  FaLaptopCode,
  FaBitcoin,
  FaRegIdCard,
  FaYoutube,
  FaBook,
  FaBriefcaseMedical,
  FaTv,
  FaMinusCircle,
} from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa6";
import { BsPiggyBankFill } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";
import { RiTakeawayFill } from "react-icons/ri";
import { MdOutlineTravelExplore } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { dateFormatter } from "../../utils/formatDate";

const IncomeItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) => {
  const incomeCategoryIcon = (category) => {
    switch (category) {
      case "salary":
        return <FaMoneyBill />;
      case "freelancing":
        return <FaLaptopCode />;
      case "investments":
        return <AiOutlineStock />;
      case "stocks":
        return <FaUserTie />;
      case "bitcoin":
        return <FaBitcoin />;
      case "bank":
        return <FaRegIdCard />;
      case "youtube":
        return <FaYoutube />;
      case "other":
        return <BsPiggyBankFill />;
      default:
        return null;
    }
  };

  const expenseCategoryIcon = (category) => {
    switch (category) {
      case "education":
        return <FaBook />;
      case "groceries":
        return <IoFastFoodSharp />;
      case "health":
        return <FaBriefcaseMedical />;
      case "subscriptions":
        return <FaTv />;
      case "takeaways":
        return <RiTakeawayFill />;
      case "clothing":
        return <GiClothes />;
      case "travelling":
        return <MdOutlineTravelExplore />;
      case "other":
        return <FaMinusCircle />;
      default:
        return "";
    }
  };

  return (
    <IncomeItemStled indicator={indicatorColor}>
      <div className="icon" style={{ fontSize: "2.5rem" }}>
        {type === "expense"
          ? expenseCategoryIcon(category)
          : incomeCategoryIcon(category)}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              <FaDollarSign /> {amount}
            </p>
            <p>
              <FaCalendarAlt /> {dateFormatter(date)}
            </p>
            <p>
              <FaCommentDots /> {description}
            </p>
          </div>
          <div className="btn-con" onClick={() => deleteItem(id)}>
            <Button
              icon={FaTrash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
            />
          </div>
        </div>
      </div>
    </IncomeItemStled>
  );
};

const IncomeItemStled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }
    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
