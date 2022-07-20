import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { registerApi, userApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { accessTokenState, popNotiState, userInfoState } from '../recoil/store';
import { PopNoti } from '../component/element/PopNoti';
import { EvBox, EvBtnAble, EvInputInfo, EvKoreanFont, EvCheckFont, EvAbleFont } from '../component/element/BoxStyle';

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

  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserInfoData(data.data);
    },
    onError: (error: AxiosError) => {
      if (error.message === 'Request failed with status code 404') {
        // nav(login);
      }
    },
  });

  //캐릭터 선택 API
  const userCharacterChooseData = useMutation((type: { type: string }) => registerApi.userCharacterChooseApi(type), {
    onSuccess: (token) => {
      setPopNoti({
        openPopNoti: true,
        informType: 'success',
        informMsg: `${select} 선택완료🙂`,
        btnNav: '/',
      });
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => userCharacterChoose({ type: select }), 200);
      } else {
        setPopNoti({
          openPopNoti: true,
          informType: 'warning',
          informMsg: error.response?.data.msg,
        });
      }
    },
  });

  const userCharacterChoose = (data: { type: string }) => {
    userCharacterChooseData.mutate(data);
  };

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (userInfoData?.characterInfo.type) {
      setPopNoti({
        openPopNoti: true,
        informType: 'warning',
        informMsg: '🙅🏻‍♀️이미 캐릭터를 선택했습니다🙅🏻‍♀️',
      });
    }
  }, [userInfoData]);

  return (
    <RegisterContainer>
      <ContentContainer>
        <EvBox
          width={'5.625rem'}
          height={1.9}
          margin={'3.125rem auto 0px auto'}
          url="url(/assets/로고.svg)"
          backgroundsize="65px"
        ></EvBox>

        <EvBox width={14.625} height={5.625} margin={'1.25rem auto 0 auto'}>
          <EvKoreanFont size={2.1875} align={'center'} weight={700} lineHeight={'45.5px'}>
            투두윗에 오신걸
            <br />
            환영합니다!
          </EvKoreanFont>
        </EvBox>

        <EvBox width={15.5} height={3.9375} margin={'0.625rem auto 0 auto'}>
          <EvKoreanFont size={0.9375} align={'center'} lineHeight={'21px'} color={'#5F5F5F'}>
            투두윗에서는 투 두 리스트를 완료할수록 <br />
            나의 캐릭터가 함께 성장합니다. <br />
            아래 캐릭터 중 1개를 선택해주세요.
          </EvKoreanFont>
        </EvBox>

        <EvBox
          width={'14.0625rem'}
          height={1.625}
          margin={'0.625rem auto 0 auto'}
          borderRadius={'100px'}
          backgroundColor={'#F7F7F7'}
        >
          <EvKoreanFont size={0.8125} align={'center'} color={'#5F5F5F'}>
            캐릭터는 선택 후 변경이 불가합니다.
          </EvKoreanFont>
        </EvBox>

        <EvBox direction={'row'} width={'18.1875rem'} height={9.875} margin={'3.75rem auto 0 auto '}>
          <EvBox width={'8.125rem'} height={9.875} margin={'0 auto 0 0'}>
            <EvBox
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
            ></EvBox>
            <EvBox width={'3.5rem'} height={1.375} margin={'0 auto'}>
              <EvKoreanFont size={0.9375} align={'center'} weight={700} color={'#989898'}>
                브라우니
              </EvKoreanFont>
            </EvBox>
          </EvBox>
          <EvBox width={'8.125rem'} height={9.875} margin={'0 0 0 auto'}>
            <EvBox
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
            ></EvBox>
            <EvBox width={'3.5rem'} height={1.375} margin={'0 auto'}>
              <EvKoreanFont size={0.9375} align={'center'} weight={700} color={'#989898'}>
                비니
              </EvKoreanFont>
            </EvBox>
          </EvBox>
        </EvBox>

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
          <EvKoreanFont size={1.0625} align={'center'} weight={500}>
            시작하기
          </EvKoreanFont>
        </EvBtnAble>
      </ContentContainer>
    </RegisterContainer>
  );
};
