import { url } from 'inspector';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 678px;
  background-color: #ffffff;
  margin: 0px auto 74px auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 60px;
  background-color: #ffffff;
  margin: 0px auto 0px auto;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 508px;
  background-color: #f5e28d;
  margin: 0px auto 0px auto;
`;

type fontbox = {
  width: number | string;
  height: number | string;
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
  /* background-color: #deb3b3; */
`;

const FontBoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
  /* background-color: #6922bb; */
`;

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

const LogoFont = styled.p`
  font-size: 27px;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}px;
  font-family: 'NotoMed';
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
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

const LogoFontSmall = styled.p`
  font-size: 21px;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

const LogoFontBig = styled.p`
  font-size: 27px;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size}px;
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
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
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
  padding: 0 0 0 10px;
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
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

  width: ${(props: btnbox) => props.width}px;
  height: ${(props: btnbox) => props.height}px;
  margin: ${(props: btnbox) => props.margin};
  background-color: ${(props: btnbox) => props.color};
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #ecee73;
  }
`;

const BtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #769cbc;
  border-radius: 6px;

  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #1763a6;
  }
`;

const BtnDisable = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  border: 1px solid #dddddd;
  border-radius: 6px;
  margin: 37px 20px 0px 20px;
  width: ${(props: fontbox) => props.width}px;
  height: ${(props: fontbox) => props.height}px;
  margin: ${(props: fontbox) => props.margin};
`;

export const SignUpSNS = () => {
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const rePass: any = useRef();

  const CheckNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };

  const [nickname, setNickname] = useState<string>('');

  const nav = useNavigate();

  const [view, setView] = useState<boolean>(true);

  return (
    <>
      <HeaderContainer>
        <RowBox margin={'17px 0px 15px 0px'}>
          <FontBox width={110} height={27} margin={'0px 132px 0px 133px'}>
            <KoreanFont size={18} color="#000000">
              Sign Up
            </KoreanFont>
          </FontBox>
        </RowBox>
        <LineBox width={375} height={1} margin={'0'}></LineBox>
      </HeaderContainer>
      <RegisterContainer>
        <FontBox width={168} height={24} margin={'52px auto 0px auto'}>
          <LogoFontBig>TODOWITH</LogoFontBig>
        </FontBox>

        <FontBox width={45} height={24} margin={'80px 310px 10px 20px'}>
          {nickname ? (
            <KoreanFont size={16} color="rgba(147, 147, 147, 1)">
              닉네임
            </KoreanFont>
          ) : (
            ''
          )}
        </FontBox>
        <RowBox margin={'0px 0px 0px 0px'}>
          <InputInfo
            width={251}
            height={40}
            margin={'0px 11px 0px 20px'}
            type="text"
            placeholder="닉네임    ex) 빨강바지3456"
            name="nickname"
            value={nickname}
            onChange={onChangeNickname}
          ></InputInfo>
          {CheckNickname(nickname) ? (
            <BtnAble width={73} height={42} margin={'0px 20px 0px 0px'}>
              중복확인
            </BtnAble>
          ) : (
            <BtnDisable width={73} height={42} margin={'0px 20px 0px 0px'}>
              중복확인
            </BtnDisable>
          )}
        </RowBox>
        <FontBoxSide width={320} height={21} margin={'5px 35px 0px 20px'}>
          {nickname ? (
            CheckNickname(nickname) ? (
              <CheckFont size={12} color={'blue'}>
                사용 가능한 형식입니다. 중복 확인 버튼을 눌러주세요.
              </CheckFont>
            ) : (
              <CheckFont size={12} color={'red'}>
                닉네임 형식을 확인해 주세요.
              </CheckFont>
            )
          ) : (
            <CheckFont size={12} color={'black'}>
              닉네임은 2-15자의 한글, 영어, 숫자입니다.
            </CheckFont>
          )}
        </FontBoxSide>

        {nickname ? (
          <BtnAble width={335} height={64} margin={'82px 20px 0px 20px'}>
            <KoreanFont size={17} color="white">
              회원가입 완료
            </KoreanFont>
          </BtnAble>
        ) : (
          <BtnDisable width={335} height={64} margin={'82px 20px 0px 20px'}>
            <KoreanFont size={17} color="white">
              회원가입 완료
            </KoreanFont>
          </BtnDisable>
        )}
      </RegisterContainer>
    </>
  );
};
