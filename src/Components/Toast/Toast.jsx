import React from "react";
import styled from "styled-components";

const Toast = ({ message }) => {
  return (
    <ToastStyle className="toast success-toast">
      <span>{message}</span>
    </ToastStyle>
  );
};

const ToastStyle = styled.div`
  position: fixed;
  top: 1rem;
  right: 3rem;
  background-color: #ffffff;
  border-bottom: 5px solid green;
  color: green;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  animation: slideIn 0.3s ease-out;
  z-index: 1000;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export default Toast;
