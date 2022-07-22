import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { NavigateFunction, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { registerApi } from '../api/callApi';
import { accessTokenState, popNotiState } from '../recoil/store';
import {
  EvAbleFont,
  EvBox,
  EvBtn,
  EvBtnAble,
  EvFontBox,
  EvImgBox,
  EvInputInfo,
  EvKoreanFont,
  EvLogoBox,
  EvRowBox,
} from '../component/element/BoxStyle';
import { AxiosError } from 'axios';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import { PATH } from '../route/routeList';

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

export const Login = () => {
  const nav = useNavigate();
  const localToken = localStorage.getItem('recoil-persist');
  const [accessLoginToken, setAccessLoginToken] = useRecoilState(accessTokenState);

  const [email, setNameText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  const loginUserData = useMutation((data: { email: string; password: string }) => registerApi.loginApi(data), {
    onSuccess: (token) => {
      console.log(token);
      openSuccessConfirm({ title: '로그인 성공🙂', button: { text: '확인', onClick: () => nav(PATH.MAIN) } });
      setAccessLoginToken(token.headers.authorization);
      // console.log(accessLoginToken);
    },
    onError: (error: AxiosError<{ msg: string }>) => openErrorConfirm({ title: error.response?.data.msg }),
  });

  const Login = (data: { email: string; password: string }) => {
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
      openSuccessConfirm({ title: '🙅🏻‍♀️이미 로그인이 되어있습니다🙅🏻‍♀️', button: { text: '확인', onClick: () => nav(-1) } });
    }
  }, [localToken]);
  return (
    <RegisterContainer>
      <ContentContainer>
        <EvLogoBox margin={'7.1875rem auto 2.5rem auto'} />

        {/* 이메일 */}
        <EvFontBox width={'2.8125rem'} height={1.5} margin={'0px auto 0.625rem 5.3%'}>
          {email && (
            <EvKoreanFont size={1} color="#939393" weight={700}>
              이메일
            </EvKoreanFont>
          )}
        </EvFontBox>
        <EvInputInfo
          width={'88.5%'}
          height={3.75}
          margin={'0px 1.25rem 0px 1.43rem'}
          type="text"
          placeholder="이메일을 입력하세요.    예) todowith@naver.com"
          name="email"
          value={email}
          onChange={onChange1}
        />

        {/* 비밀번호 */}
        <EvFontBox width={3.6875} height={1.5} margin={'1.4375rem auto 0.625rem 5.3%'}>
          {password && (
            <EvKoreanFont size={1} color="rgba(147, 147, 147, 1)" weight={700}>
              비밀번호
            </EvKoreanFont>
          )}
        </EvFontBox>
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

        {/* 로그인버튼 */}
        <EvBtnAble
          isDisable={!email || !password}
          width={'88.5%'}
          height={3.75}
          margin={'1.4375rem auto'}
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
          <EvAbleFont size={1.0625} weight={700} isDisable={!email || !password}>
            로그인
          </EvAbleFont>
        </EvBtnAble>

        {/* 회원가입버튼 */}
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

        <EvRowBox margin={'1.6rem 0px 0 0px'} width={'100%'}>
          <hr style={{ width: '40%' }} />
          <EvFontBox width={2.6875} height={1.5} margin={'0px 0.625rem 0px 0.625rem'}>
            <EvKoreanFont size={0.75} color="#989898">
              또는
            </EvKoreanFont>
          </EvFontBox>
          <hr style={{ width: '40%' }} />
        </EvRowBox>

        <EvRowBox margin={'1.25rem 0 0 0'} width={'100%'} style={{ columnGap: '3rem' }}>
          <EvImgBox
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
          />

          <EvImgBox
            width={'3.75rem'}
            height={3.75}
            isCursor={true}
            url={'url(/assets/kakaoicon.png)'}
            onClick={() => {
              window.location.replace(
                'https://todowith.shop/oauth2/authorization/kakao?redirect_uri=http://localhost:3000',
              );
            }}
          />
          <EvImgBox
            width={'3.75rem'}
            height={3.75}
            isCursor={true}
            url={'url(/assets/googleicon.png)'}
            onClick={() => {
              window.location.replace(
                'https://todowith.shop/oauth2/authorization/google?redirect_uri=https://www.todowith.co.kr',
              );
            }}
          />
        </EvRowBox>
      </ContentContainer>
    </RegisterContainer>
  );
};
