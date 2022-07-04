import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TopNavWrapper = styled.nav`
  height: 3.75rem;
  width: 100%;
  display: flex;
  justify-content: row;
  align-items: center;
  background-color: #a1e1ec;
  border-bottom: 1px solid #dddddd;

  span {
    font-size: 1.25rem;
    font-family: 'OpensansBold';
  }

  svg {
    position: absolute;
    left: 20px;
    font-size: 1.25rem;
    cursor: pointer;
  }
`;

export const TopNavBar = () => {
  const nav = useNavigate();

  return (
    <TopNavWrapper
      style={{
        backgroundImage: 'url(/assets/Header.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    ></TopNavWrapper>
  );
};
