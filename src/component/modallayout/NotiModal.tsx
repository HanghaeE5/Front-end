import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState } from '../../recoil/store';
import { EvColumnBox, EvKoreanFont, EvRowBox } from '../element/BoxStyle';

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
  width: 89%;
  height: 54%;
  border-radius: 12px;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

const NotiModal = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  return (
    <>
      {modalGather.notiModal && (
        <ModalBackground onClick={() => setmodalGather({ ...modalGather, notiModal: false })}>
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EvRowBox width="92%" height={1.875} margin={'2.5rem 1.25rem 0rem 1.25rem'}>
              <EvColumnBox width={'3.5rem'} margin={'auto auto auto 0rem'}>
                <EvKoreanFont size={1} color="rgba(147, 147, 147, 1)">
                  알림
                </EvKoreanFont>
              </EvColumnBox>
              <EvColumnBox
                width={'1.3rem'}
                height={1.3}
                margin={'auto 0rem auto auto'}
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundImage: 'url(/assets/X.svg)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setmodalGather({ ...modalGather, explainModal: false });
                }}
              ></EvColumnBox>
            </EvRowBox>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default NotiModal;
