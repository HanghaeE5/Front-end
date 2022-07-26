import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { registerApi, userApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { accessTokenState, popNotiState, snsSignupNickname, userInfoState } from '../recoil/store';
import {
  EvBox,
  EvBtnAble,
  EvInputInfo,
  EvKoreanFont,
  EvCheckFont,
  EvAbleFont,
  EvLogoBox,
  EvRowBox,
  EvColumnBox,
  EvFontBox,
  EvHelfInputInfo,
  EvCheckHelfBox,
  EvLineBox,
} from '../component/element/BoxStyle';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import { PATH } from '../route/routeList';

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

export const SignUpSNS = () => {
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [nickname, setNickname] = useState<string>('');
  const [popNoti, setPopNoti] = useRecoilState(popNotiState);
  const [snsSignupNicknameOk, setSnsSignupNicknameOk] = useRecoilState(snsSignupNickname);
  const [check, setCheck] = useState<boolean>(false);
  const accessLoginToken = useSetRecoilState(accessTokenState);

  const localToken = localStorage.getItem('recoil-persist');

  type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';

  const nav = useNavigate();

  const checkNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  //닉네임 중복확인 API
  const nickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: () => {
      openSuccessConfirm({
        title: `${nickname}으로 닉네임이 설정되었습니다.`,
        // button: { text: '확인', onClick: () => null },
      });
      setCheck(true);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => nickCertification({ nick: nickname }), 200);
      } else {
        openErrorConfirm({ title: error.response?.data.msg });
        setCheck(false);
      }
    },
  });

  const nickCertification = (nick: { nick: string }) => {
    nickCertificationData.mutate(nick);
  };

  //소셜로그인 닉네임 저장 API
  const joinSocialApiData = useMutation((nick: { nick: string }) => registerApi.joinSocialApi(nick), {
    onSuccess: (token) => {
      localStorage.clear();
      accessLoginToken(token.headers.authorization);
      openSuccessConfirm({
        title: `${nickname}님 반가워요!`,
        button: {
          text: '확인',
          onClick: () => {
            setSnsSignupNicknameOk(true), nav('/choosecharacter');
          },
        },
      });
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => joinSocial({ nick: nickname }), 200);
      } else {
        setPopNoti({
          openPopNoti: true,
          informType: 'warning',
          informMsg: error.response?.data.msg,
        });
      }
    },
  });

  const joinSocial = (nick: { nick: string }) => {
    joinSocialApiData.mutate(nick);
  };
  console.log(snsSignupNicknameOk);

  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserInfoData(data.data);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.response?.data.msg === '해당 캐릭터가 존재하지 않습니다') {
        openErrorConfirm({
          title: '🙅🏻‍♀️닉네임 변경을 이용해주세요🙅🏻‍♀️',
          content: '이미 회원가입이 완료되었습니다. ',
          button: { text: '확인', onClick: () => nav('/choosecharacter') },
        });
      } else if (error.response?.data.msg === '사용자를 찾을 수 없습니다') {
        openErrorConfirm({
          title: '🙅🏻‍♀️사용자를 찾을 수 없습니다🙅🏻‍♀️',
          content: '다시 로그인을 해도 동일한 경우, 회원가입을 해주세요',
          button: {
            text: '확인',
            onClick: () => {
              localStorage.clear();
              nav('/login');
            },
          },
        });
      }
    },
  });

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.

    if (userInformData.status === 'success' && userInformData.data.data.nick) {
      openErrorConfirm({
        title: '🙅🏻‍♀️닉네임 변경을 이용해주세요🙅🏻‍♀️',
        content: '이미 회원가입이 완료되었습니다. ',
        button: { text: '확인', onClick: () => nav(PATH.MAIN) },
      });
    }
  }, [userInformData.status]);

  useEffect(() => {
    if (snsSignupNicknameOk === true) {
      nav('/choosecharacter');
    } else if (!localToken) {
      nav('/login');
    }
  }, [snsSignupNicknameOk]);

  return (
    <RegisterContainer>
      <HeaderContainer style={{ borderBottom: '1px solid #DDDDDD ' }}>
        <EvBox direction={'row'} margin={'1rem 0px 1rem   0px'}>
          <EvBox height={1.6875} margin={'0px auto'}>
            <EvKoreanFont size={1.125} color="#000000" weight={700}>
              회원가입
            </EvKoreanFont>
          </EvBox>
        </EvBox>
      </HeaderContainer>

      <ContentContainer>
        <EvLogoBox margin={'3.4375rem auto 0 auto'} />
        <EvFontBox width={2.8125} height={1.5} margin={'4.375rem auto 0.625rem 5.3%'}>
          {nickname && (
            <EvKoreanFont size={1} color="#939393" weight={700}>
              닉네임
            </EvKoreanFont>
          )}
        </EvFontBox>

        <EvRowBox width={'89.3%'} margin={'0 auto'}>
          <EvRowBox width={'75%'} margin={'0 auto 0 0 '} border="1px solid #dddddd" borderRadius="6px">
            <EvHelfInputInfo
              width={'85%'}
              height={3.75}
              margin={'0 auto 0 0'}
              type="text"
              placeholder="닉네임    ex) 투두윗3456"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
            <EvCheckHelfBox
              width={'15%'}
              height={3.75}
              margin={'0 0 0 auto'}
              backgroundsize={'1.5rem'}
              url={check ? 'url(/assets/checkyellow.svg)' : 'url(/assets/checkgray.svg)'}
            />
          </EvRowBox>

          <EvBtnAble
            isDisable={!checkNickname(nickname)}
            width={'22.6%'}
            height={3.75}
            margin={'0 0 0 auto'}
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
            <EvAbleFont size={1} color="#939393" weight={500} isDisable={!nickname}>
              {check ? '확인완료' : '중복확인'}
            </EvAbleFont>
          </EvBtnAble>
        </EvRowBox>

        <EvFontBox isAlignSide={true} width={20} height={1.3125} margin={'0.3125rem auto 0px 5.3%'}>
          {check ? (
            <EvCheckFont size={0.875} color={'blue'}>
              중복되지 않는 새로운 닉네임입니다.
            </EvCheckFont>
          ) : nickname ? (
            <EvCheckFont size={0.875} color={'blue'} isCorrect={checkNickname(nickname)}>
              {checkNickname(nickname)
                ? '사용 가능한 형식입니다. 중복 확인 버튼을 눌러주세요.'
                : '닉네임 형식을 확인해 주세요.'}
            </EvCheckFont>
          ) : (
            <EvCheckFont size={0.875} color={'black'}>
              닉네임은 2-15자의 한글, 영어, 숫자입니다.
            </EvCheckFont>
          )}
        </EvFontBox>

        <EvLineBox width={'89.3%'} margin={'9rem 1.25rem 0px 1.25rem'} />

        <EvBtnAble
          isDisable={!check}
          width={'89.3%'}
          height={3.75}
          margin={'1.4375rem 1.25rem 0px 1.25rem'}
          onClick={
            check
              ? () => {
                  const gojoinSocial = {
                    nick: nickname,
                  };
                  joinSocial(gojoinSocial);
                }
              : () => null
          }
        >
          <EvAbleFont size={0.875} isDisable={!check} weight={500}>
            회원가입
          </EvAbleFont>
        </EvBtnAble>
      </ContentContainer>
    </RegisterContainer>
  );
};
