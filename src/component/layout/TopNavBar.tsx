import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userApi } from '../../api/callApi';
import { useCommonConfirm } from '../../hooks/useCommonConfirm';
import { modalGatherState, userInfoState } from '../../recoil/store';
import { EvImgBox } from '../element/BoxStyle';
import NotiModal from '../modallayout/NotiModal';
import ProfileMenuModal from '../modallayout/ProfileMenuModal';

const TopNavWrapper = styled.nav`
  height: 3.75rem;
  min-height: 3.75rem;
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: row;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;

  span {
    font-size: 1.25rem;
    font-family: 'OpensansBold';
  }

  svg {
    position: absolute;
    left: 20px;
    font-size: 1.25rem;
    cursor: pointer;
  }
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
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #f88181; */
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

export const TopNavBar = ({ isWithBanner }: { isWithBanner?: boolean }) => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const localToken = localStorage.getItem('recoil-persist');
  const nav = useNavigate();

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();
  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserInfoData(data.data);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.response?.data.msg === '닉네임 입력 후 서비스 이용 가능합니다.') {
        nav('/signupsns');
      } else if (error.response?.data.msg === '해당 캐릭터가 존재하지 않습니다') {
        nav('/choosecharacter');
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
    if (userInformData.error?.message === 'Request failed with status code 401') {
      userInformData.refetch();
    }
    if (!localToken) {
      nav('/login');
    }
  }, [userInformData]);

  return (
    <TopNavWrapper>
      <EvImgBox
        width="4.1875rem"
        height={2.02}
        margin={'auto auto auto 5.3%'}
        url="url(/assets/로고.svg)"
        style={{
          backgroundImage: 'url(/assets/로고.svg)',
        }}
        onClick={() => {
          nav('/');
        }}
      />
      <RowBox
        width="5rem"
        height={2.02}
        margin={'auto 5.3% auto auto'}
        style={{
          gap: '1rem',
        }}
      >
        {' '}
        <Box
          width="2rem"
          height={2.02}
          margin={'auto'}
          style={{
            backgroundImage: 'url(/assets/nav/알림.svg)',
          }}
          onClick={() => {
            setmodalGather({
              levelUpModal: false,
              stepUpModal: false,
              editNicknameModal: false,
              editPhotoModal: false,
              profileMenuModal: false,
              friendAddModal: false,
              notiModal: true,
              explainModal: false,
            });
          }}
        />
        <Box
          width="1.6rem"
          height={1.6}
          margin={'auto'}
          style={{
            backgroundImage: `url(${userInfoData?.profileImageUrl})`,
            border: '0.1px solid #D9D9D9',
            backgroundSize: 'cover',
            borderRadius: '50%',
          }}
          onClick={() => {
            setmodalGather({
              profileMenuModal: true,
            });
          }}
        />
      </RowBox>
      <NotiModal />
      <ProfileMenuModal isWithBanner={isWithBanner} />
    </TopNavWrapper>
  );
};
