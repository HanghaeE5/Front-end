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

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const NavBox = styled.div`
  width: 3.6rem;
  height: 3.375rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: #f88181; */
`;

const NavSmallBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 1.25rem;
  margin: 0.7rem auto 0px auto;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const NavFontBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 0.81rem;
  margin: 0.3125rem auto 0.3rem auto;
  cursor: pointer;
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

type font = {
  isCorrect?: boolean;
  isBold?: boolean;
};

const NavFont = styled.p`
  font-size: 0.7rem;

  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  display: flex;
  margin: 0 0 0 0;
`;

export const BottomNavLayout = () => {
  const nav = useNavigate();

  return (
    <BottomNavWrapper>
      <NavRowBox>
        <NavBox>
          <NavSmallBox
            style={{
              backgroundImage: 'url(/assets/nav/homeicon.svg)',
              backgroundSize: '20px',
            }}
            onClick={() => {
              nav('/');
            }}
          ></NavSmallBox>
          <NavFontBox
            onClick={() => {
              nav('/');
            }}
          >
            <NavFont>홈</NavFont>
          </NavFontBox>
        </NavBox>

        <NavBox>
          <NavSmallBox
            style={{
              backgroundImage: 'url(/assets/nav/people.png)',
              backgroundSize: '25px',
            }}
            onClick={() => {
              nav('/community');
            }}
          ></NavSmallBox>
          <NavFontBox
            onClick={() => {
              nav('/community');
            }}
          >
            <NavFont>커뮤니티</NavFont>
          </NavFontBox>
        </NavBox>

        <NavBox>
          <NavSmallBox
            style={{
              backgroundImage: 'url(/assets/nav/to-do.png)',
              backgroundSize: '20px',
            }}
            onClick={() => {
              nav('/todo');
            }}
          ></NavSmallBox>
          <NavFontBox
            onClick={() => {
              nav('/todo');
            }}
          >
            <NavFont>투 두 리스트</NavFont>
          </NavFontBox>
        </NavBox>

        <NavBox>
          <NavSmallBox
            style={{
              backgroundImage: 'url(/assets/nav/friendicon.svg)',
              backgroundSize: '25px',
            }}
            onClick={() => {
              nav('/friendlist');
            }}
          ></NavSmallBox>
          <NavFontBox>
            <NavFont
              onClick={() => {
                nav('/friendlist');
              }}
            >
              친구 목록
            </NavFont>
          </NavFontBox>
        </NavBox>

        <NavBox>
          <NavSmallBox
            style={{
              backgroundImage: 'url(/assets/nav/채팅.png)',
              backgroundSize: '20px',
            }}
            onClick={() => {
              nav('/chatting');
            }}
          ></NavSmallBox>
          <NavFontBox
            onClick={() => {
              nav('/chatting');
            }}
          >
            <NavFont>채팅</NavFont>
          </NavFontBox>
        </NavBox>
      </NavRowBox>
    </BottomNavWrapper>
  );
};
