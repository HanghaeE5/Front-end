import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { registerApi } from '../api/callApi';
import { PageLayout } from '../component/layout/PageLayout';

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

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};

  background-color: #ffffff;
`;

const BoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #6922bb; */
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #683b3b; */
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
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

const CheckFont2 = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'black' : 'red') : props.color)};
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

const InputInfoNoneBorder = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  /* border-radius: 6px; */
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width};
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

const BtnBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #769cbc;
  border-radius: 6px;
  border: 1px solid #989898;

  width: ${(props: btnbox) => props.width};
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

export const SignUpEmail = () => {
  const [email, setNameText] = useState<string>('');
  const [emailCheckNumberInput, setEmailCheckNumberInput] = useState<boolean>(false);
  const [emailCheckNumber, setEmailCheckNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [, setEmailCheck] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const localToken = localStorage.getItem('recoil-persist');

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
    const regExp = /^[???-???|???-???|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };
  const checkPassword = (asValue: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{5,15}$/;
    return regExp.test(asValue);
  };

  // ????????? ???????????? ?????? API
  const emilCertificationData = useMutation((email: { email: string }) => registerApi.emilCertificationApi(email), {
    onSuccess: () => {
      alert(`${email} ????????? ????????? ??????????????? ??????????????????????`);
      setEmailCheckNumberInput(true);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      alert(error.response?.data.msg);
    },
  });

  const emilCertification = (email: { email: string }) => {
    emilCertificationData.mutate(email);
  };

  //????????? ???????????? ?????? ?????? API
  const emilCertificationNumberData = useMutation((data: FieldValues) => registerApi.emilCertificationNumberApi(data), {
    onSuccess: () => {
      // loginToken(token.headers.authorization.split(' ')[1]);
      console.log();
      alert('????????????????');
    },
    onError: () => {
      alert('??????????????? ?????? ??????????????????.');
    },
  });

  const emilCertificationNumber = (data: FieldValues) => {
    emilCertificationNumberData.mutate(data);
  };

  //????????? ???????????? API
  const nickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: () => {
      // loginToken(token.headers.authorization.split(' ')[1]);
      console.log();
      alert(`${nickname}?????? ???????????? ?????????????????????.`);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      alert(error.response?.data.msg);
    },
  });

  const nickCertification = (nick: { nick: string }) => {
    nickCertificationData.mutate(nick);
  };

  //???????????? API
  const joinData = useMutation((data: FieldValues) => registerApi.joinApi(data), {
    onSuccess: () => {
      // loginToken(token.headers.authorization.split(' ')[1]);
      console.log();
      alert(`${nickname}??? ????????????! ?????????????????????`);
      nav('/login');
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      alert(error.response?.data.msg);
    },
  });

  const join = (data: FieldValues) => {
    joinData.mutate(data);
  };

  useEffect(() => {
    //useEffect ?????? ?????? ?????? ?????????.
    if (localToken) {
      alert('??????????????????????? ???????????? ???????????????????????????????????');
      nav('/');
    }
  }, []);

  return (
    <PageLayout title="????????????">
      <InfoContainer>
        <ContentContainer>
          <Box width={7.125} height={1} margin={'3.3125rem auto 0rem auto'}>
            <LogoFontSmall>TODOWITH</LogoFontSmall>
          </Box>

          <Box width={2.8125} height={1.5} margin={'1.6875rem auto 0.625rem 5.7%'}>
            {email && (
              <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                ?????????
              </KoreanFont>
            )}
          </Box>
          <RowBox width={'100%'} margin={'0px 0px 0px 0px'}>
            <InputInfo
              width={'67%'}
              height={2.5}
              margin={'0rem 0.6875rem 0rem 1.25rem'}
              type="text"
              placeholder="?????????    ex) todowith@naver.com"
              name="email"
              value={email}
              onChange={onChangeEmail}
            ></InputInfo>

            <BtnAble
              isDisable={!checkEmail(email)}
              width={'19.4%'}
              height={2.625}
              margin={'0px 1.25rem 0px 0px'}
              // onClick={() => {
              //   setEmailCheck(true);
              //   setSend(true);
              //   const goEmilCertification = {
              //     email: email,
              //   };
              //   EmilCertification(goEmilCertification);
              // }}
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
              ??????
            </BtnAble>
          </RowBox>
          {(!send || !emailCheckNumberInput) && (
            <BoxSide width={20} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
              {email ? (
                <CheckFont size={0.75} color={'blue'} isCorrect={checkEmail(email)}>
                  {checkEmail(email) ? '?????? ????????? ???????????????. ?????? ????????? ???????????????.' : '???????????? ??????????????????'}
                </CheckFont>
              ) : (
                <CheckFont size={0.75} color={'black'}>
                  ???????????? ????????? ????????? ?????? ????????????(._-)??? ?????? ???????????????.
                </CheckFont>
              )}
            </BoxSide>
          )}

          {emailCheckNumberInput && checkEmail(email) && (
            <RowBox width={'100%'} margin={'0.4375rem 0px 0px 0px'}>
              <InputInfo
                width={'67%'}
                height={2.375}
                margin={'0rem 0.6875rem 0rem 1.25rem'}
                type="text"
                placeholder="???????????? ????????? ??????????????? ???????????????."
                name="emailchecknumber"
                value={emailCheckNumber}
                onChange={onChangeEmailCheckNumber}
              ></InputInfo>

              <BtnAble
                isDisable={!checkEmail(email)}
                width={'19.4%'}
                height={2.375}
                margin={'0px 1.25rem 0px 0px'}
                onClick={() => {
                  setEmailCheck(true);
                  const goEmilCertificationNumber = {
                    code: emailCheckNumber,
                    email: email,
                  };
                  emilCertificationNumber(goEmilCertificationNumber);
                }}
              >
                ??????
              </BtnAble>
            </RowBox>
          )}

          <Box width={2.8125} height={1.5} margin={'1.125rem auto 0.625rem 5.7%'}>
            {nickname && (
              <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                ?????????
              </KoreanFont>
            )}
          </Box>
          <RowBox width={'100%'} margin={'0px 0px 0px 0px'}>
            <InputInfo
              width={'67%'}
              height={2.5}
              margin={'0px 0.6875rem 0px 1.25rem'}
              type="text"
              placeholder="?????????    ex) ????????????3456"
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
              ????????????
            </BtnAble>
          </RowBox>
          <BoxSide width={20} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
            {nickname ? (
              <CheckFont size={0.75} color={'blue'} isCorrect={checkNickname(nickname)}>
                {checkNickname(nickname)
                  ? '?????? ????????? ???????????????. ?????? ?????? ????????? ???????????????.'
                  : '????????? ????????? ????????? ?????????.'}
              </CheckFont>
            ) : (
              <CheckFont size={0.75} color={'black'}>
                ???????????? 2-15?????? ??????, ??????, ???????????????.
              </CheckFont>
            )}
          </BoxSide>

          <Box width={3.6875} height={1.5} margin={'1.125rem auto 0.625rem 5.7%'}>
            {password && (
              <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                ????????????
              </KoreanFont>
            )}
          </Box>

          <RowBox
            width={'88.3%'}
            margin={'0'}
            style={{
              border: '1px solid #dddddd',
              borderRadius: '6px',
            }}
          >
            <InputInfoNoneBorder
              width={'85%'}
              height={2.5}
              margin={'0'}
              // margin={'0px 0px 0px 0.9375rem'}
              placeholder="??????????????? ???????????????."
              type={view ? 'text' : 'password'}
              value={password}
              onChange={onChangePw1}
              style={{
                border: 'none',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
              }}
            ></InputInfoNoneBorder>
            <Box
              width={'15%'}
              height={2.5}
              margin={'0'}
              onMouseDown={() => setView(!view)}
              onMouseUp={() => setView(!view)}
              style={{
                border: 'none',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '1.5625rem',
                backgroundImage: view ? 'url(/assets/eye.png)' : 'url(/assets/closeeye.png)',
              }}
            ></Box>
          </RowBox>

          {password && checkPassword(password) ? (
            <RowBox
              width={'88.3%'}
              margin={'0.4375rem 0 0 0'}
              style={{
                border: '1px solid #dddddd',
                borderRadius: '6px',
              }}
            >
              <InputInfoNoneBorder
                width={'85%'}
                height={2.5}
                margin={'0'}
                placeholder="??????????????? ??????????????????."
                type={view ? 'text' : 'password'}
                value={password2}
                onChange={onChangePw2}
                style={{
                  border: 'none',
                  borderTopLeftRadius: '6px',
                  borderBottomLeftRadius: '6px',
                }}
              ></InputInfoNoneBorder>
              <Box
                width={'15%'}
                height={2.5}
                margin={'0'}
                onMouseDown={() => setView(!view)}
                onMouseUp={() => setView(!view)}
                style={{
                  border: 'none',
                  borderTopRightRadius: '6px',
                  borderBottomRightRadius: '6px',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '1.5625rem',
                  backgroundImage: view ? 'url(/assets/eye.png)' : 'url(/assets/closeeye.png)',
                }}
              ></Box>
            </RowBox>
          ) : (
            <BoxSide width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
              <CheckFont2 size={0.75} color={'black'} isCorrect={!password}>
                {password
                  ? '???????????? ????????? ????????? ?????????.'
                  : '??????????????? 5-10?????? ??????,??????,????????????(!@#$%^&*) ???????????????.'}
              </CheckFont2>
            </BoxSide>
          )}

          <BoxSide width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
            {password2 && (
              <CheckFont size={0.75} color={'blue'} isCorrect={password === password2}>
                {password === password2 ? '??????????????? ???????????????' : '??????????????? ???????????? ????????????'}
              </CheckFont>
            )}
          </BoxSide>
          <BtnAble
            isDisable={!email || !nickname || !password || !password2}
            width={'88.2%'}
            height={4}
            margin={'1.6875rem 1.25rem 0rem 1.25rem'}
            onClick={() => {
              const goJoin = {
                email: email,
                nick: nickname,
                password: password,
              };
              join(goJoin);
            }}
          >
            ????????????
          </BtnAble>

          <LineBox width={20.9375} height={0.0625} margin={'0.625rem 1.25rem 0.625rem 1.25rem'}></LineBox>
          <BtnBox
            width={'88.2%'}
            height={2.6875}
            margin={'0px 1.25rem 0px 1.25rem'}
            color={'white'}
            onClick={() => {
              nav('/login');
            }}
          >
            <KoreanFont size={0.875} color="#5F5F5F">
              ????????? ???????????? ????????????
            </KoreanFont>
          </BtnBox>
        </ContentContainer>
      </InfoContainer>
    </PageLayout>
  );
};
