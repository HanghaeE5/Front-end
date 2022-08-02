import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState } from '../../recoil/store';
import { EvColumnBox, EvFontBox, EvImgBox, EvKoreanFont, EvRowBox } from '../element/BoxStyle';

const Slide = keyframes`
    0% {
        transform: translateY(10%);
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
  z-index: 5;
`;

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
              <EvFontBox width={'3.5rem'} margin={'auto auto auto 0rem'}>
                <EvKoreanFont size={1} color="rgba(147, 147, 147, 1)">
                  알림
                </EvKoreanFont>
              </EvFontBox>
              <EvImgBox
                width={'1rem'}
                height={1}
                margin={'auto 0rem auto auto'}
                url={'url(/assets/X.svg)'}
                isCursor={true}
                onClick={() => {
                  setmodalGather({ ...modalGather, notiModal: false });
                }}
              />
            </EvRowBox>
            <EvFontBox width={'15rem'} margin={'auto'}>
              <EvKoreanFont size={1.2} color="#000000">
                곧 오픈될 기능이에요 😎
              </EvKoreanFont>
            </EvFontBox>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default NotiModal;
