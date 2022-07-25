import styled from 'styled-components';

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isSide?: boolean;
  isCursor?: boolean;
  isAlignSide?: boolean;
  isContentSide?: boolean;
  url?: string;
  direction?: string;
  isPadding?: string;
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
  column-gap: ${(props: box) => props.columnGap};
  border: ${(props: box) => props.border};
  border-radius: ${(props: box) => props.borderRadius};
  border-top-right-radius: ${(props: box) => (props.helfBorder ? '6px' : '1px solid #dddddd')};
  border-bottom-right-radius: ${(props: box) => (props.helfBorder ? '6px' : '1px solid #dddddd')};
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  background-image: ${(props: box) => props.url};
  background-repeat: no-repeat;
  background-size: ${(props: box) => (props.backgroundsize ? props.backgroundsize : 'cover')};
  background-position: center;
  background-color: ${(props: box) => (props.backgroundColor ? props.backgroundColor : '')};
`;

export const EvColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props: box) => (props.isAlignSide ? '' : 'center')};
  justify-content: ${(props: box) => (props.isContentSide ? '' : 'center')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  border: ${(props: box) => props.border};
  border-radius: ${(props: box) => props.borderRadius};
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  background-image: ${(props: box) => props.url};
  background-repeat: no-repeat;
  background-size: ${(props: box) => (props.backgroundsize ? props.backgroundsize : 'cover')};
  background-position: center;
  background-color: ${(props: box) => (props.backgroundColor ? props.backgroundColor : '')};
`;

export const EvRowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props: box) => (props.isAlignSide ? '' : 'center')};
  justify-content: ${(props: box) => (props.isContentSide ? '' : 'center')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  border: ${(props: box) => props.border};
  border-radius: ${(props: box) => props.borderRadius};
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  background-image: ${(props: box) => props.url};
  background-repeat: no-repeat;
  background-size: ${(props: box) => (props.backgroundsize ? props.backgroundsize : 'cover')};
  background-position: center;
  background-color: ${(props: box) => (props.backgroundColor ? props.backgroundColor : '')};
`;

export const EvCheckHelfBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props: box) => (props.isAlignSide ? '' : 'center')};
  justify-content: ${(props: box) => (props.isContentSide ? '' : 'center')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  border-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  background-image: ${(props: box) => props.url};
  background-repeat: no-repeat;
  background-size: ${(props: box) => (props.backgroundsize ? props.backgroundsize : 'cover')};
  background-position: center;
  background-color: ${(props: box) => (props.backgroundColor ? props.backgroundColor : '')};
`;

export const EvFontBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props: box) => (props.isAlignSide ? '' : 'center')};
  justify-content: ${(props: box) => (props.isContentSide ? '' : 'center')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: ${(props: box) => (props.backgroundColor ? props.backgroundColor : '')};
`;

export const EvImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props: box) => (props.isAlignSide ? '' : 'center')};
  justify-content: ${(props: box) => (props.isContentSide ? '' : 'center')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  background-image: ${(props: box) => props.url};
  background-repeat: no-repeat;
  background-size: ${(props: box) => (props.backgroundsize ? props.backgroundsize : 'cover')};
  background-position: center;
  background-color: ${(props: box) => (props.backgroundColor ? props.backgroundColor : '')};
`;

export const EvLogoBox = styled(EvImgBox)`
  width: 7rem;
  height: 3.4375rem;
  background-image: url(/assets/투두윗원형로고.svg);
`;

export const EvLineBox = styled(EvColumnBox)`
  height: 0.0625rem;
  background-color: #989898;
`;

export const EvInputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: ${(props: box) => (props.border ? props.border : '1px solid #DDDDDD')};
  border-radius: 6px;
  padding: ${(props: box) => (props.isPadding ? props.isPadding : '0 0 0 10px')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: #fffbe9;
  }
`;

export const EvHelfInputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-radius: 6px;
  padding: 0 0 0 10px;
  border: none;
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
  border: ${(props: btnable) => (props.border ? props.border : '1px solid #989898')};
  border-radius: 6px;
  width: ${(props: btnable) => props.width};
  height: ${(props: btnable) => props.height}rem;
  margin: ${(props: btnable) => props.margin};
  background-color: ${(props: btnable) => (props.background ? props.background : '')};
  cursor: ${(props: btnable) => (props.isDisable ? '' : 'pointer')};
`;

export const EvBtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${(props: btnable) => (props.isDisable ? '1px solid #DDDDDD' : 'none')};
  border-radius: 6px;
  width: ${(props: btnable) => props.width};
  height: ${(props: btnable) => props.height}rem;
  margin: ${(props: btnable) => props.margin};
  background: ${(props: btnable) => (props.isDisable ? '#F7F7F7  ' : '#FFD600')};
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
  isWhiteSpace?: boolean;
};

export const EvKoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  color: ${(props: font) => (props.color ? props.color : '#1A1A1A')};
  display: flex;
  font-weight: ${(props: font) => (props.weight ? props.weight : 400)};
  text-align: ${(props: font) => (props.align ? props.align : '')};
  margin: 0;
  line-height: ${(props: font) => (props.lineHeight ? props.lineHeight : '')};
  white-space: ${(props: font) => (props.isWhiteSpace ? 'pre-line' : '')};
`;

export const EvEnglishFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: ${(props: font) => (props.isBold ? 'OpensansBold' : 'OpensansMed')};
  color: ${(props: font) => (props.color ? props.color : '#1A1A1A')};
  display: flex;
  font-weight: ${(props: font) => (props.weight ? props.weight : 400)};
  text-align: ${(props: font) => (props.align ? props.align : '')};
  margin: 0;
  line-height: ${(props: font) => (props.lineHeight ? props.lineHeight : '')};
`;

export const EvAbleFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  color: ${(props: font) => (props.isDisable ? '#989898' : '#1A1A1A')};
  display: flex;
  margin: 0;
`;

export const EvCheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'blue' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;
