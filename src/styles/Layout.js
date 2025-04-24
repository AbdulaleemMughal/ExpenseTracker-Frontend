import styled from "styled-components";

export const MainLayout = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  gap: 2rem;
`;

export const InnerLayout = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;
  height: 675px;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: #f0f0f0;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  scrollbar-width: thin;
  scrollbar-color: #888 #f0f0f0;
`;
