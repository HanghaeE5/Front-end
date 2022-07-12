import styled from 'styled-components';
import { Wrapper } from '../element';

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
  border: ${({ done, theme }) => (done ? `1px solid ${theme.color.grayMedium}` : `3px solid ${theme.mainColor}`)};
  height: 5.625rem;
  border-radius: ${({ theme }) => theme.radius};
  margin: 0.5rem 0;
  color: ${({ done, theme }) => (done ? theme.color.grayMedium : 'black')};

  & > svg:nth-of-type(1) {
    margin: 0.5rem;
    color: ${({ done, theme }) => (done ? theme.color.grayMedium : theme.mainColor)};
    font-size: 4rem;
  }

  & > svg:nth-of-type(2) {
    margin: 0.5rem;
    color: ${({ done, theme }) => (done ? theme.color.grayMedium : theme.mainColor)};
    font-size: 1.5rem;
  }

  & > div > div > svg {
    font-size: 0.5rem;
    position: relative;
    bottom: 25%;
    margin-left: 0.25rem;
  }
`;

export const TodoLabel = styled.span<{ done: boolean }>`
  position: absolute;
  right: ${({ done }) => (done ? '-0.3rem' : ' -0.35rem')};
  top: ${({ done }) => (done ? '0rem' : ' -0.25rem')};

  background-color: ${({ done, theme }) => (done ? theme.color.grayMedium : theme.mainColor)};
  color: ${({ done }) => (done ? 'white' : 'black')};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  font-weight: ${({ done }) => (done ? 400 : 700)};
  border-radius: 0px 6px;
`;

export const TodoListWrapper = styled(Wrapper)`
  height: 25rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
