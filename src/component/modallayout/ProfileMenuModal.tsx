import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { editPasswordModalState, profileMenuModalState } from '../../recoil/store';
import { useNavigate } from 'react-router';

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
  z-index: 100;
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
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: 5px 0;
  background-color: #ffffff;
`;

const ProfileMenuModal = () => {
  const [modalProfileMenu, setModalProfileMenu] = useRecoilState(profileMenuModalState);
  const [, setModalEditPassword] = useRecoilState(editPasswordModalState);
  const nav = useNavigate();
  return (
    <>
      {modalProfileMenu && (
        <ModalBackground onClick={() => setModalProfileMenu(false)}>
          <BoxWrap
            width={'7rem'}
            height={6}
            style={{ borderRadius: ' 0px 0px 20px 20px' }}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <Box
              onClick={() => {
                setModalEditPassword(true);
              }}
            >
              비밀번호 변경
            </Box>
            <Box
              onClick={() => {
                nav('/login');
              }}
            >
              Log(삭제예정)
            </Box>
            <Box
              onClick={() => {
                localStorage.clear();
                alert('로그아웃되었습니다');
                nav('/login');
              }}
            >
              로그아웃
            </Box>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default ProfileMenuModal;
