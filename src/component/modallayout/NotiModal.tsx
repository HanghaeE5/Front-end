import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { notiModalState } from '../../recoil/store';

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

type font = {
  size: number;
  color: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const NotiModal = () => {
  const [modalNoti, setModalNoti] = useRecoilState(notiModalState);
  return (
    <>
      {modalNoti && (
        <ModalBackground onClick={() => setModalNoti(false)}>
          <BoxWrap
            width={'100%'}
            height={15}
            style={{ borderRadius: '20px 20px 0px 0px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            알림
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default NotiModal;
