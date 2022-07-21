import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalGatherState, userInfoState } from '../../recoil/store';
import { useNavigate } from 'react-router';
import { EvBox, EvKoreanFont } from '../element/BoxStyle';
import { useMutation } from 'react-query';
import { userApi } from '../../api/callApi';
import { useEffect, useState } from 'react';

const Slide = keyframes`
    0% {
        transform: translateY(-20%);
        opacity:0
    }

    100% {
        transform: translateY(0%);
    }
`;

const ModalBackground = styled.div`
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const BoxWrap = styled.div<{ isWithBanner?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10.625rem;
  border-radius: 12px;
  top: ${({ isWithBanner }) => (isWithBanner ? '6rem' : ' 3.3rem')};
  right: 5.3%;
  border: 1px solid #dddddd;
  position: absolute;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
  overflow: hidden;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10.625rem;
  height: 3rem;
  cursor: pointer;
  /* background-color: blue; */
`;

const ProfileMenuModal = ({ isWithBanner }: { isWithBanner?: boolean }) => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [userJoinType, setUserJoinType] = useState<boolean>();

  const nav = useNavigate();

  //회원가입 유형 파악 API
  const joinTypeData = useMutation(() => userApi.joinTypeApi(), {
    onSuccess: (data) => {
      setUserJoinType(data.data.socialUser);
    },
  });

  const joinType = () => {
    joinTypeData.mutate();
  };

  useEffect(() => {
    joinType();
  }, [userJoinType]);

  return (
    <>
      {modalGather.profileMenuModal && (
        <ModalBackground onClick={() => setmodalGather({ ...modalGather, profileMenuModal: false })}>
          <BoxWrap
            isWithBanner={isWithBanner}
            style={{ borderRadius: '12px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!userInfoData.nick && (
              <RowBox
                onClick={() => {
                  setmodalGather({ ...modalGather, profileMenuModal: false });
                  nav('/login');
                }}
              >
                Log(삭제예정)
              </RowBox>
            )}
            {userInfoData.nick && (
              <RowBox
                onClick={() => {
                  localStorage.clear();
                  alert('로그아웃되었습니다');
                  setmodalGather({ ...modalGather, profileMenuModal: false });
                  nav('/login');
                }}
              >
                <EvBox width={'5.5rem'} margin="auto 1.9rem auto 1rem" isAlignSide={true}>
                  <EvKoreanFont size={0.9375}>로그아웃</EvKoreanFont>
                </EvBox>
                <EvBox width={'1.5rem'} height={1.5} url="url(/assets/exit.svg)" margin="auto 1rem auto 0"></EvBox>
              </RowBox>
            )}
            {!userJoinType && (
              <RowBox
                style={{ borderTop: '1px solid #DDDDDD' }}
                onClick={() => {
                  setmodalGather({ ...modalGather, profileMenuModal: false });
                  nav('/editpassword');
                }}
              >
                <EvBox width={'5.5rem'} margin="auto auto auto 1rem" isAlignSide={true}>
                  <EvKoreanFont size={0.9375}>비밀번호 변경</EvKoreanFont>
                </EvBox>
                <EvBox width={'1.5rem'} height={1.5} url="url(/assets/Key.svg)" margin="auto 1rem auto 0"></EvBox>
              </RowBox>
            )}
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default ProfileMenuModal;
