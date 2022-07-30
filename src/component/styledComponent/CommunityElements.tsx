import styled from 'styled-components';
import { Wrapper } from '../element';

export const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;

  section:nth-of-type(1) {
    max-height: 10rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  section:nth-of-type(2) {
    background-color: ${({ theme }) => theme.color.grayLight};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ScrollWrapper = styled(Wrapper)`
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SpinnerWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.grayLight};
  color: ${({ theme }) => theme.color.grayLight};
`;
