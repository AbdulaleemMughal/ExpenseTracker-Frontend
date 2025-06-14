import React from "react";
import styled from "styled-components";

const Button = ({ name, icon, bg, bPad, color, bRad }) => {

    const Icon = icon;

  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
    >
      <Icon /> {name}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;

export default Button;
