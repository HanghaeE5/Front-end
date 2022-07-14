import styled, { keyframes } from 'styled-components';
import { Button, Wrapper } from '../element';

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const Background = styled.div`
  background-color: black;
  opacity: 0.65;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

// TODO : Modal 중복많아서 하나도 빼보기
export const Slide = keyframes`
    0% {
        transform: translateY(20%);
    }

    100% {
        transform: translateY(0);
    }
`;

export const TodoContents = styled.div`
  height: 39rem;
  bottom: 0;
  width: 100%;
  position: absolute;
  background-color: white;
  border-radius: 20px 20px 0 0;
  animation: ${Slide} 0.6s ease;
`;

export const HeaderTitle = styled(Wrapper)`
  font-size: 1.25rem;
  font-weight: 700;

  & > svg {
    font-size: 1.5rem;
  }
`;
export const CategoryWrapper = styled.div<{ isSelect: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin: 0 0.5rem;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme, isSelect }) => (isSelect ? 'black' : theme.color.grayMedium)};
    border-radius: ${({ theme }) => theme.radius};    
    width: 4.375rem;
    height: 4.375rem;
  }

  & > span {
    margin: 0.25rem;
    text-align: center;
    font-family: NotoLight';
    font-size: 0.813rem;
  }
`;

export const CategorySection = styled(Wrapper)`
  border-top: 0.5rem solid ${({ theme }) => theme.color.grayLight};
  border-bottom: 0.5rem solid ${({ theme }) => theme.color.grayLight};
  padding: 1rem 0;

  & > span {
    margin: 0 0 1rem 1rem;
  }

  & > div {
    width: 100%;
    overflow-x: scroll;
    display: flex;
    padding: 0.5rem;
  }
`;
export const CalendarWrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  position: fixed;
  bottom: 8rem;
  left: 2rem;
  box-shadow: 0px 3px 10px -4px rgba(0, 0, 0, 0.77);
`;
export const StickyButton = styled(Button)`
  position: absolute;
  bottom: 3.375rem;
`;
