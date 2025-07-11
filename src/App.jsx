import React, { useMemo, useState } from "react";
import styled from "styled-components";
import bg from "./assets/bg.png";
import { MainLayout } from "./styles/Layout";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expense from "./Components/Expense/Expense";
import { useGlobalContext } from "./context/GlobalContext";

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const App = () => {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expense />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled className="App" bg={bg}>
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <MainStyled>{displayData()}</MainStyled>
      </MainLayout>
    </AppStyled>
  );
};

const MainStyled = styled.main`
  height: 675px;
`;

export default App;
