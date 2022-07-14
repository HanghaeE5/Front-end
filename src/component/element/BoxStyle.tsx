import styled, { StyledFunction } from 'styled-components';

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isSide?: boolean;
  isCursor?: boolean;
  isAlignSide?: boolean;
  isContentSide?: boolean;
  color?: string;
  url?: string;
  direction?: string;
  isPadding?: string;
  rowGap?: string;
  columnGap?: string;
  border?: string;
  borderRadius?: string;
  helfBorder?: boolean;
  backgroundsize?: string;
  backgroundColor?: string;
};

export const EvBox = styled.div`
  display: flex;
  flex-direction: ${(props: box) => (props.direction ? props.direction : 'column')};
  align-items: ${(props: box) => (props.isAlignSide ? '' : 'center')};
  justify-content: ${(props: box) => (props.isContentSide ? '' : 'center')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  row-gap: ${(props: box) => props.rowGap};
  column-gap: ${(props: box) => props.columnGap};
  border: ${(props: box) => props.border};
  border-radius: ${(props: box) => props.borderRadius};
  border-top-right-radius: ${(props: box) => (props.helfBorder ? '6px' : '1px solid #dddddd')};
  border-bottom-right-radius: ${(props: box) => (props.helfBorder ? '6px' : '1px solid #dddddd')};
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  background-image: ${(props: box) => props.url};
  background-repeat: no-repeat;
  background-size: ${(props: box) => (props.backgroundsize ? props.backgroundsize : 'center')};
  background-position: center;
  background-color: ${(props: box) => (props.backgroundColor ? props.backgroundColor : '#fcbfbf')};
`;

export const EvInputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: ${(props: box) => (props.helfBorder ? 'none' : '1px solid #dddddd')};
  border-top-left-radius: ${(props: box) => (props.helfBorder ? '6px' : '1px solid #dddddd')};
  border-bottom-left-radius: ${(props: box) => (props.helfBorder ? '6px' : '1px solid #dddddd')};
  border-radius: 6px;
  padding: ${(props: box) => (props.isPadding ? props.isPadding : '0 0 0 10px')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: #fffbe9;
  }
`;

type btnable = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isDisable?: boolean;
  background?: string;
  border?: string;
};

export const EvBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${(props: btnable) => (props.border ? props.border : '1px solid #dddddd')};
  border-radius: 6px;
  width: ${(props: btnable) => props.width};
  height: ${(props: btnable) => props.height}rem;
  margin: ${(props: btnable) => props.margin};
  background: ${(props: btnable) => (props.background ? props.background : '')};
  cursor: ${(props: btnable) => (props.isDisable ? '' : 'pointer')};
`;

export const EvBtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${(props: btnable) => (props.border ? props.border : '1px solid #dddddd')};
  border-radius: 6px;
  width: ${(props: btnable) => props.width};
  height: ${(props: btnable) => props.height}rem;
  margin: ${(props: btnable) => props.margin};
  background: ${(props: btnable) => (props.isDisable ? '#F7F7F7' : '#FFD600')};
  cursor: ${(props: btnable) => (props.isDisable ? '' : 'pointer')};
  /* &:hover {
    ${(props: btnable) =>
    props.isDisable
      ? ''
      : `color: white;
    background-color: #358edc;`}
  } */
`;

type font = {
  size?: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
  isDisable?: boolean;
  align?: string;
  weight?: number;
  lineHeight?: string;
};

export const EvKoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => (props.color ? props.color : '#1A1A1A')};
  display: flex;
  font-weight: ${(props: font) => (props.weight ? props.weight : 400)};
  text-align: ${(props: font) => (props.align ? props.align : '')};
  margin: 0;
  line-height: ${(props: font) => (props.align ? props.lineHeight : '')};
`;

export const EvAbleFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => (props.isDisable ? '#989898' : '#1A1A1A')};
  display: flex;
  margin: 0;
`;

export const EvCheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'blue' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;
