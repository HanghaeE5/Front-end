import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState, userInfoState } from '../../recoil/store';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { registerApi, userApi } from '../../api/callApi';
import { AxiosError } from 'axios';
import { EvBox, EvBtn, EvBtnAble, EvEnglishFont, EvKoreanFont } from '../element/BoxStyle';

const Slide = keyframes`
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0);
    }
`;

const ModalBackground = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 8;
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 76%;
  height: 23.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

const StepUpModal = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserInfoData(data.data);
    },
    onError: (error: AxiosError) => {
      if (error.message === 'Request failed with status code 404') {
        // nav(-1);
      }
    },
  });

  console.log(userInformData);

  useEffect(() => {
    userInformData;
    if (userInformData.error?.message === 'Request failed with status code 401') {
      userInformData.refetch();
    }
  }, [userInformData]);

  return (
    <>
      {modalGather.stepUpModal && (
        <ModalBackground onClick={() => setmodalGather({ ...modalGather, stepUpModal: false })}>
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EvBox width="68%" margin={'1.875rem auto 0rem auto'}>
              <EvEnglishFont size={0.9375} color="#FFD600" weight={700} lineHeight={'19.5px'}>
                Step UP!
              </EvEnglishFont>
            </EvBox>
            <EvBox width="68%" margin={'0.625rem auto 0rem auto'}>
              <EvKoreanFont size={1.25} color="#1A1A1A" weight={700} lineHeight={'26px'}>
                {userInfoData?.characterInfo.characterName}
              </EvKoreanFont>
            </EvBox>

            <EvBox
              width="11.25rem"
              height={10}
              backgroundsize="11rem"
              url="url(/assets/starbg.svg)"
              margin="1.875rem auto"
            >
              <EvBox
                width="10rem"
                height={8}
                backgroundsize="12rem"
                url={
                  userInfoData?.characterInfo.characterName === '3종 오토 브라우니'
                    ? 'url(/assets/캐릭터/브라우니진화1.gif)'
                    : userInfoData?.characterInfo.characterName === '현자 브라우니'
                    ? 'url(/assets/캐릭터/브라우니진화2.gif)'
                    : userInfoData?.characterInfo.characterName === '출격 완료! 비니'
                    ? 'url(/assets/캐릭터/비니진화2.gif)'
                    : 'url(/assets/캐릭터/비니진화1.gif)'
                }
              />
            </EvBox>

            <EvBtn
              width={'84.2%'}
              height={3.75}
              margin="0.625rem auto 1.875rem auto"
              border="none"
              background="#FFD600"
              onClick={() => {
                setmodalGather({ ...modalGather, stepUpModal: false });
              }}
            >
              {' '}
              <EvKoreanFont size={1.25} color="#1A1A1A" weight={700} lineHeight={'26px'}>
                닫기
              </EvKoreanFont>
            </EvBtn>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default StepUpModal;
