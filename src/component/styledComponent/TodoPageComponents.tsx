import styled from 'styled-components';
import { Wrapper } from '../element';

// TODO : 다른데서어떻게 쓰는지 확인하고 지우던지 옮기던지
export const ContentWrapper = styled.div`
  height: 100%;
  section:nth-of-type(1) {
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  section:nth-of-type(2) {
    overflow-y: scroll;
    height: 100%;
    background-color: ${({ theme }) => theme.color.grayLight};
  }
`;

export const TodoItemWrapper = styled(Wrapper)<{ done: boolean }>`
  position: relative;
  border-radius: ${({ theme }) => theme.radius};
  margin: 0.5rem 0;
  padding: 1.5rem 1.25rem 1.5rem 1.25rem;
  color: ${({ done, theme }) => (done ? theme.color.grayMedium : 'black')};
  border: ${({ done, theme }) => (done ? `1px solid ${theme.color.grayMedium}` : `3px solid ${theme.mainColor}`)};
  justify-content: space-between;

  & > svg:nth-of-type(1) {
    padding: 0;
    color: ${({ done, theme }) => (done ? theme.color.grayMedium : theme.mainColor)};
    cursor: ${({ done }) => (done ? 'auto' : 'pointer')};
  }

  & > svg:nth-of-type(2) {
    text-align: right;
    margin: 0.5rem;
    font-size: 1.75rem;
    color: ${({ done, theme }) => (done ? theme.color.grayMedium : 'black')};
  }

  & svg {
    cursor: pointer;
  }

  // dot
  & > div > div > svg {
    font-size: 0.5rem;
    position: relative;
    bottom: 25%;
    margin-left: 0.25rem;
    cursor: auto;
  }
`;

export const TodoTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  line-height: 22px;
`;

export const TodoLabel = styled.span<{ done: boolean }>`
  position: absolute;
  right: ${({ done }) => (done ? '-1px' : ' -3px')};
  top: ${({ done }) => (done ? '-1px' : ' -3px')};

  background-color: ${({ done, theme }) => (done ? theme.color.grayMedium : theme.mainColor)};
  color: ${({ done }) => (done ? 'white' : 'black')};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  font-weight: ${({ done }) => (done ? 400 : 700)};
  border-radius: 0px 6px;
`;

export const ScrollWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 6rem 1rem;
  align-items: start;
  position: relative;
  overflow-y: scroll;
  justify-content: start;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
`;

export const SpinnerWrapper = styled.div`
  background-color: white;
  color: white;
`;
