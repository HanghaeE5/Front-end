import styled from 'styled-components';
import { Wrapper } from '../element';

export const ScrollWraper = styled(Wrapper)`
  overflow-y: scroll;
  height: 42rem;
`;

export const WarningText = styled.div`
  color: ${({ theme }) => theme.color.grayDark};
  width: 100%;
  font-weight: 400;
  font-family: 'NotoRegu';
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 0.75rem;
`;

export const ImgPreviewSection = styled(Wrapper)`
  margin: 0.75rem 0rem;

  & > div:nth-of-type(2) {
    margin-left: 1rem;
    width: 15rem;
    font-family: 'NotoRegu';
    font-weight: 400;
    color: ${({ theme }) => theme.color.grayDark};
    & div {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
      width: 12rem;
    }
  }
`;

export const ChallangersSection = styled.div`
  background-color: 'white';
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5.875rem;
  border: 3px solid ${({ theme }) => theme.mainColor};
  border-radius: ${({ theme }) => theme.radius};
  margin: 0.5rem;
  justify-content: center;
  align-items: center;

  & span:nth-of-type(1) {
    color: black;
    font-size: 1.25rem;
    padding: 0.5rem;
    font-weight: 700;
  }

  & span:nth-of-type(2) {
    color: black;
    font-size: 0.875rem;
  }
`;
