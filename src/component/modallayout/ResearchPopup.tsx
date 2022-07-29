import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState, userInfoState } from '../../recoil/store';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { registerApi, userApi } from '../../api/callApi';
import { AxiosError } from 'axios';
import {
  EvAbleFont,
  EvBtn,
  EvBtnAble,
  EvCheckHelfBox,
  EvColumnBox,
  EvFontBox,
  EvImgBox,
  EvKoreanFont,
  EvRowBox,
} from '../element/BoxStyle';
import { SignUpBtnAble, SignUpInputInfo } from '../../page';
import { useCommonConfirm } from '../../hooks/useCommonConfirm';
import { useNavigate } from 'react-router';

const Slide = keyframes`
    0% {
        transform: translateY(20%);
    }

    100% {
        transform: translateY(0%);
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
  justify-content: center;
  max-width: 768px;
  position: fixed;
  bottom: 3.3rem;
  width: 100%;
  height: 26.9375rem;
  border-radius: 20px 20px 0px 0px;
  background-color: #ffd600;
  animation: ${Slide} 0.6s ease;
  background-image: url(/assets/팝업_구글폼작성이벤트.svg);
  background-size: 23.4375rem;

  background-repeat: no-repeat;
  background-position: top;
`;

const ResearchPopup = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  return (
    <>
      {modalGather.researchPopup && (
        <ModalBackground>
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EvImgBox width={'23rem'} height={23}>
              <EvBtn
                width={'8.9rem'}
                height={2.6}
                margin={'14rem auto auto 1.3rem'}
                style={{ opacity: 0 }}
                onClick={() => {
                  window.open('https://forms.gle/NWBga4YwCSFte9Ak9');
                }}
              ></EvBtn>
            </EvImgBox>
            <EvRowBox width={'100%'} height={3.5} margin={'auto auto 0 auto'} backgroundColor="#ffffff">
              <EvBtn
                width={'8.5rem'}
                height={2}
                margin={'auto auto auto 5%'}
                background="#ffffff"
                border="0 "
                onClick={() => {
                  const dayExpires = new Date();
                  const dayExpire = dayExpires.setDate(dayExpires.getDate() + 1);
                  localStorage.setItem('hasTodayVisit', String(dayExpire));
                  setmodalGather({ ...modalGather, researchPopup: false });
                }}
              >
                <EvKoreanFont size={0.9} weight={500} color="#989898">
                  오늘 하루 보지 않기
                </EvKoreanFont>
              </EvBtn>
              <EvRowBox
                margin={'auto 5.3% auto auto'}
                isCursor={true}
                onClick={() => {
                  const minExpires = new Date();
                  const tenMinExpire = minExpires.setMinutes(minExpires.getMinutes() + 10);
                  localStorage.setItem('hasTenMinVisit', String(tenMinExpire));
                  setmodalGather({ ...modalGather, researchPopup: false });
                }}
              >
                <EvFontBox width={'2.5rem'}>
                  <EvKoreanFont size={1} weight={500}>
                    닫기
                  </EvKoreanFont>
                </EvFontBox>
                <EvImgBox width={'0.8rem'} height={0.8} url="url(/assets/X.svg)" isCursor={true} />
              </EvRowBox>
            </EvRowBox>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default ResearchPopup;
