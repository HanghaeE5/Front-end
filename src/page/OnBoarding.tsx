import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { registerApi, userApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { accessTokenState, popNotiState, userInfoState } from '../recoil/store';
import { PopNoti } from '../component/element/PopNoti';

import { EvBtnAble, EvAbleFont, EnterPageContainer, EnterContentContainer } from '../component/element/BoxStyle';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import { PATH } from '../route/routeList';
import { OnBoardingSplide } from '../component/element/OnBoardingSplide';

export const OnBoarding = () => {
  const nav = useNavigate();
  return (
    <EnterPageContainer>
      <EnterContentContainer>
        <OnBoardingSplide />

        <EvBtnAble
          width={'89.3% '}
          height={3.75}
          margin={'2rem auto 4rem auto'}
          onClick={() => {
            nav('/login');
          }}
        >
          <EvAbleFont size={1.0625} weight={700}>
            로그인 바로가기
          </EvAbleFont>
        </EvBtnAble>
      </EnterContentContainer>
    </EnterPageContainer>
  );
};
