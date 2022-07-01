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
  background-color: #24c5c3;
  margin: 0px auto 74px auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 60px;
  background-color: #883838;
  margin: 0px auto 0px auto;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 508px;
  /* background-color: #f5e28d; */
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

export const SignUpEmail = () => {
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

  const [emailCheck, setEmailCheck] = useState<boolean>(true);

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
  const [email, setNameText] = useState<string>('');
  const [emailCheckNumber, setEmailCheckNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const nav = useNavigate();

  const [view, setView] = useState<boolean>(true);

  return (
    <>
      <HeaderContainer>
        <RowBox margin={'17px 0px 15px 0px'}>
          <IconBox
            width={8}
            height={16}
            margin={'0px 0px 0x 20px'}
            style={{ backgroundImage: 'url(/assets/back.png)' }}
            onClick={() => {
              nav('/login');
            }}
          ></IconBox>
          <FontBox width={69} height={27} margin={'0px 153px 0px 125px'}>
            <EnglishFont size={18} color="#000000">
              Sign Up
            </EnglishFont>
          </FontBox>
        </RowBox>
        <LineBox width={375} height={1} margin={'0'}></LineBox>
      </HeaderContainer>

      <RegisterContainer>
        <InfoContainer>
          <FontBox width={114} height={16} margin={'53px 131px 0px 130px'}>
            <LogoFontSmall>TODOWITH</LogoFontSmall>
          </FontBox>

          {/* 이메일 */}
          <FontBox width={45} height={24} margin={'27px 310px 10px 20px'}>
            {email ? (
              <KoreanFont size={16} color="rgba(147, 147, 147, 1)">
                이메일
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
              placeholder="이메일    ex) todowith@naver.com"
              name="email"
              value={email}
              onChange={onChangeEmail}
            ></InputInfo>
            {CheckEmail(email) ? (
              <BtnAble
                width={73}
                height={42}
                margin={'0px 20px 0px 0px'}
                onClick={() => {
                  setEmailCheck(true);
                }}
              >
                인증
              </BtnAble>
            ) : (
              <BtnDisable width={73} height={42} margin={'0px 20px 0px 0px'}>
                인증
              </BtnDisable>
            )}
          </RowBox>
          <FontBoxSide width={320} height={21} margin={'5px 35px 0px 20px'}>
            {email ? (
              CheckEmail(email) ? (
                <CheckFont size={12} color={'blue'}>
                  사용 가능한 형식입니다. 인증 버튼을 눌러주세요.
                </CheckFont>
              ) : (
                <CheckFont size={12} color={'red'}>
                  이메일을 확인해 주세요.
                </CheckFont>
              )
            ) : (
              <CheckFont size={12} color={'black'}>
                이메일은 영문과 숫자와 일부 특수문자(._-)만 입력 가능합니다.
              </CheckFont>
            )}
          </FontBoxSide>

          {emailCheck ? (
            <InputInfo
              width={251}
              height={38}
              margin={'7px 104px 0px 20px'}
              type="text"
              placeholder="이메일로 발송된 인증번호를 입력하세요."
              name="emailchecknumber"
              value={emailCheckNumber}
              onChange={onChangeEmailCheckNumber}
            ></InputInfo>
          ) : (
            ''
          )}

          <FontBox width={45} height={24} margin={'18px 310px 10px 20px'}>
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

          <FontBox width={59} height={24} margin={'18px 296px 10px 20px'}>
            {password ? (
              <KoreanFont size={16} color="rgba(147, 147, 147, 1)">
                비밀번호
              </KoreanFont>
            ) : (
              ''
            )}
          </FontBox>

          <RowBox margin={'0px 0px 0px 0px'}>
            <InputInfoNoneBorder
              width={300}
              height={40}
              margin={'0px 0px 0px 15px'}
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
              width={35}
              height={40}
              margin={'0px 15px 0px 0px'}
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
                      backgroundSize: '25px',
                    }
                  : {
                      borderLeft: 'none',
                      border: '1px solid #dddddd',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      backgroundImage: 'url(/assets/eye.png)',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: '25px',
                    }
              }
            ></FontBox>
          </RowBox>

          {password ? (
            CheckPassword(password) ? (
              <RowBox margin={'7px 0px 0px 0px'}>
                <InputInfoNoneBorder
                  width={300}
                  height={40}
                  margin={'0px 0px 0px 15px'}
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
                  width={35}
                  height={40}
                  margin={'0px 15px 0px 0px'}
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
                          backgroundSize: '25px',
                        }
                      : {
                          // borderLeft: 'none',
                          border: '1px solid #dddddd',
                          borderTopRightRadius: '6px',
                          borderBottomRightRadius: '6px',
                          backgroundImage: 'url(/assets/eye.png)',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: '25px',
                        }
                  }
                ></FontBox>
              </RowBox>
            ) : (
              <FontBoxSide width={340} height={21} margin={'5px 15px 0px 20px'}>
                <CheckFont size={12} color={'red'}>
                  비밀번호 형식을 확인해 주세요.
                </CheckFont>
              </FontBoxSide>
            )
          ) : (
            <FontBoxSide width={340} height={21} margin={'5px 15px 0px 20px'}>
              <CheckFont size={12} color={'black'}>
                비밀번호는 5-10자의 영문,숫자,특수문자(!@#$%^&*) 조합입니다.
              </CheckFont>
            </FontBoxSide>
          )}
          <FontBoxSide width={340} height={21} margin={'5px 15px 0px 20px'}>
            {password2 ? (
              password === password2 ? (
                <CheckFont size={12} color={'blue'}>
                  비밀번호가 일치합니다.
                </CheckFont>
              ) : (
                <CheckFont size={12} color={'red'}>
                  비밀번호가 일치하지 않습니다.
                </CheckFont>
              )
            ) : (
              ''
            )}
          </FontBoxSide>
        </InfoContainer>

        {email && password ? (
          <BtnAble width={335} height={64} margin={'27px 20px 0px 20px'}>
            <KoreanFont size={17} color="white">
              회원가입
            </KoreanFont>
          </BtnAble>
        ) : (
          <BtnDisable width={335} height={64} margin={'27px 20px 0px 20px'}>
            <KoreanFont size={17} color="white">
              회원가입
            </KoreanFont>
          </BtnDisable>
        )}
        <LineBox width={335} height={1} margin={'10px 20px 10px 20px'}></LineBox>
        <BtnBox
          width={335}
          height={43}
          margin={'0px 20px 0px 20px'}
          color={'white'}
          onClick={() => {
            nav('/login');
          }}
        >
          <KoreanFont size={14} color="#5F5F5F">
            로그인 페이지로 돌아가기
          </KoreanFont>
        </BtnBox>
      </RegisterContainer>
    </>
  );
};
