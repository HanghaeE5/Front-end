import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { registerApi } from '../api/callApi';
import {
  EvAbleFont,
  EvBtn,
  EvBtnAble,
  EvCheckHelfBox,
  EvColumnBox,
  EvFontBox,
  EvHelfInputInfo,
  EvInputInfo,
  EvKoreanFont,
  EvLineBox,
  EvLogoBox,
  EvRowBox,
} from '../component/element/BoxStyle';
import { PageLayout } from '../component/layout/PageLayout';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import { popNotiState } from '../recoil/store';
import { PATH } from '../route/routeList';

const InfoContainer = styled.div`
  height: 100%;
  /* background-color: #f5b9d5; */
  position: relative;
  overflow-y: auto;
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

type font = {
  size: number;
  color: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'blue' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const CheckFont2 = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'black' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

export const SignUpInputInfo = styled(EvInputInfo)`
  border: none;
  width: 85%;
  height: 3.75rem;
  margin: 0;
`;

export const SignUpBtnAble = styled(EvBtnAble)`
  width: 22.6%;
  height: 3.75rem;
  margin: 0 0 0 auto;
`;

export const SignUpEmail = () => {
  const [email, setNameText] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [emailCheckNumberInput, setEmailCheckNumberInput] = useState<boolean>(false);
  const [emailCheckNumber, setEmailCheckNumber] = useState<string>('');
  const [emailCheckNumberOK, setEmailCheckNumberOK] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const [send, setSend] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const localToken = localStorage.getItem('recoil-persist');
  const [popNoti, setPopNoti] = useRecoilState(popNotiState);

  const nav = useNavigate();

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

  const checkEmail = (asValue: string) => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  };
  const checkNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };
  const checkPassword = (asValue: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{5,15}$/;
    return regExp.test(asValue);
  };

  const joinDisable =
    !emailCheck ||
    !emailCheckNumberOK ||
    !nicknameCheck ||
    password != password2 ||
    !password ||
    !checkEmail(email) ||
    !checkNickname(nickname) ||
    !checkPassword(password);

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  // 이메일 인증번호 발송 API
  const emilCertificationData = useMutation((email: { email: string }) => registerApi.emilCertificationApi(email), {
    onSuccess: () => {
      openSuccessConfirm({
        title: `${email} 메일로 발송된 인증번호를 입력해주세요🙂`,
      });
      setEmailCheckNumberInput(true);
    },

    onError: (error: AxiosError<{ msg: string }>) => {
      openErrorConfirm({
        title: error.response?.data.msg,
      });
    },
  });

  const emilCertification = (email: { email: string }) => {
    emilCertificationData.mutate(email);
  };

  //이메일 인증번호 일치 확인 API
  const emilCertificationNumberData = useMutation(
    (data: { code: string; email: string }) => registerApi.emilCertificationNumberApi(data),
    {
      onSuccess: () => {
        // loginToken(token.headers.authorization.split(' ')[1]);
        setEmailCheckNumberOK(true);
        openSuccessConfirm({
          title: '인증완료🙂',
        });
      },

      onError: () => {
        openErrorConfirm({
          title: '인증번호를 다시 확인해주세요.',
        });
      },
    },
  );

  const emilCertificationNumber = (data: { code: string; email: string }) => {
    emilCertificationNumberData.mutate(data);
  };

  //닉네임 중복확인 API
  const nickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: () => {
      // loginToken(token.headers.authorization.split(' ')[1]);
      setNicknameCheck(true);
      openSuccessConfirm({
        title: `${nickname}으로 닉네임이 설정되었습니다.`,
      });
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      openErrorConfirm({
        title: error.response?.data.msg,
      });
    },
  });

  const nickCertification = (nick: { nick: string }) => {
    nickCertificationData.mutate(nick);
  };

  const referrer = document.referrer;

  //회원가입 API
  const joinData = useMutation((data: { email: string; nick: string; password: string }) => registerApi.joinApi(data), {
    onSuccess: () => {
      openSuccessConfirm({
        title: `${nickname}님 반가워요! 로그인해주세요`,
        button: {
          text: '확인',
          onClick: () => nav('/login'),
        },
      });
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      openErrorConfirm({
        title: error.response?.data.msg,
      });
    },
  });

  const join = (data: { email: string; nick: string; password: string }) => {
    joinData.mutate(data);
  };

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (localToken) {
      openErrorConfirm({
        title: '🙅🏻‍♀️이미 로그인이 되어있습니다🙅🏻‍♀️',
        content: '신규가입은 로그아웃 후 가능합니다.',
        button: {
          text: '확인',
          onClick:
            referrer.indexOf('login' || 'signupemail' || '/signupsns' || '/choosecharacter') === -1
              ? () => nav(PATH.MAIN)
              : () => nav(referrer),
        },
      });
    }
  }, [localToken]);

  return (
    <PageLayout title="회원가입">
      <InfoContainer>
        <ContentContainer>
          <EvLogoBox margin={'3.4375rem auto 0 auto'} />

          {/* 이메일 */}
          <EvFontBox width={2.8125} height={1.5} margin={'2.5rem auto 0.625rem 5.3%'}>
            {email && (
              <EvKoreanFont size={1} weight={700} color="rgba(147, 147, 147, 1)">
                이메일
              </EvKoreanFont>
            )}
          </EvFontBox>
          <EvRowBox width={'89.3%'}>
            <EvRowBox width={'75%'} margin={'0 auto 0 0 '} border="1px solid #dddddd" borderRadius="6px">
              <SignUpInputInfo
                type="text"
                placeholder="이메일    예) todo@naver.com"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              <EvCheckHelfBox
                width={'15%'}
                height={3.75}
                margin={'0'}
                backgroundsize={'1.5rem'}
                url={emailCheck ? 'url(/assets/checkyellow.svg)' : 'url(/assets/checkgray.svg)'}
              />
            </EvRowBox>
            <SignUpBtnAble
              isDisable={!checkEmail(email)}
              onClick={
                checkEmail(email)
                  ? () => {
                      setEmailCheck(true);
                      setSend(true);
                      const goEmilCertification = {
                        email: email,
                      };
                      emilCertification(goEmilCertification);
                    }
                  : () => {
                      null;
                    }
              }
            >
              <EvAbleFont size={0.875} color="#939393" weight={500} isDisable={!checkEmail(email)}>
                {emailCheck ? '유효확인' : '인증'}
              </EvAbleFont>
            </SignUpBtnAble>
          </EvRowBox>
          {(!send || !emailCheckNumberInput) && (
            <EvFontBox width={20} height={1.3125} margin={'0.3125rem auto 0px 5.3%'}>
              {email ? (
                <CheckFont size={0.75} color={'blue'} isCorrect={checkEmail(email)}>
                  {checkEmail(email) ? '사용 가능한 형식입니다. 인증 버튼을 눌러주세요.' : '이메일을 확인해주세요'}
                </CheckFont>
              ) : (
                <CheckFont size={0.75} color={'black'}>
                  이메일은 영문과 숫자와 일부 특수문자(._-)만 입력 가능합니다.
                </CheckFont>
              )}
            </EvFontBox>
          )}

          {/* 이메일 인증 */}
          {emailCheckNumberInput && checkEmail(email) && (
            <EvRowBox width={'89.3%'} margin={'0.4375rem 0px 0px 0px'}>
              <EvRowBox width={'75%'} margin={'0 auto 0 0 '} border="1px solid #dddddd" borderRadius="6px">
                <SignUpInputInfo
                  type="text"
                  placeholder="인증번호 6자리"
                  name="emailchecknumber"
                  value={emailCheckNumber}
                  onChange={onChangeEmailCheckNumber}
                />
                <EvCheckHelfBox
                  width={'15%'}
                  height={3.75}
                  margin={'0'}
                  backgroundsize={'1.5rem'}
                  url={emailCheckNumberOK ? 'url(/assets/checkyellow.svg)' : 'url(/assets/checkgray.svg)'}
                />
              </EvRowBox>
              <SignUpBtnAble
                isDisable={!emailCheckNumber}
                onClick={
                  !emailCheckNumber
                    ? () => {
                        null;
                      }
                    : () => {
                        setEmailCheck(true);
                        const goEmilCertificationNumber = {
                          code: emailCheckNumber,
                          email: email,
                        };
                        emilCertificationNumber(goEmilCertificationNumber);
                      }
                }
              >
                <EvAbleFont size={0.875} color="#939393" weight={500} isDisable={!emailCheckNumberOK}>
                  {emailCheckNumberOK ? '인증완료' : '확인'}
                </EvAbleFont>
              </SignUpBtnAble>
            </EvRowBox>
          )}

          {/* 닉네임 */}
          <EvFontBox width={2.8125} height={1.5} margin={'1.625rem auto 0.625rem 5.3%'}>
            {nickname && (
              <EvKoreanFont size={1} weight={700} color="rgba(147, 147, 147, 1)">
                닉네임
              </EvKoreanFont>
            )}
          </EvFontBox>
          <EvRowBox width={'89.3%'} margin={'0 auto'}>
            <EvRowBox width={'75%'} margin={'0 auto 0 0 '} border="1px solid #dddddd" borderRadius="6px">
              <SignUpInputInfo
                type="text"
                placeholder="닉네임    예) 오늘투두윗"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
              />
              <EvCheckHelfBox
                width={'15%'}
                height={3.75}
                margin={'0'}
                backgroundsize={'1.5rem'}
                url={nicknameCheck ? 'url(/assets/checkyellow.svg)' : 'url(/assets/checkgray.svg)'}
              />
            </EvRowBox>

            <SignUpBtnAble
              isDisable={!checkNickname(nickname)}
              onClick={
                checkNickname(nickname)
                  ? () => {
                      const goNickCertification = {
                        nick: nickname,
                      };
                      nickCertification(goNickCertification);
                    }
                  : () => {
                      null;
                    }
              }
            >
              <EvAbleFont size={0.875} color="#939393" weight={500} isDisable={!nickname}>
                {nicknameCheck ? '확인완료' : '중복확인'}
              </EvAbleFont>
            </SignUpBtnAble>
          </EvRowBox>
          <EvFontBox width={20} height={1.3125} margin={'0.3125rem auto 0px 5.3%'}>
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
          </EvFontBox>

          <EvFontBox width={3.6875} height={1.5} margin={'1.625rem auto 0.625rem 5.3%'}>
            {password && (
              <EvKoreanFont size={1} weight={700} color="rgba(147, 147, 147, 1)">
                비밀번호
              </EvKoreanFont>
            )}
          </EvFontBox>

          <EvRowBox width={'89.3%'} borderRadius="6px" border="1px solid #dddddd">
            <EvHelfInputInfo
              width={'85%'}
              height={3.75}
              margin={'0 auto 0 0'}
              placeholder="비밀번호"
              type={view ? 'text' : 'password'}
              value={password}
              onChange={onChangePw1}
            />
            <EvCheckHelfBox
              width={'15%'}
              height={3.75}
              margin={'0 0 0 auto'}
              isCursor={true}
              onMouseDown={() => setView(!view)}
              onMouseUp={() => setView(!view)}
              backgroundsize={view ? '1.4rem' : '1.25rem'}
              url={view ? 'url(/assets/eye.svg)' : 'url(/assets/closeeye.svg)'}
            />
          </EvRowBox>

          {password && checkPassword(password) ? (
            <>
              <EvRowBox width={'89.3%'} margin={'0.4375rem 0 0 0'} border="1px solid #dddddd" borderRadius="6px">
                <EvHelfInputInfo
                  width={'85%'}
                  height={3.75}
                  margin={'0 auto 0 0'}
                  placeholder="비밀번호 재입력"
                  type={view ? 'text' : 'password'}
                  value={password2}
                  onChange={onChangePw2}
                />
                <EvCheckHelfBox
                  width={'15%'}
                  height={3.75}
                  margin={'0 0 0 auto'}
                  isCursor={true}
                  onMouseDown={() => setView(!view)}
                  onMouseUp={() => setView(!view)}
                  backgroundsize={view ? '1.4rem' : '1.25rem'}
                  url={view ? 'url(/assets/eye.svg)' : 'url(/assets/closeeye.svg)'}
                />
              </EvRowBox>
              <EvFontBox width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.3%'}>
                {password2 && (
                  <CheckFont size={0.75} color={'blue'} isCorrect={password === password2}>
                    {password === password2 ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}
                  </CheckFont>
                )}
              </EvFontBox>
            </>
          ) : (
            <EvFontBox width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.3%'}>
              <CheckFont2 size={0.75} color={'black'} isCorrect={!password}>
                {password
                  ? '비밀번호 형식을 확인해 주세요.'
                  : '비밀번호는 5-10자의 영문,숫자,특수문자(!@#$%^&*) 조합입니다.'}
              </CheckFont2>
            </EvFontBox>
          )}

          <EvBtnAble
            isDisable={joinDisable}
            width={'89.3%'}
            height={4}
            margin={'4.125rem 1.25rem 0rem 1.25rem'}
            onClick={
              joinDisable
                ? () => {
                    null;
                  }
                : () => {
                    const goJoin = {
                      email: email,
                      nick: nickname,
                      password: password,
                    };
                    join(goJoin);
                  }
            }
          >
            <EvAbleFont size={1.0625} isDisable={joinDisable} weight={700}>
              인증 후 회원가입
            </EvAbleFont>
          </EvBtnAble>

          <EvLineBox width={'89.3%'} margin={'1.875rem auto'} />
          <EvBtn
            width={'89.3%'}
            height={3.75}
            margin={'0 auto'}
            background="#ffffff"
            onClick={() => {
              nav('/login');
            }}
          >
            <EvKoreanFont size={0.875} weight={500} color="#989898">
              로그인 페이지로 돌아가기
            </EvKoreanFont>
          </EvBtn>
        </ContentContainer>
      </InfoContainer>
    </PageLayout>
  );
};
