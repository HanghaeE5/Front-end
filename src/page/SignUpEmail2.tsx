import { url } from 'inspector';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { PageLayout } from '../component/layout/PageLayout';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23.4375rem;
  height: 42.375rem;
  background-color: #24c5c3;
  margin: 0px auto 4.625rem auto;
`;

const InfoContainer = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  height: 60%;
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
  width: ${(props: fontbox) => props.width}rem;
  height: ${(props: fontbox) => props.height}rem;
  margin: ${(props: fontbox) => props.margin};
  background-color: #deb3b3;
`;

const FontBoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: fontbox) => props.width}rem;
  height: ${(props: fontbox) => props.height}rem;
  margin: ${(props: fontbox) => props.margin};
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
  width: ${(props: fontbox) => props.width}rem;
  height: ${(props: fontbox) => props.height}rem;
  margin: ${(props: fontbox) => props.margin};
  background-color: #989898;
`;

const LogoFont = styled.p`
  font-size: 1.6875rem;
  font-family: 'OpensansBold';
  display: flex;
  margin: 0 0 0 0;
`;

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoMed';
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;
type font = {
  size: number;
  color: string;
  isCorrect?: boolean;
};
const KoreanFontBold = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoMed';
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const EnglishFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'OpensansBold';
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

const InputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 0 0 10px;
  width: ${(props: fontbox) => props.width}rem;
  height: ${(props: fontbox) => props.height}rem;
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
  padding: 0 0 0 0.625rem;
  width: ${(props: fontbox) => props.width}rem;
  height: ${(props: fontbox) => props.height}rem;
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

export const SignUpEmail2 = () => {
  const [email, setNameText] = useState<string>('');
  const [emailCheckNumber, setEmailCheckNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState<boolean>(true);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameText(e.target.value);
  };
  const onChangeEmailCheckNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCheckNumber(e.target.value);
  };
  const onChangePw1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangePw2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const rePass: any = useRef();
  const CheckEmail = (asValue: string) => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };
  const CheckNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };
  const CheckPassword = (asValue: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{5,15}$/;
    return regExp.test(asValue);
  };

  const nav = useNavigate();

  const [view, setView] = useState<boolean>(true);

  return (
    <PageLayout title="SignUp">
      <PageLayout.Body>
        <InfoContainer>
          <FontBox width={7.125} height={1} margin={'3.3125rem 8.1875rem 0rem 8.125rem'}>
            <LogoFontSmall>TODOWITH</LogoFontSmall>
          </FontBox>

          <FontBox width={2.8125} height={1.5} margin={'1.6875rem 19.375rem 0.625rem 1.25rem'}>
            {email && (
              <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                이메일
              </KoreanFont>
            )}
          </FontBox>
          <RowBox margin={'0px 0px 0px 0px'}>
            <InputInfo
              width={15.6875}
              height={2.5}
              margin={'0rem 0.6875rem 0rem 1.25rem'}
              type="text"
              placeholder="이메일    ex) todowith@naver.com"
              name="email"
              value={email}
              onChange={onChangeEmail}
            ></InputInfo>

            <BtnAble
              isDisable={!CheckEmail(email)}
              width={4.5625}
              height={2.625}
              margin={'0px 1.25rem 0px 0px'}
              onClick={() => {
                setEmailCheck(true);
              }}
            >
              인증
            </BtnAble>
          </RowBox>
          <FontBoxSide width={20} height={1.3125} margin={'0.3125rem 2.1875rem 0px 1.25rem'}>
            {email ? (
              <CheckFont size={0.75} color={'blue'} isCorrect={CheckEmail(email)}>
                {CheckEmail(email) ? '사용 가능한 형식입니다. 인증 버튼을 눌러주세요.' : '이메일을 확인해주세요'}
              </CheckFont>
            ) : (
              <CheckFont size={0.75} color={'black'}>
                이메일은 영문과 숫자와 일부 특수문자(._-)만 입력 가능합니다.
              </CheckFont>
            )}
          </FontBoxSide>

          {emailCheck ? (
            <InputInfo
              width={15.6875}
              height={2.375}
              margin={'0.4375rem 6.5rem 0px 1.25rem'}
              type="text"
              placeholder="이메일로 발송된 인증번호를 입력하세요."
              name="emailchecknumber"
              value={emailCheckNumber}
              onChange={onChangeEmailCheckNumber}
            ></InputInfo>
          ) : (
            ''
          )}

          <FontBox width={2.8125} height={1.5} margin={'1.125rem 19.375rem 0.625rem 1.25rem'}>
            {nickname ? (
              <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                닉네임
              </KoreanFont>
            ) : (
              ''
            )}
          </FontBox>
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

            <BtnAble isDisable={!CheckNickname(nickname)} width={4.5625} height={2.625} margin={'0px 1.25rem 0px 0px'}>
              중복확인
            </BtnAble>
          </RowBox>
          <FontBoxSide width={20} height={1.3125} margin={'0.3125rem 2.1875rem 0px 1.25rem'}>
            {nickname ? (
              CheckNickname(nickname) ? (
                <CheckFont size={0.75} color={'blue'}>
                  사용 가능한 형식입니다. 중복 확인 버튼을 눌러주세요.
                </CheckFont>
              ) : (
                <CheckFont size={0.75} color={'red'}>
                  닉네임 형식을 확인해 주세요.
                </CheckFont>
              )
            ) : (
              <CheckFont size={0.75} color={'black'}>
                닉네임은 2-15자의 한글, 영어, 숫자입니다.
              </CheckFont>
            )}
          </FontBoxSide>

          <FontBox width={3.6875} height={1.5} margin={'1.125rem 18.5rem 0.625rem 1.25rem'}>
            {password ? (
              <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                비밀번호
              </KoreanFont>
            ) : (
              ''
            )}
          </FontBox>

          <RowBox margin={'0px 0px 0px 0px'}>
            <InputInfoNoneBorder
              width={18.75}
              height={2.5}
              margin={'0px 0px 0px 0.9375rem'}
              placeholder="비밀번호를 입력하세요."
              type={view ? 'password' : 'text'}
              value={password}
              onChange={onChangePw1}
              style={{
                borderRight: 'none',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
              }}
            ></InputInfoNoneBorder>
            <FontBox
              width={2.1875}
              height={2.5}
              margin={'0px 0.9375rem 0px 0px'}
              onMouseDown={() => setView(!view)}
              onMouseUp={() => setView(!view)}
              style={
                view
                  ? {
                      borderLeft: 'none',
                      border: '1px solid #dddddd',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      backgroundImage: 'url(/assets/closeeye.png)',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: '1.5625rem',
                    }
                  : {
                      borderLeft: 'none',
                      border: '1px solid #dddddd',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      backgroundImage: 'url(/assets/eye.png)',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: '1.5625rem',
                    }
              }
            ></FontBox>
          </RowBox>

          {password ? (
            CheckPassword(password) ? (
              <RowBox margin={'0.4375rem 0px 0px 0px'}>
                <InputInfoNoneBorder
                  width={18.75}
                  height={2.5}
                  margin={'0px 0px 0px 0.9375rem'}
                  placeholder="비밀번호를 재입력하세요."
                  type={view ? 'password' : 'text'}
                  value={password2}
                  onChange={onChangePw2}
                  style={{
                    borderRight: 'none',
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                  }}
                ></InputInfoNoneBorder>
                <FontBox
                  width={2.1875}
                  height={2.5}
                  margin={'0px 0.9375rem 0px 0px'}
                  onMouseDown={() => setView(!view)}
                  onMouseUp={() => setView(!view)}
                  style={
                    view
                      ? {
                          // borderLeft: 'none',
                          border: '1px solid #dddddd',
                          borderTopRightRadius: '6px',
                          borderBottomRightRadius: '6px',
                          backgroundImage: 'url(/assets/closeeye.png)',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: '1.5625rem',
                        }
                      : {
                          // borderLeft: 'none',
                          border: '1px solid #dddddd',
                          borderTopRightRadius: '6px',
                          borderBottomRightRadius: '6px',
                          backgroundImage: 'url(/assets/eye.png)',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: '1.5625rem',
                        }
                  }
                ></FontBox>
              </RowBox>
            ) : (
              <FontBoxSide width={21.25} height={1.3125} margin={'0.3125rem 0.9375rem 0px 1.25rem'}>
                <CheckFont size={0.75} color={'red'}>
                  비밀번호 형식을 확인해 주세요.
                </CheckFont>
              </FontBoxSide>
            )
          ) : (
            <FontBoxSide width={21.25} height={1.3125} margin={'0.3125rem 0.9375rem 0px 1.25rem'}>
              <CheckFont size={0.75} color={'black'}>
                비밀번호는 5-10자의 영문,숫자,특수문자(!@#$%^&*) 조합입니다.
              </CheckFont>
            </FontBoxSide>
          )}
          <FontBoxSide width={21.25} height={1.3125} margin={'0.3125rem 0.9375rem 0px 1.25rem'}>
            {password2 && (
              <CheckFont size={0.75} color={'blue'} isCorrect={password === password2}>
                {password === password2 ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}
              </CheckFont>
            )}
          </FontBoxSide>
          <BtnAble
            isDisable={!email || !nickname || !password || !password2}
            width={20.9375}
            height={4}
            margin={'1.6875rem 1.25rem 0rem 1.25rem'}
          >
            회원가입
          </BtnAble>

          <LineBox width={20.9375} height={0.0625} margin={'0.625rem 1.25rem 0.625rem 1.25rem'}></LineBox>
          <BtnBox
            width={20.9375}
            height={2.6875}
            margin={'0px 1.25rem 0px 1.25rem'}
            color={'white'}
            onClick={() => {
              nav('/login');
            }}
          >
            <KoreanFont size={0.875} color="#5F5F5F">
              로그인 페이지로 돌아가기
            </KoreanFont>
          </BtnBox>
        </InfoContainer>
      </PageLayout.Body>
    </PageLayout>
  );
};
