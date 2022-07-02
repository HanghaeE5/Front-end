import { url } from 'inspector';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { tokenState } from '../recoil/store';
import { registerApi } from '../api/callApi';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23.4375rem;
  height: 42.375rem;
  background-color: #ffffff;
  margin: 0px auto 4.625rem auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23.4375rem;
  height: 3.75rem;
  background-color: #ffffff;
  margin: 0px auto 0px auto;
`;

type box = {
  width: number | string;
  height: number | string;
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
  /* background-color: #deb3b3; */
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
  margin: string;
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

const LogoFontBig = styled.p`
  font-size: 1.6875rem;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
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

export const SignUpSNS = () => {
  const [nickname, setNickname] = useState<string>('');
  const localToken = localStorage.getItem('recoil-persist');
  const loginToken = useSetRecoilState(tokenState);
  const tokenUse = useRecoilValue(tokenState);

  const nav = useNavigate();
  const rePass: any = useRef();

  const CheckNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  //닉네임 중복확인 API
  const NickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: (token) => {
      // loginToken(token.headers.authorization.split(' ')[1]);
      console.log();
      alert(`${nickname}으로 닉네임이 설정되었습니다.`);
    },
    onError: () => {
      alert('중복된 닉네임입니다.');
    },
  });

  const NickCertification = (nick: { nick: string }) => {
    NickCertificationData.mutate(nick);
  };

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (localToken) {
      alert('🙅🏻‍♀️이미 로그인이 되어있습니다🙅🏻‍♀️');
      nav('/');
    }
  }, []);

  return (
    <>
      <HeaderContainer style={{ borderBottom: '1px solid #989898 ' }}>
        <RowBox margin={'1rem 0px 1rem   0px'}>
          <Box width={6.85} height={1.6875} margin={'0px 8.25rem 0px 8.3125rem'}>
            <KoreanFont size={1.125} color="#000000">
              Sign Up
            </KoreanFont>
          </Box>
        </RowBox>
      </HeaderContainer>
      <RegisterContainer>
        <Box width={10.5} height={1.5} margin={'3.25rem auto 0px auto'}>
          <LogoFontBig>TODOWITH</LogoFontBig>
        </Box>

        <Box width={2.8125} height={1.5} margin={'5rem 19.375rem 0.625rem 1.25rem'}>
          {nickname && (
            <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
              닉네임
            </KoreanFont>
          )}
        </Box>
        <RowBox margin={'0px 0px 0px 0px'}>
          <InputInfo
            width={15.6875}
            height={2.5}
            margin={'0px 0.6875rem 0px 1.25rem'}
            type="text"
            placeholder="닉네임    ex) 빨강바지3456"
            name="nickname"
            value={nickname}
            onChange={onChangeNickname}
          ></InputInfo>

          <BtnAble
            isDisable={!CheckNickname(nickname)}
            width={4.5625}
            height={2.625}
            margin={'0px 1.25rem 0px 0px'}
            onClick={() => {
              const goNickCertification = {
                nick: nickname,
              };
              NickCertification(goNickCertification);
            }}
          >
            중복확인
          </BtnAble>
        </RowBox>
        <BoxSide width={20} height={1.3125} margin={'0.3125rem 2.1875rem 0px 1.25rem'}>
          {nickname ? (
            <CheckFont size={0.75} color={'blue'} isCorrect={CheckNickname(nickname)}>
              {CheckNickname(nickname)
                ? '사용 가능한 형식입니다. 중복 확인 버튼을 눌러주세요.'
                : '닉네임 형식을 확인해 주세요.'}
            </CheckFont>
          ) : (
            <CheckFont size={0.75} color={'black'}>
              닉네임은 2-15자의 한글, 영어, 숫자입니다.
            </CheckFont>
          )}
        </BoxSide>

        <BtnAble isDisable={!nickname} width={20.9375} height={4} margin={'5.125rem 1.25rem 0px 1.25rem'}>
          <KoreanFont size={1.0625} color="white">
            회원가입 완료
          </KoreanFont>
        </BtnAble>
      </RegisterContainer>
    </>
  );
};
