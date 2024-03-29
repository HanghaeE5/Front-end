import styled from 'styled-components';
import { Wrapper } from '../element';

export const ScrollWraper = styled(Wrapper)`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const WarningText = styled.div`
  color: ${({ theme }) => theme.color.grayDark};
  width: 100%;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 0.75rem;
`;

export const ImgPreviewSection = styled(Wrapper)`
  margin: 0.75rem 0rem;

  & > div:nth-of-type(1) {
    border: 1px solid green;
    margin-left: 1rem;
    width: 14rem;
    color: ${({ theme }) => theme.color.grayDark};
    & div {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
      width: 11rem;
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
  cursor: pointer;

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

export const ImgButton = styled.div`
  cursor: pointer;
  width: 78px;
  height: 1.625rem;
  color: #dddddd;
  background: #f6f6f6;
  border: 1px solid #dddddd;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  gap: 10px;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12.5px;
  line-height: 18px;
  color: #888888;
`;
