import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Layout } from '../component/Layout';

const RegisterContainer = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 678px;
  background-color: #ffffff;
  margin: 60px auto 74px auto;
`;

type fontbox = {
  width: number;
  height: number;
  margin: string;
};

const FontBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
  /* width: 168px;
  height: 24px;
  margin: 52px auto 30px auto; */
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
  /* width: 168px;
  height: 24px;
  margin: 52px auto 30px auto; */
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
  font-size: ${(props: font) => props.size}px;
  font-family: 'NotoMed';
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const InputInfo = styled.input`
  width: 335px;
  height: 40px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 0 0 10px;
  margin: 0px 20px 13px 20px;
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

const LoginBtn = styled.button`
  width: 335px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #769cbc;
  border-radius: 6px;
  margin: 37px 20px 0px 20px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #1763a6;
  }
`;

const LoginBtnDisable = styled.button`
  width: 335px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #5f5f5f;
  border-radius: 6px;
  margin: 37px 20px 0px 20px;
`;

export const Login = () => {
  // const localToken = localStorage.getItem("recoil-persist");

  // const loginToken = useSetRecoilState(tokenState);
  // const tokenUse = useRecoilValue(tokenState);

  // const loginUserData = useMutation(
  //   (data: FieldValues) => registerApi.loginApi(data),
  //   {
  //     onSuccess: (token) => {
  //       loginToken(token.headers.authorization.split(" ")[1]);
  //       console.log(token);
  //       alert("로그인 성공!");
  //       nav("/");
  //     },
  //     onError: () => {
  //       alert("아이디, 비밀번호를 확인해주세요");
  //     },
  //   }
  // );

  // const Login = (data: FieldValues) => {
  //   loginUserData.mutate(data);
  // };

  const [email, setNameText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onChange1 = (e: any) => {
    setNameText(e.target.value);
  };
  const onChange2 = (e: any) => {
    setPassword(e.target.value);
  };
  // const nav = useNavigate();
  // useEffect(() => {
  //   //useEffect 리턴 바로 위에 써주기.
  //   if (localToken) {
  //     alert('🙅🏻‍♀️이미 로그인이 되어있습니다🙅🏻‍♀️');
  //     nav('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const nav = useNavigate();
  return (
    <Layout>
      <body>
        <RegisterContainer>
          <FontBox width={168} height={24} margin={'52px auto 30px auto'}>
            <LogoFontBig>TODOWITH</LogoFontBig>
          </FontBox>
          <FontBox width={45} height={24} margin={'0px 310px 10px 20px'}>
            {email ? (
              <KoreanFont size={16} color="rgba(147, 147, 147, 1)">
                이메일
              </KoreanFont>
            ) : (
              ''
            )}
          </FontBox>
          <InputInfo
            type="text"
            placeholder="이메일을 입력하세요.    ex) todowith@naver.com"
            name="email"
            value={email}
            onChange={onChange1}
          ></InputInfo>
          <FontBox width={59} height={24} margin={'13px 296px 10px 20px'}>
            {password ? (
              <KoreanFont size={16} color="rgba(147, 147, 147, 1)">
                비밀번호
              </KoreanFont>
            ) : (
              ''
            )}
          </FontBox>
          <InputInfo
            placeholder="비밀번호를 입력하세요."
            type="password"
            value={password}
            onChange={onChange2}
          ></InputInfo>
          {email && password ? (
            <LoginBtn>
              <KoreanFont size={17} color="white">
                로그인
              </KoreanFont>
            </LoginBtn>
          ) : (
            <LoginBtnDisable>
              <KoreanFont size={17} color="white">
                로그인
              </KoreanFont>
            </LoginBtnDisable>
          )}
          <RowBox margin={'14px 0px 22px 0px'}>
            <FontBox width={20} height={20} margin={'0px 9px 0px 33px'}>
              <KoreanFont size={14} color="rgba(147, 147, 147, 1)">
                ○
              </KoreanFont>
            </FontBox>
            <FontBox width={68} height={21} margin={'0px 245px 0px 0px'}>
              <KoreanFont size={14} color="rgba(147, 147, 147, 1)">
                자동 로그인
              </KoreanFont>
            </FontBox>
          </RowBox>
          <RowBox margin={'0px 0px 38px 0px'}>
            <FontBox width={110} height={21} margin={'0px 0px 0x 80px'}>
              <KoreanFont size={14} color="rgba(147, 147, 147, 1)">
                첫 방문이라면? 🙂
              </KoreanFont>
            </FontBox>
            <FontBox width={60} height={21} margin={'0px 80px 0px 45px'}>
              <KoreanFont
                size={14}
                color="rgba(147, 147, 147, 1)"
                onClick={() => {
                  nav('/signupemail');
                }}
              >
                회원가입
              </KoreanFont>
            </FontBox>
          </RowBox>

          <RowBox margin={'0px 0px 26px 0px'}>
            <hr style={{ width: '145px', marginLeft: '20px' }} />
            <FontBox width={30} height={21} margin={'0px 10px 0px 10px'}>
              <KoreanFont size={12} color="rgba(147, 147, 147, 1)">
                또는
              </KoreanFont>
            </FontBox>
            <hr style={{ width: '145px', marginRight: '20px' }} />
          </RowBox>
          <RowBox margin={'0px 0px 0px 0px'}>
            <FontBox
              width={60}
              height={60}
              margin={'0px 48px 0px 49px'}
              onClick={() => {
                nav('/signupsns');
              }}
            >
              네이버
            </FontBox>
            <FontBox
              width={60}
              height={60}
              margin={'0px 48px 0px 0px'}
              onClick={() => {
                nav('/signupsns');
              }}
            >
              카카오
            </FontBox>
            <FontBox
              width={60}
              height={60}
              margin={'0px 50px 0px 0px'}
              onClick={() => {
                nav('/signupsns');
              }}
            >
              구글
            </FontBox>
          </RowBox>
        </RegisterContainer>
      </body>
    </Layout>
  );
};
