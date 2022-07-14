import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { registerApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { accessTokenState, refreshTokenState } from '../recoil/store';
import { PopNoti } from '../component/element/PopNoti';

const RegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 768px;
  /* background-color: #8e3939; */
  overflow-y: auto;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 3.75rem;
  background-color: #ffffff;
  margin: 0px auto 0px auto;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const BoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #6922bb; */
`;

type font = {
  size: number;
  color: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const LogoFontBig = styled.p`
  font-size: 1.6875rem;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size};
  font-family: 'NotoRegu';
  color: ${(props: font) => props.color};
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
  isDisable: boolean;
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

export const SignUpSNS = () => {
  const [nickname, setNickname] = useState<string>('');
  const [popNoti, setPopNoti] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const accessLoginToken = useSetRecoilState(accessTokenState);
  const refreshLoginToken = useSetRecoilState(refreshTokenState);
  const localToken = localStorage.getItem('accessToken');

  const nav = useNavigate();

  const checkNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  //소셜로그인 닉네임 저장 API
  const joinSocialApiData = useMutation((nick: { nick: string }) => registerApi.joinSocialApi(nick), {
    onSuccess: (token) => {
      localStorage.clear();
      accessLoginToken(token.headers.authorization);
      refreshLoginToken(token.headers.refresh);
      console.log();
      alert(`${nickname}님 반가워요!`);
      nav('/');
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => joinSocial({ nick: nickname }), 200);
      } else {
        setPopNoti(true);
        setErrorMsg(error.response?.data.msg);
      }
    },
  });

  const joinSocial = (nick: { nick: string }) => {
    joinSocialApiData.mutate(nick);
  };

  //닉네임 중복확인 API
  const nickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: () => {
      alert(`${nickname}으로 닉네임이 설정되었습니다.`);
    },
    onError: () => {
      alert('중복된 닉네임입니다.');
    },
  });

  const nickCertification = (nick: { nick: string }) => {
    nickCertificationData.mutate(nick);
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
      <HeaderContainer style={{ borderBottom: '1px solid #989898 ' }}>
        <RowBox margin={'1rem 0px 1rem   0px'}>
          <Box width={6.85} height={1.6875} margin={'0px 8.25rem 0px 8.3125rem'}>
            <KoreanFont size={1.125} color="#000000">
              회원가입
            </KoreanFont>
          </Box>
        </RowBox>
      </HeaderContainer>
      <ContentContainer>
        <Box width={10.5} height={1.5} margin={'3.25rem auto 0px auto'}>
          <LogoFontBig>TODOWITH</LogoFontBig>
        </Box>

        <Box width={2.8125} height={1.5} margin={'5rem auto 0.625rem 5.7%'}>
          {nickname && (
            <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
              닉네임
            </KoreanFont>
          )}
        </Box>
        <RowBox width={'100%'} margin={'0px 0px 0px 0px'}>
          <InputInfo
            width={'67%'}
            height={2.5}
            margin={'0px 0.6875rem 0px 1.25rem'}
            type="text"
            placeholder="닉네임    ex) 빨강바지3456"
            name="nickname"
            value={nickname}
            onChange={onChangeNickname}
          ></InputInfo>

          <BtnAble
            isDisable={!checkNickname(nickname)}
            width={'19.4%'}
            height={2.625}
            margin={'0px 1.25rem 0px 0px'}
            onClick={() => {
              const goNickCertification = {
                nick: nickname,
              };
              nickCertification(goNickCertification);
            }}
          >
            중복확인
          </BtnAble>
        </RowBox>
        <BoxSide width={20} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
          {nickname ? (
            <CheckFont size={0.75} color={'blue'} isCorrect={checkNickname(nickname)}>
              {checkNickname(nickname)
                ? '사용 가능한 형식입니다. 중복 확인 버튼을 눌러주세요.'
                : '닉네임 형식을 확인해 주세요.'}
            </CheckFont>
          ) : (
            <CheckFont size={0.75} color={'black'}>
              닉네임은 2-15자의 한글, 영어, 숫자입니다.
            </CheckFont>
          )}
        </BoxSide>

        <BtnAble
          isDisable={!nickname}
          width={'88.2%'}
          height={4}
          margin={'5.125rem 1.25rem 0px 1.25rem'}
          onClick={() => {
            const gojoinSocial = {
              nick: nickname,
            };
            joinSocial(gojoinSocial);
          }}
        >
          <KoreanFont size={1.0625} color="white">
            회원가입 완료
          </KoreanFont>
        </BtnAble>
        <PopNoti
          confirmType="warning"
          visible={popNoti}
          msg={errorMsg}
          oneButton={{
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
