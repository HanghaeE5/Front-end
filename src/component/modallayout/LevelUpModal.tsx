import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState } from '../../recoil/store';
import { useState } from 'react';
import { useMutation } from 'react-query';
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

  width: 76%;
  height: 23.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

const LevelUpModal = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);

  return (
    <>
      {modalGather.levelUpModal && (
        <ModalBackground onClick={() => setmodalGather({ ...modalGather, levelUpModal: false })}>
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EvBox width="68%" margin={'1.875rem auto 0rem auto'}>
              <EvEnglishFont size={0.9375} color="#FFD600" weight={700} lineHeight={'19.5px'}>
                LEVEL UP!
              </EvEnglishFont>
            </EvBox>
            <EvBox width="68%" margin={'0.1rem auto 0rem auto'}>
              <EvKoreanFont size={1.25} color="#1A1A1A" weight={700} lineHeight={'26px'}>
                레벨업을 축하드립니다!
              </EvKoreanFont>
            </EvBox>
            <EvBox
              width="11.25rem"
              height={10}
              backgroundsize="13.5rem"
              url="url(/assets/levelup.svg)"
              margin="1.875rem auto"
            />
            <EvBtn
              width={'84.2%'}
              height={3.75}
              margin="0.1 rem auto 1.875rem auto"
              border="none"
              background="#FFD600"
              onClick={() => {
                setmodalGather({ ...modalGather, levelUpModal: false });
              }}
            >
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
export default LevelUpModal;
