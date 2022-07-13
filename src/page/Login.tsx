import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { registerApi } from '../api/callApi';
import { FieldValues } from 'react-hook-form';
import { accessTokenState, refreshTokenState } from '../recoil/store';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 768px;
  height: 42.375rem;
  background-color: #ffffff;
  margin: 60px auto 74px auto;
`;

type box = {
  width?: number | string;
  height?: number;
  margin?: string;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${(props: box) => props.margin};
  width: ${(props: box) => props.width};
  /* background-color: #ffffff; */
`;

const LogoFontBig = styled.p`
  font-size: 27px;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

type font = {
  size: number;
  color: string;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoMed';
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const InputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

type btnable = {
  width: number | string;
  height: number | string;
  margin: string;
  isDisable?: boolean;
};

const BtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  width: ${(props: btnable) => props.width};
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

export const Login = () => {
  const localToken = localStorage.getItem('recoil-persist');
  const accessLoginToken = useSetRecoilState(accessTokenState);
  const refreshLoginToken = useSetRecoilState(refreshTokenState);
  const [email, setNameText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const nav = useNavigate();

  const loginUserData = useMutation((data: FieldValues) => registerApi.loginApi(data), {
    onSuccess: (token) => {
      accessLoginToken(token.headers.authorization);
      refreshLoginToken(token.headers.refresh);
      console.log(token);
      alert('로그인 성공!');
      nav('/');
    },
    onError: () => {
      alert('아이디, 비밀번호를 확인해주세요');
    },
  });

  const Login = (data: FieldValues) => {
    loginUserData.mutate(data);
  };

  const onChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameText(e.target.value);
  };
  const onChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (localToken) {
      alert('🙅🏻‍♀️이미 로그인이 되어있습니다🙅🏻‍♀️');
      nav('/');
    }
  }, []);
  return (
    <RegisterContainer>
      <Box width={10.5} height={1.5} margin={'52px auto 30px auto'}>
        <LogoFontBig>TODOWITH</LogoFontBig>
      </Box>
      <Box width={2.8125} height={1.5} margin={'0px auto 10px 5.7%'}>
        {email && (
          <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
            이메일
          </KoreanFont>
        )}
      </Box>
      <InputInfo
        width={'89%'}
        height={2.5}
        margin={'0px 1.25rem 0px 1.25rem'}
        type="text"
        placeholder="이메일을 입력하세요.    ex) todowith@naver.com"
        name="email"
        value={email}
        onChange={onChange1}
      ></InputInfo>
      <Box width={3.6875} height={1.5} margin={'13px auto 10px 5.7%'}>
        {password && (
          <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
            비밀번호
          </KoreanFont>
        )}
      </Box>
      <InputInfo
        width="89%"
        height={2.5}
        margin={'0px 1.25rem 0px 1.25rem'}
        placeholder="비밀번호를 입력하세요."
        type="password"
        value={password}
        onChange={onChange2}
      ></InputInfo>

      <RowBox width="100%" margin={'1.5rem 0 1rem 0'}>
        <Box
          width={'1.25rem'}
          height={1.25}
          margin={'0 0.5625rem 0 5.7%'}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: autoLogin ? 'url(/assets/checkempty.svg)' : 'url(/assets/checkfull.png)',
          }}
          onClick={() => {
            setAutoLogin(!autoLogin);
          }}
        ></Box>
        <Box width={4.25} height={1.3125} margin={'0px auto 0px 0px'}>
          <KoreanFont size={0.874} color="rgba(147, 147, 147, 1)">
            자동 로그인
          </KoreanFont>
        </Box>
      </RowBox>
      <BtnAble
        isDisable={!email || !password}
        width={'89%'}
        height={4}
        margin={'0rem 1.25rem 2rem 1.25rem'}
        onClick={() => {
          const goLogin = {
            email: email,
            password: password,
          };
          Login(goLogin);
        }}
      >
        <KoreanFont size={1.0625} color="white">
          로그인
        </KoreanFont>
      </BtnAble>

      <BtnAble
        width={'89%'}
        height={4}
        margin={'0rem 1.25rem 2.375rem 1.25rem'}
        onClick={() => {
          nav('/signupemail');
        }}
      >
        <KoreanFont size={1.0625} color="white">
          회원가입
        </KoreanFont>
      </BtnAble>

      <RowBox margin={'0px 0px 1.625rem 0px'} width={'100%'}>
        <hr style={{ width: '41.2%', marginLeft: '1.25rem' }} />
        <Box width={1.875} height={1.3125} margin={'0px 0.625rem 0px 0.625rem'}>
          <KoreanFont size={0.75} color="rgba(147, 147, 147, 1)">
            또는
          </KoreanFont>
        </Box>
        <hr style={{ width: '41.2%', marginRight: '1.25rem' }} />
      </RowBox>
      <RowBox margin={'0'} width={'100%'}>
        <Box
          width={'3.75rem'}
          height={3.75}
          margin={'0px 3rem 0px 3.0625rem'}
          style={{
            border: 'none',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(/assets/navericon.png)',
          }}
          onClick={() => {
            window.location.replace(
              'https://todowith.shop/oauth2/authorization/naver?redirect_uri=https://www.todowith.co.kr',
            );
          }}
        ></Box>

        <Box
          width={'3.75rem'}
          height={3.75}
          margin={'0px 48px 0px 0px'}
          style={{
            border: 'none',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(/assets/kakaoicon.png)',
          }}
          onClick={() => {
            window.location.replace(
              'https://todowith.shop/oauth2/authorization/kakao?redirect_uri=http://localhost:3000',
            );
          }}
        ></Box>
        <Box
          width={'3.75rem'}
          height={3.75}
          margin={'0px 3.125rem 0px 0px'}
          style={{
            border: 'none',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(/assets/googleicon.png)',
          }}
          onClick={() => {
            window.location.replace(
              'https://todowith.shop/oauth2/authorization/google?redirect_uri=https://www.todowith.co.kr',
            );
          }}
        ></Box>
      </RowBox>
    </RegisterContainer>
  );
};
