import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { registerApi, userApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { accessTokenState, popNotiState, userInfoState } from '../recoil/store';
import { PopNoti } from '../component/element/PopNoti';
import {
  EvBox,
  EvBtnAble,
  EvInputInfo,
  EvKoreanFont,
  EvCheckFont,
  EvAbleFont,
  EvImgBox,
  EvFontBox,
  EvRowBox,
  EvColumnBox,
} from '../component/element/BoxStyle';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import { PATH } from '../route/routeList';

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  /* background-color: #8e3939; */
  overflow-y: auto;
  position: relative;
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
type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';

export const ChooseCharacter = () => {
  const [nickname, setNickname] = useState<string>('');
  const [popNoti, setPopNoti] = useRecoilState(popNotiState);
  const [informType, setInformType] = useState<ConfirmType | undefined>(undefined);
  const [informMsg, setInformMsg] = useState<string | undefined>('');
  const [quitOk, setQuitOk] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [select, setSelect] = useState<string>('');
  const [nickConfirm, setNickConfirm] = useState<boolean>(false);
  const accessLoginToken = useSetRecoilState(accessTokenState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const localToken = localStorage.getItem('accessToken');

  type ConfirmType = 'warning' | 'chat' | 'withTodo' | 'success';

  const nav = useNavigate();

  const selectName = select === '나무늘보' ? '브라우니' : '비니';

  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserInfoData(data.data);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.response?.data.msg === '사용자를 찾을 수 없습니다') {
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

  //캐릭터 선택 API
  const userCharacterChooseData = useMutation((type: { type: string }) => registerApi.userCharacterChooseApi(type), {
    onSuccess: (token) => {
      openSuccessConfirm({
        title: `${selectName} 선택완료🙂`,
        button: {
          text: '확인',
          onClick: () => nav('/'),
        },
      });
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => userCharacterChoose({ type: select }), 200);
      } else {
        openErrorConfirm({
          title: error.response?.data.msg,
        });
      }
    },
  });

  const userCharacterChoose = (data: { type: string }) => {
    userCharacterChooseData.mutate(data);
  };

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (userInfoData?.characterInfo.type) {
      openErrorConfirm({
        title: '🙅🏻‍♀️이미 캐릭터를 선택했습니다🙅🏻‍♀️',
        content: '캐릭터는 변경 불가합니다',
        button: { text: '확인', onClick: () => nav(PATH.MAIN) },
      });
    }
  }, [userInfoData]);

  return (
    <RegisterContainer>
      <ContentContainer>
        <EvImgBox
          width={'5.625rem'}
          height={2.7}
          margin={'3.125rem auto 0px auto'}
          url="url(/assets/logoyellow.svg)"
        ></EvImgBox>

        <EvFontBox width={14.625} height={5.625} margin={'1.28rem auto 0 auto'}>
          <EvKoreanFont size={2.1875} align={'center'} weight={700} lineHeight={'45.5px'}>
            투두윗에 오신걸
            <br />
            환영합니다!
          </EvKoreanFont>
        </EvFontBox>

        <EvFontBox width={15.5} height={3.9375} margin={'0.625rem auto 0 auto'}>
          <EvKoreanFont size={0.9375} align={'center'} lineHeight={'21px'} color={'#5F5F5F'}>
            투두윗에서는 투두리스트를 완료할수록 <br />
            나의 캐릭터가 함께 성장합니다. <br />
            아래 캐릭터 중 1개를 선택해주세요.
          </EvKoreanFont>
        </EvFontBox>

        <EvFontBox
          width={'14.0625rem'}
          height={1.625}
          margin={'0.625rem auto 0 auto'}
          borderRadius={'100px'}
          backgroundColor={'#F7F7F7'}
        >
          <EvKoreanFont size={0.8125} align={'center'} color={'#5F5F5F'}>
            캐릭터는 선택 후 변경이 불가합니다.
          </EvKoreanFont>
        </EvFontBox>

        <EvRowBox width={'18.1875rem'} height={9.875} margin={'3.75rem auto 0 auto '}>
          <EvColumnBox width={'8.125rem'} height={9.875} margin={'0 auto 0 0'}>
            <EvImgBox
              width={'8.125rem'}
              height={8.125}
              margin={'0 0 0.375rem 0'}
              border={select === '나무늘보' ? '3px solid #FFD600' : '1px solid #dddddd'}
              borderRadius="50%"
              url={
                select === '나무늘보' ? 'url(/assets/sloth_130x130_color.svg)' : 'url(/assets/sloth_130x130_gray.svg)'
              }
              onClick={() => {
                setSelect('나무늘보');
              }}
            />
            <EvFontBox width={'3.5rem'} height={1.375} margin={'0 auto'}>
              <EvKoreanFont size={0.9375} align={'center'} weight={700} color={'#989898'}>
                브라우니
              </EvKoreanFont>
            </EvFontBox>
          </EvColumnBox>
          <EvColumnBox width={'8.125rem'} height={9.875} margin={'0 0 0 auto'}>
            <EvImgBox
              width={'8.125rem'}
              height={8.125}
              margin={'0 0 0.375rem 0'}
              border={select === '거북이' ? '3px solid #FFD600' : '1px solid #dddddd'}
              borderRadius="50%"
              url={
                select === '거북이' ? 'url(/assets/turtle_130x130_color.svg)' : 'url(/assets/turtle_130x130_gray.svg)'
              }
              onClick={() => {
                setSelect('거북이');
              }}
            />
            <EvFontBox width={'3.5rem'} height={1.375} margin={'0 auto'}>
              <EvKoreanFont size={0.9375} align={'center'} weight={700} color={'#989898'}>
                비니
              </EvKoreanFont>
            </EvFontBox>
          </EvColumnBox>
        </EvRowBox>

        <EvBtnAble
          isDisable={!select}
          width={'20.9375rem '}
          height={3.75}
          margin={'3.75rem 1.25rem 0px 1.25rem'}
          onClick={
            select
              ? () => {
                  userCharacterChoose({ type: select });
                }
              : () => {
                  null;
                }
          }
        >
          <EvAbleFont size={1.0625} weight={500} isDisable={!select}>
            시작하기
          </EvAbleFont>
        </EvBtnAble>
      </ContentContainer>
    </RegisterContainer>
  );
};
