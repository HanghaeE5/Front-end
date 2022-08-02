import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userApi } from '../api/callApi';
import { EvImgBox } from '../component/element/BoxStyle';
import { accessTokenState, snsSignupNickname } from '../recoil/store';
import { EventContentWrapper } from './EventPage';

export const LoginWait = () => {
  const [accessLoginToken, setAccessLoginToken] = useRecoilState(accessTokenState);
  const [snsSignupNicknameOk, setSnsSignupNicknameOk] = useRecoilState(snsSignupNickname);
  const localToken = localStorage.getItem('recoil-persist');
  const all = window.location.href;

  const first = all.split('&');
  const accessToken = first[0].split('=')[1];
  const nav = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setAccessLoginToken(accessToken);
      const isNickname = first[1].split('=')[1].slice(0, 1);
      // console.log(accessToken);
      // console.log(isNickname);
      if (isNickname === 'N') {
        setSnsSignupNicknameOk(false);
        nav('/signupsns');
      } else if (isNickname === 'Y') {
        setSnsSignupNicknameOk(true);
        nav('/main');
      }
    } else if (!localToken) {
      // console.log('로그인대기창에서 보내는것');
      nav('/login');
    }
  }, [localToken]);

  return (
    <EventContentWrapper>
      <EvImgBox width={'17rem'} height={15} margin="auto" url="url(/assets/캐릭터/브라우니2단계.gif)"></EvImgBox>
    </EventContentWrapper>
  );
};
