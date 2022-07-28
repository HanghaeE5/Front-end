import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userApi } from '../api/callApi';
import { Wrapper } from '../component/element';
import { EvBtn, EvBtnAble, EvColumnBox, EvFontBox, EvImgBox, EvKoreanFont } from '../component/element/BoxStyle';
import { accessTokenState, snsSignupNickname } from '../recoil/store';

export const MainPageWrapper = styled(Wrapper)`
  max-width: 768px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MediaType = () => {
  const localToken = localStorage.getItem('recoil-persist');

  const nav = useNavigate();

  function checkMobile() {
    const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    // alert(varUA);
    if (varUA.indexOf('android') > -1) {
      if (varUA.indexOf('naver') != -1) {
        //안드로이드 네이버
        return 'phoneNaver';
      } else if (varUA.indexOf('samsungbrowser') != -1) {
        //안드로이드 삼성
        return 'phoneSamsung';
      }
      //네이버, 삼성 아닌 안드로이드
      return 'other';
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
      //IOS
      return 'other';
    } else {
      //아이폰, 안드로이드 외
      return 'other';
    }
  }

  if (checkMobile() === 'phoneNaver' || checkMobile() === 'phoneSamsung') {
    return (
      <MainPageWrapper>
        <EvFontBox width={'100%'} height={8} backgroundColor="#FFD600 " margin="5rem auto 0 auto">
          <EvKoreanFont weight={500} size={1.1} lineHeight={'20px'} align={'center'} style={{ whiteSpace: 'pre-line' }}>
            {`안드로이드(갤럭시, LG 등) 기종은\n크롬, 카카오 브라우저 이용을 부탁드립니다.\n
            삼성 기본브라우저, 네이버앱에서는\n서비스 이용이 제한됩니다😥`}
          </EvKoreanFont>
        </EvFontBox>
        <EvImgBox width={'17rem'} height={15} margin="1rem auto" url="url(/assets/캐릭터/브라우니2단계.gif)" />
      </MainPageWrapper>
    );
  }
  useEffect(() => {
    if (checkMobile() === 'other' && localToken) {
      nav('/main');
    }
    if (checkMobile() === 'other' && !localToken) {
      nav('/login');
    }
  }, [checkMobile]);

  return <EvImgBox width={'17rem'} height={15} margin="auto" url="url(/assets/캐릭터/브라우니2단계.gif)"></EvImgBox>;
};
