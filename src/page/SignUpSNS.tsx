import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { registerApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { accessTokenState, popNotiState, userInfoState } from '../recoil/store';
import { PopNoti } from '../component/element/PopNoti';
import { EvBox, EvBtnAble, EvInputInfo, EvKoreanFont, EvCheckFont, EvAbleFont } from '../component/element/BoxStyle';

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
  const [check, setCheck] = useState<boolean>(false);
  const accessLoginToken = useSetRecoilState(accessTokenState);

  const localToken = localStorage.getItem('accessToken');

  type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';

  const nav = useNavigate();

  const checkNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  //닉네임 중복확인 API
  const nickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: () => {
      setPopNoti({
        openPopNoti: true,
        informType: 'success',
        informMsg: `${nickname}으로 닉네임이 설정되었습니다.`,
      });
      setCheck(true);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      setPopNoti({
        openPopNoti: true,
        informType: 'warning',
        informMsg: error.response?.data.msg,
      });
      setCheck(false);
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
      setPopNoti({
        openPopNoti: true,
        informType: 'success',
        informMsg: `${nickname}님 반가워요!`,
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

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (userInfoData.nick) {
      setPopNoti({
        openPopNoti: true,
        informType: 'warning',
        informMsg: '🙅🏻‍♀️회원가입이 완료되었습니다. 닉네임 변경을 이용해주세요🙅🏻‍♀️',
        btnNav: '-1',
      });
    }
  }, [userInfoData]);

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
        <EvBox width={'10.5rem'} height={1.5} margin={'4.75rem auto 0px auto'} url="url(/assets/TODOWITH.svg)"></EvBox>

        <EvBox width={2.8125} height={1.5} margin={'5rem auto 0.625rem 5.3%'}>
          {nickname && (
            <EvKoreanFont size={1} color="#939393" weight={700}>
              닉네임
            </EvKoreanFont>
          )}
        </EvBox>

        <EvBox direction={'row'} width={'100%'} margin={'0px 0px 0px 0px'}>
          <EvBox
            direction={'row'}
            width={'66.9%'}
            margin={'auto auto auto 1.25rem'}
            border="1px solid #dddddd"
            borderRadius="6px"
          >
            <EvInputInfo
              width={'85%'}
              height={3.75}
              margin={'0'}
              helfBorder={true}
              type="text"
              placeholder="닉네임    ex) 투두윗3456"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
            <EvBox
              width={'15%'}
              height={3.75}
              margin={'0'}
              helfBorder={true}
              backgroundsize={'1.5rem'}
              url={check ? 'url(/assets/checkyellow.svg)' : 'url(/assets/checkgray.svg)'}
            ></EvBox>
          </EvBox>

          <EvBtnAble
            isDisable={!checkNickname(nickname)}
            width={'19.4%'}
            height={3.75}
            margin={'0px 1.25rem 0px 0px'}
            onClick={
              checkNickname(nickname)
                ? () => {
                    const goNickCertification = {
                      nick: nickname,
                    };
                    // nickCertification(goNickCertification);
                  }
                : () => {
                    null;
                  }
            }
          >
            <EvKoreanFont size={1} color="#939393" weight={500}>
              {check ? '확인완료' : '중복확인'}
            </EvKoreanFont>
          </EvBtnAble>
        </EvBox>

        <EvBox isAlignSide={true} width={20} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
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
        </EvBox>

        <EvBox
          width={'89.3%'}
          height={0.0625}
          margin={'5.125rem 1.25rem 0px 1.25rem'}
          style={{ backgroundColor: '#989898' }}
        ></EvBox>

        <EvBtnAble
          isDisable={!check}
          width={'89.3%'}
          height={3.75}
          margin={'2.9375rem 1.25rem 0px 1.25rem'}
          onClick={() => {
            const gojoinSocial = {
              nick: nickname,
            };
            joinSocial(gojoinSocial);
          }}
        >
          <EvAbleFont size={0.875} isDisable={!check} weight={500}>
            회원가입
          </EvAbleFont>
        </EvBtnAble>
      </ContentContainer>
    </RegisterContainer>
  );
};
