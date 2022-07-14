import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  editPasswordModalState,
  profileMenuModalState,
  userJoinTypeState,
  userNicknameState,
} from '../../recoil/store';
import { useNavigate } from 'react-router';
import { EvBox, EvKoreanFont } from '../element/BoxStyle';

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

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10.625rem;
  border-radius: 12px;
  top: 3.3rem;
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

const ProfileMenuModal = () => {
  const [modalProfileMenu, setModalProfileMenu] = useRecoilState(profileMenuModalState);
  const userJoinType = useRecoilValue(userJoinTypeState);
  const userNickname = useRecoilValue(userNicknameState);
  const nav = useNavigate();
  return (
    <>
      {modalProfileMenu && (
        <ModalBackground onClick={() => setModalProfileMenu(false)}>
          <BoxWrap
            style={{ borderRadius: '12px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!userNickname && (
              <RowBox
                onClick={() => {
                  setModalProfileMenu(false);
                  nav('/login');
                }}
              >
                Log(삭제예정)
              </RowBox>
            )}
            {userNickname && (
              <RowBox
                onClick={() => {
                  localStorage.clear();
                  alert('로그아웃되었습니다');
                  setModalProfileMenu(false);
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
                  setModalProfileMenu(false);
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
