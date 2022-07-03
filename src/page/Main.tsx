import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  /* background-color: #f5d7e5; */
  margin: 0px auto 0px auto;
  position: relative;
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
`;

const BoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #6922bb; */
`;

type rowbox = {
  margin?: string;
};

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${(props: rowbox) => props.margin};
  /* background-color: #683b3b; */
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #989898;
`;

const LogoFont = styled.p`
  font-size: 1.6875rem;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

type font = {
  size: number;
  color: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const EnglishFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'OpensansBold' : 'OpensansMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const LogoFontSmall = styled.p`
  font-size: 1.3125rem;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'blue' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const CheckFont2 = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'black' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const InputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

const InputInfoNoneBorder = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  /* border-radius: 6px; */
  padding: 0 0 0 0.625rem;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

type btnbox = {
  width: number | string;
  height: number | string;
  margin: string;
  color: string;
};

const BtnBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #769cbc;
  border-radius: 6px;
  border: 1px solid #989898;

  width: ${(props: btnbox) => props.width}rem;
  height: ${(props: btnbox) => props.height}rem;
  margin: ${(props: btnbox) => props.margin};
  background-color: ${(props: btnbox) => props.color};
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #ecee73;
  }
`;

type btnable = {
  width: number | string;
  height: number | string;
  margin: string;
  isDisable: boolean;
};

const BtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  width: ${(props: btnable) => props.width}rem;
  height: ${(props: btnable) => props.height}rem;
  margin: ${(props: btnable) => props.margin};
  background: ${(props: btnable) => (props.isDisable ? '#f3f3f3' : '#8ac2f0')};

  cursor: ${(props: btnable) => (props.isDisable ? '' : 'pointer')};

  &:hover {
    ${(props: btnable) =>
      props.isDisable
        ? ''
        : `color: white;
    background-color: #358edc;`}
  }
`;

export const Main = () => {
  return (
    <NavLayout>
      <MainContainer>
        <Box
          width={4.75}
          height={4.75}
          margin={'1.1875rem 9.375rem 0 9.3125rem'}
          style={{
            borderRadius: '50%',
            border: '1px solid #D9D9D9',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(/assets/토끼.png)',
          }}
        />
        <Box
          width={1.3294}
          height={1.2468}
          margin={'-1.3rem 8.7731rem 0 13.3356rem'}
          style={{
            border: 'none',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(/assets/camera.svg)',
          }}
        ></Box>
        <RowBox margin={'0.628rem 0px 0px 0px'}>
          <Box
            height={1.5}
            margin={'0 0 0 0'}
            style={{ display: 'flex', justifyContent: 'initial', borderBottom: '0.5px solid #000000' }}
          >
            <KoreanFont size={0.875} color="#000000">
              강남스타일1234
            </KoreanFont>
          </Box>
          <Box
            width={1}
            height={1}
            margin={'-0.5rem 0 0 0.2rem '}
            style={{
              border: 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: 'url(/assets/pencil.svg)',
            }}
          ></Box>
        </RowBox>
        <Box
          width={11.8125}
          height={12.5625}
          margin={'1.75rem 5.8125rem 0 5.8125rem '}
          style={{
            border: 'none',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(/assets/Sloth.svg)',
          }}
        ></Box>
        <Box
          width={5.25}
          height={0.75}
          margin={'1.125rem 9.0625rem 0 9.0625rem '}
          style={{
            border: 'none',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(/assets/shadow.svg)',
          }}
        ></Box>
        <BoxSide width={14} height={1.6875} margin={'0.8125rem 7.56rem 0 1.875rem'}>
          <KoreanFont size={1.25} color="#000000">
            ToDo의 고수늘보
          </KoreanFont>
        </BoxSide>

        <Box margin={'0.4rem 1.25rem 0rem 1.25rem'}>
          <Box
            width={20.9375}
            height={1.3125}
            margin={'0'}
            style={{ border: '1px solid #DDDDDD', borderRadius: '30px' }}
          >
            <KoreanFont size={0.85} color="#000000" style={{ zIndex: '3', margin: '0 1rem 0 auto' }}>
              41.8%
            </KoreanFont>
          </Box>
          <BoxSide
            width={10}
            height={1.3125}
            margin={'-1.3125rem auto 0 0'}
            style={{
              background: 'linear-gradient(90deg, #F4D687 0%, #F08C15 161.46%)',
              borderRadius: '30px 0px 0px 30px',
            }}
          ></BoxSide>
        </Box>
        <RowBox margin={'0.25rem 1.875rem 0rem 1.875rem'}>
          <BoxSide width={1.8} height={1.375} style={{ margin: '0 16.0875rem 0 0rem' }}>
            <KoreanFont size={1} color="#000000">
              23
            </KoreanFont>
          </BoxSide>
          <BoxSide width={1.8} height={1.375} style={{ margin: '0' }}>
            <KoreanFont size={1} color="#000000">
              24
            </KoreanFont>
          </BoxSide>
        </RowBox>
        <Box width={10.0625} height={1.6875} margin={'1.6875rem 11.5rem 0 1.875rem'}>
          <EnglishFont size={1.25} color="#000000">
            Today_ to do list
          </EnglishFont>
        </Box>

        <Box
          width={20.9375}
          margin={'0.375rem 1.25rem 0 1.25rem'}
          style={{
            padding: '0.8125rem 0',
            gap: '0.7rem',
            background: '#FFFFFF',
            border: '1px solid #DDDDDD',
            borderRadius: '6px',
          }}
        >
          <RowBox>
            <Box width={0.825} margin={'0rem 0 0 1.034rem'}>
              <KoreanFont size={0.87} color="#000000">
                ✔
              </KoreanFont>
            </Box>
            <BoxSide width={17.1875} margin={'0rem 0.9375rem 0 0.953125rem'}>
              <KoreanFont size={0.87} color="#000000">
                영어듣기 1시간 하기
              </KoreanFont>
            </BoxSide>
          </RowBox>
          <RowBox>
            <Box width={0.825} margin={'0rem 0 0 1.034rem'}>
              <KoreanFont size={0.87} color="#000000">
                ✔
              </KoreanFont>
            </Box>
            <BoxSide width={17.1875} margin={'0rem 0.9375rem 0 0.953125rem'}>
              <KoreanFont size={0.87} color="#000000">
                강아지 산책 시키기
              </KoreanFont>
            </BoxSide>
          </RowBox>
          <RowBox>
            <Box width={0.825} margin={'0rem 0 0 1.034rem'}>
              <KoreanFont size={0.87} color="#000000">
                ✔
              </KoreanFont>
            </Box>
            <BoxSide width={17.1875} margin={'0rem 0.9375rem 0 0.953125rem'}>
              <KoreanFont size={0.87} color="#000000">
                사당자동차운전연습장가서 운전연수 2시간 받기
              </KoreanFont>
            </BoxSide>
          </RowBox>
        </Box>
      </MainContainer>
    </NavLayout>
  );
};
