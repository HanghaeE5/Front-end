import { useNavigate } from 'react-router';
import styled from 'styled-components';

const HeaderContainer = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 60px;
  background-color: #ffffff;
  margin: 0px auto 0px auto;
`;

type rowbox = {
  margin: string;
};

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${(props: rowbox) => props.margin};
  /* width: 168px;
    height: 24px;
    margin: 52px auto 30px auto; */
  /* background-color: #683b3b; */
`;

type fontbox = {
  width: number | string;
  height: number | string;
  margin: string;
};

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
  /* background-color: #f1cfcf; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const FontBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
  /* background-color: #deb3b3; */
`;

type font = {
  size: number;
  color: string;
};
const KoreanFontBold = styled.p`
  font-size: ${(props: font) => props.size}px;
  font-family: 'NotoMed';
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const EnglishFont = styled.p`
  font-size: ${(props: font) => props.size}px;
  font-family: 'OpensansBold';
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
  background-color: #989898;
`;

export const SignUpEmail = () => {
  const nav = useNavigate();

  return (
    <header>
      <HeaderContainer>
        <RowBox margin={'17px 0px 15px 0px'}>
          <IconBox
            width={8}
            height={16}
            margin={'0px 0px 0x 20px'}
            style={{ backgroundImage: 'url(/assets/back.png)' }}
            onClick={() => {
              nav('/login');
            }}
          ></IconBox>
          <FontBox width={69} height={27} margin={'0px 153px 0px 125px'}>
            <EnglishFont size={18} color="#000000">
              Sign Up
            </EnglishFont>
          </FontBox>
        </RowBox>
        <LineBox width={375} height={1} margin={'0'}></LineBox>
      </HeaderContainer>
    </header>
  );
};
