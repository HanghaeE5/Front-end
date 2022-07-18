import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { NavigateFunction, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { registerApi } from '../api/callApi';
import { FieldValues } from 'react-hook-form';
import { accessTokenState, popNotiState, refreshTokenState } from '../recoil/store';
import { EvAbleFont, EvBox, EvBtn, EvBtnAble, EvInputInfo, EvKoreanFont } from '../component/element/BoxStyle';
import { AxiosError } from 'axios';
import { PopNoti } from '../component/element/PopNoti';

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  /* background-color: #8e3939; */
  overflow-y: auto;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';
export const Login = () => {
  const nav = useNavigate();
  const localToken = localStorage.getItem('recoil-persist');
  const accessLoginToken = useSetRecoilState(accessTokenState);
  // const refreshLoginToken = useSetRecoilState(refreshTokenState);
  const [email, setNameText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [popNoti, setPopNoti] = useRecoilState(popNotiState);
  const [informType, setInformType] = useState<ConfirmType | undefined>(undefined);
  const [informMsg, setInformMsg] = useState<string | undefined>('');
  const [quitOk, setQuitOk] = useState<boolean>(false);

  const loginUserData = useMutation((data: FieldValues) => registerApi.loginApi(data), {
    onSuccess: (token) => {
      console.log(token);
      setQuitOk(true);
      setPopNoti(true);
      setInformType('success');
      setInformMsg('로그인 성공🙂');
      accessLoginToken(token.headers.authorization);
      // refreshLoginToken(token.headers.refresh);
      console.log(accessLoginToken);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      setQuitOk(false);
      setPopNoti(true);
      setInformType('warning');
      setInformMsg(error.response?.data.msg);
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

  const keyUpEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      Login({ email: email, password: password });
    }
  };

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (localToken) {
      setPopNoti(true);
      setQuitOk(true);
      setInformType('warning');
      setInformMsg('🙅🏻‍♀️이미 로그인이 되어있습니다🙅🏻‍♀️');
    }
  }, []);
  return (
    <RegisterContainer>
      <ContentContainer>
        <EvBox
          width={'10.5rem'}
          height={1.5}
          margin={'7rem auto 1.875rem auto'}
          url="url(/assets/TODOWITH.svg)"
        ></EvBox>
        <EvBox width={'2.8125rem'} height={1.5} margin={'0px auto 0.625rem 5.3%'}>
          {email && (
            <EvKoreanFont size={1} color="#939393" weight={700}>
              이메일
            </EvKoreanFont>
          )}
        </EvBox>
        <EvInputInfo
          width={'88.5%'}
          height={3.75}
          margin={'0px 1.25rem 0px 1.43rem'}
          type="text"
          placeholder="이메일을 입력하세요.    예) todowith@naver.com"
          name="email"
          value={email}
          onChange={onChange1}
        ></EvInputInfo>
        <EvBox width={3.6875} height={1.5} margin={'1.4375rem auto 0.625rem 5.3%'}>
          {password && (
            <EvKoreanFont size={1} color="rgba(147, 147, 147, 1)" weight={700}>
              비밀번호
            </EvKoreanFont>
          )}
        </EvBox>
        <EvInputInfo
          width={'88.5%'}
          height={3.75}
          margin={'0px 1.25rem 0px 1.43rem'}
          placeholder="비밀번호를 입력하세요."
          type="password"
          value={password}
          onChange={onChange2}
          onKeyUp={keyUpEvent}
        />

        <EvBtnAble
          isDisable={!email || !password}
          width={'88.5%'}
          height={3.75}
          margin={'1.4375rem 1.25rem 1.125rem 1.25rem'}
          onClick={
            email && password
              ? () => {
                  const goLogin = {
                    email: email,
                    password: password,
                  };
                  Login(goLogin);
                }
              : () => {
                  null;
                }
          }
        >
          <EvAbleFont size={1.0625} weight={700} color="white" isDisable={!email || !password}>
            로그인
          </EvAbleFont>
        </EvBtnAble>

        <EvBox direction={'row'} width="100%" margin={'0 0 1.75rem 0'}>
          <EvBox
            width={'1.25rem'}
            height={1.25}
            margin={'0 0.5625rem 0 8.8%'}
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '1.5rem',
              backgroundImage: autoLogin ? 'url(/assets/checkgray.svg)' : 'url(/assets/checkyellow.svg)',
            }}
            onClick={() => {
              setAutoLogin(!autoLogin);
            }}
          ></EvBox>
          <EvBox width={4.25} height={1.3125} margin={'0px auto 0px 0px'}>
            <EvKoreanFont size={0.874} weight={700} color="#939393">
              자동 로그인
            </EvKoreanFont>
          </EvBox>
        </EvBox>

        <EvBtn
          width={'88.5%'}
          height={3.75}
          margin={'0rem 1.25rem 0 1.25rem'}
          border={'1px solid #989898;'}
          onClick={() => {
            nav('/signupemail');
          }}
        >
          <EvKoreanFont size={0.875} weight={500} color=" #989898">
            회원가입
          </EvKoreanFont>
        </EvBtn>

        <EvBox direction={'row'} margin={'1.6rem 0px 0 0px'} width={'100%'}>
          <hr style={{ width: '40%' }} />
          <EvBox width={2.6875} height={1.5} margin={'0px 0.625rem 0px 0.625rem'}>
            <EvKoreanFont size={0.75} color="#989898">
              또는
            </EvKoreanFont>
          </EvBox>
          <hr style={{ width: '40%' }} />
        </EvBox>
        <EvBox direction={'row'} margin={'1.25rem 0 0 0'} width={'100%'} columnGap={'3rem'}>
          <EvBox
            width={'3.75rem'}
            height={3.75}
            isCursor={true}
            url={'url(/assets/navericon.png)'}
            backgroundsize={'3.75rem'}
            onClick={() => {
              window.location.replace(
                'https://todowith.shop/oauth2/authorization/naver?redirect_uri=https://www.todowith.co.kr',
              );
            }}
          ></EvBox>

          <EvBox
            width={'3.75rem'}
            height={3.75}
            isCursor={true}
            url={'url(/assets/kakaoicon.png)'}
            onClick={() => {
              window.location.replace(
                'https://todowith.shop/oauth2/authorization/kakao?redirect_uri=http://localhost:3000',
              );
            }}
          ></EvBox>
          <EvBox
            width={'3.75rem'}
            height={3.75}
            isCursor={true}
            url={'url(/assets/googleicon.png)'}
            onClick={() => {
              window.location.replace(
                'https://todowith.shop/oauth2/authorization/google?redirect_uri=https://www.todowith.co.kr',
              );
            }}
          ></EvBox>
        </EvBox>

        <PopNoti
          confirmType={informType}
          visible={popNoti}
          msg={informMsg}
          quitOk={quitOk}
          oneButton={{
            nav: '/',
            text: '확인',
            onClick: () => {
              setPopNoti(false);
            },
          }}
        />
      </ContentContainer>
    </RegisterContainer>
  );
};
