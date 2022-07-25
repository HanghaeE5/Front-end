import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { accessTokenState, snsSignupNickname } from '../recoil/store';

//추후 사용예정
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
      const isNickname = first[1].split('=')[1];
      console.log(accessToken);
      if (isNickname === 'N') {
        setSnsSignupNicknameOk(false);
        nav('/signupsns');
      } else if (isNickname === 'Y') {
        window.location.replace('/');
      }
    }
    if (!localToken) {
      nav('/login');
    }
  }, [localToken]);

  return <div>로그인중</div>;
};
