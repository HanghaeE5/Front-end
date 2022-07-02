import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { registerApi } from '../api/callApi';
import { FieldValues } from 'react-hook-form';
import { tokenState } from '../recoil/store';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23.4375rem;
  height: 42.375rem;
  background-color: #ffffff;
  margin: 60px auto 74px auto;
`;

type box = {
  width: number;
  height: number;
  margin: string;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #f1cfcf; */
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
  width: 20.9375rem;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 0 0 10px;
  margin: 0px 1.25rem 0.8125rem 1.25rem;
  :focus {
    background-color: rgb(220, 237, 255);
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

export const Login = () => {
  const localToken = localStorage.getItem('recoil-persist');
  const loginToken = useSetRecoilState(tokenState);
  const tokenUse = useRecoilValue(tokenState);
  const [email, setNameText] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const nav = useNavigate();

  const loginUserData = useMutation((data: FieldValues) => registerApi.loginApi(data), {
    onSuccess: (token) => {
      loginToken(token.headers.authorization);
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

  const onChange1 = (e: any) => {
    setNameText(e.target.value);
  };
  const onChange2 = (e: any) => {
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
      <Box width={2.8125} height={1.5} margin={'0px 310px 10px 20px'}>
        {email && (
          <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
            이메일
          </KoreanFont>
        )}
      </Box>
      <InputInfo
        type="text"
        placeholder="이메일을 입력하세요.    ex) todowith@naver.com"
        name="email"
        value={email}
        onChange={onChange1}
      ></InputInfo>
      <Box width={3.6875} height={1.5} margin={'13px 296px 10px 20px'}>
        {password && (
          <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
            비밀번호
          </KoreanFont>
        )}
      </Box>
      <InputInfo placeholder="비밀번호를 입력하세요." type="password" value={password} onChange={onChange2}></InputInfo>

      <BtnAble
        isDisable={!email || !password}
        width={20.9375}
        height={4}
        margin={'2.3125rem 1.25rem 0rem 1.25rem'}
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

      <RowBox margin={'0.875rem 0 1.375rem 0'}>
        <Box width={1.25} height={1.25} margin={'0 0.5625rem 0 2.0625rem'}>
          <KoreanFont size={0.874} color="rgba(147, 147, 147, 1)">
            ○
          </KoreanFont>
        </Box>
        <Box width={4.25} height={1.3125} margin={'0px 15.3125rem 0px 0px'}>
          <KoreanFont size={0.874} color="rgba(147, 147, 147, 1)">
            자동 로그인
          </KoreanFont>
        </Box>
      </RowBox>
      <RowBox margin={'0px 0px 2.375rem 0px'}>
        <Box width={6.875} height={1.3125} margin={'0px 0px 0x 5rem'}>
          <KoreanFont size={0.874} color="rgba(147, 147, 147, 1)">
            첫 방문이라면? 🙂
          </KoreanFont>
        </Box>
        <Box width={3.75} height={1.3125} margin={'0px 5rem 0px 2.8125rem'}>
          <KoreanFont
            size={0.875}
            color="rgba(147, 147, 147, 1)"
            onClick={() => {
              nav('/signupemail');
            }}
          >
            회원가입
          </KoreanFont>
        </Box>
      </RowBox>

      <RowBox margin={'0px 0px 1.625rem 0px'}>
        <hr style={{ width: '9.0625rem', marginLeft: '1.25rem' }} />
        <Box width={1.875} height={1.3125} margin={'0px 0.625rem 0px 0.625rem'}>
          <KoreanFont size={0.75} color="rgba(147, 147, 147, 1)">
            또는
          </KoreanFont>
        </Box>
        <hr style={{ width: '9.0625rem', marginRight: '1.25rem' }} />
      </RowBox>
      <RowBox margin={'0'}>
        <Box
          width={3.75}
          height={3.75}
          margin={'0px 3rem 0px 3.0625rem'}
          onClick={() => {
            nav('/signupsns');
          }}
        >
          네이버
        </Box>
        <Box
          width={3.75}
          height={3.75}
          margin={'0px 48px 0px 0px'}
          onClick={() => {
            nav('/signupsns');
          }}
        >
          카카오
        </Box>
        <Box
          width={3.75}
          height={3.75}
          margin={'0px 3.125rem 0px 0px'}
          onClick={() => {
            nav('/signupsns');
          }}
        >
          구글
        </Box>
      </RowBox>
    </RegisterContainer>
  );
};
