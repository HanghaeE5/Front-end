import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BottomNavWrapper = styled.div`
  height: 3.75rem;
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: row;
  align-items: center;
  background-color: #ffffff;
  z-index: 3;
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

const NavBox = styled.div`
  width: 3.125rem;
  height: 2.5625rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  /* background-color: #f88181; */
`;

const NavRowBox = styled.div`
  width: 100%;
  height: 3.375rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
`;

export const BottomNavLayout = () => {
  const nav = useNavigate();

  return (
    <BottomNavWrapper>
      <NavRowBox>
        <NavBox
          style={{
            backgroundImage: 'url(/assets/nav/홈off.svg)',
          }}
          onClick={() => {
            nav('/');
          }}
        ></NavBox>

        <NavBox
          style={{
            backgroundImage: 'url(/assets/nav/커뮤니티off.svg)',
          }}
          onClick={() => {
            nav('/community');
          }}
        ></NavBox>

        <NavBox
          style={{
            backgroundImage: 'url(/assets/nav/투두리스트off.svg)',
          }}
          onClick={() => {
            nav('/todo');
          }}
        ></NavBox>

        <NavBox
          style={{
            backgroundImage: 'url(/assets/nav/친구목록off.svg)',
          }}
          onClick={() => {
            nav('/friendlist');
          }}
        ></NavBox>

        <NavBox
          style={{
            backgroundImage: 'url(/assets/nav/채팅off.svg)',
          }}
          onClick={() => {
            nav('/chatting');
          }}
        ></NavBox>
      </NavRowBox>
    </BottomNavWrapper>
  );
};
