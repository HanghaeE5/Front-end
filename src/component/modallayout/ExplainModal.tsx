import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState, userInfoState } from '../../recoil/store';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { registerApi, userApi } from '../../api/callApi';
import { AxiosError } from 'axios';
import '../../style/noScorll.css';

import {
  EvBox,
  EvBtn,
  EvBtnAble,
  EvColumnBox,
  EvEnglishFont,
  EvFontBox,
  EvImgBox,
  EvKoreanFont,
  EvRowBox,
} from '../element/BoxStyle';
import { GradientScollWrap } from '../element/GradientScollWrap';

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
  z-index: 5;
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
  width: 20.9375rem;
  height: 54%;
  border-radius: 12px;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ExplainYellowWrap = styled(EvColumnBox)`
  border: 1px solid #ffd600;
  background-color: #fffbe9;
  border-radius: 6px;
  width: 18.4375rem;
`;

const YellowBox = styled(EvColumnBox)`
  padding: 0px 14px;
  background: #ffd600;
  border-radius: 20px;
  width: 5.5rem;
  height: 1.5rem;
`;

interface textType {
  levelText?: string;
  text?: string;
  margin?: string;
}

const ExplainBox = ({ text }: textType) => {
  return (
    <EvRowBox>
      <EvColumnBox width={'1.25rem'} height={1.25} margin="0 0 auto 0" url="url(/assets/checkyellow.svg)" />
      <EvFontBox width={'16.8125rem'} isAlignSide={true} margin="0 0 0 0.25rem">
        <EvKoreanFont size={0.875} lineHeight={'20px'} style={{ whiteSpace: 'pre-line' }}>
          {text}
        </EvKoreanFont>
      </EvFontBox>
    </EvRowBox>
  );
};

const ExplainLevel = ({ levelText, text, margin }: textType) => {
  return (
    <EvRowBox width={'100%'} margin={margin}>
      <YellowBox margin="0 0.625rem 0 1.25rem">
        <EvKoreanFont size={0.75} weight={500}>
          {levelText}
        </EvKoreanFont>
      </YellowBox>
      <EvFontBox isAlignSide={true} width={'7rem'} height={1.25} margin={'0 auto 0 0'}>
        <EvKoreanFont size={0.75} weight={700}>
          {text}
        </EvKoreanFont>
      </EvFontBox>
    </EvRowBox>
  );
};

const ExplainModal = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [makeLong1, setMakeLong1] = useState<boolean>(false);
  const [makeLong2, setMakeLong2] = useState<boolean>(false);
  const [makeLong3, setMakeLong3] = useState<boolean>(false);

  return (
    <>
      {modalGather.explainModal && (
        <ModalBackground onClick={() => setmodalGather({ ...modalGather, explainModal: false })}>
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <GradientScollWrap>
              <div className="noScroll">
                <EvRowBox width={'18.4375rem'} margin="1.25rem">
                  <EvFontBox width={'12.2rem'} height={3.25} margin={'1.0rem 5rem 0 0'}>
                    <EvKoreanFont size={1.25} weight={700} lineHeight={'26px'}>
                      캐릭터의 레벨과 스텝은 어떻게 정해지나요?
                    </EvKoreanFont>
                  </EvFontBox>
                  <EvImgBox
                    width={'1rem'}
                    height={1}
                    margin={'0 0 auto auto'}
                    url={'url(/assets/X.svg)'}
                    isCursor={true}
                    onClick={() => {
                      setmodalGather({ ...modalGather, explainModal: false });
                    }}
                  ></EvImgBox>
                </EvRowBox>

                <EvColumnBox width={'88%'} margin="0 auto 1.25rem auto " style={{ rowGap: '10px' }}>
                  <ExplainBox text={'투두를 완료하면 경험치가 1 증가해요.'} />
                  <ExplainBox
                    text={`하루 최대 얻을 수 있는 경험치는 10이에요.\n하루에 투두를  5개 완료해도 10을 받아요.`}
                  />
                  <ExplainBox text={`현재 최고 레벨은 30이며,\n베타 테스트 후 더 늘어날 예정이에요.`} />
                  <ExplainBox
                    text={`LV.1 ~ 9 는 Step 1, LV.10 ~ 19 는 Step 2, \nLV.20 부터는 Step 3 캐릭터를 만날 수 있어요.`}
                  />
                  <ExplainBox text={`LV.10, LV.20 이 되면 캐릭터가 진화해요!`} />
                </EvColumnBox>

                {/* Step1 설명 */}
                <ExplainYellowWrap margin="0 auto">
                  <EvRowBox width={'18.4375rem'} height={1.25} margin="1rem 0 0 0">
                    <EvFontBox width={'2.6875rem'} height={1.25} margin={'0 auto auto 1.25rem'}>
                      <EvKoreanFont size={0.875} weight={700}>
                        Step 1
                      </EvKoreanFont>
                    </EvFontBox>
                    <EvImgBox
                      onClick={() => {
                        setMakeLong1(!makeLong1);
                      }}
                      isCursor={true}
                      width={'0.8rem'}
                      height={0.6}
                      margin={'auto 1rem auto auto'}
                      url={makeLong1 ? 'url(/assets/uparrow.svg)' : 'url(/assets/downarrow.svg)'}
                    ></EvImgBox>
                  </EvRowBox>
                  <EvFontBox height={1.5} margin={'0.125rem auto 0.875rem 1.25rem'}>
                    <EvKoreanFont size={0.85} weight={500}>
                      이불 밖은 무서운 브라우니, 등껍질은 비니 침대
                    </EvKoreanFont>
                  </EvFontBox>
                  {makeLong1 && (
                    <>
                      <ExplainLevel levelText={`레벨`} text={`Level 1 ~ Level 5`} margin={`0.375rem 0 0 0`} />
                      <ExplainLevel levelText={`레벨업 조건`} text={`레벨당 투두 1개`} margin={`0.3125rem 0 0 0`} />
                      <ExplainLevel levelText={`레벨`} text={`Level 5 ~ Level 10`} margin={`1.25rem 0 0 0`} />
                      <ExplainLevel
                        levelText={`레벨업 조건`}
                        text={`레벨당 투두 2개`}
                        margin={`0.3125rem 0 1.25rem 0`}
                      />
                    </>
                  )}
                </ExplainYellowWrap>

                {/* Step2 설명 */}
                <ExplainYellowWrap margin="0.625rem auto 0 auto">
                  <EvRowBox width={'18.4375rem'} height={1.25} margin="1rem 0 0 0">
                    <EvFontBox width={'2.6875rem'} height={1.25} margin={'0 auto auto 1.25rem'}>
                      <EvKoreanFont size={0.875} weight={700}>
                        Step 2
                      </EvKoreanFont>
                    </EvFontBox>
                    <EvImgBox
                      width={'0.8rem'}
                      height={0.6}
                      margin={'auto 1rem auto auto'}
                      url={makeLong2 ? 'url(/assets/uparrow.svg)' : 'url(/assets/downarrow.svg)'}
                      onClick={() => {
                        setMakeLong2(!makeLong2);
                      }}
                      isCursor={true}
                    ></EvImgBox>
                  </EvRowBox>
                  <EvFontBox height={1.5} margin={'0.125rem auto 0.875rem 1.25rem'}>
                    <EvKoreanFont size={0.875} weight={500}>
                      3종 오토 브라우니, 달팽이보단 빠른 비니
                    </EvKoreanFont>
                  </EvFontBox>
                  {makeLong2 && (
                    <>
                      <ExplainLevel levelText={`레벨`} text={`Level 10 ~ Level 15`} margin={`0.375rem 0 0 0`} />
                      <ExplainLevel levelText={`레벨업 조건`} text={`레벨당 투두 3개`} margin={`0.3125rem 0 0 0`} />
                      <ExplainLevel levelText={`레벨`} text={`Level 15 ~ Level 20`} margin={`1.25rem 0 0 0`} />
                      <ExplainLevel
                        levelText={`레벨업 조건`}
                        text={`레벨당 투두 5개`}
                        margin={`0.3125rem 0 1.25rem 0`}
                      />
                    </>
                  )}
                </ExplainYellowWrap>

                {/* Step3 설명 */}
                <ExplainYellowWrap margin="0.625rem auto 0 auto">
                  <EvRowBox width={'18.4375rem'} height={1.25} margin="1rem 0 0 0">
                    <EvFontBox width={'2.6875rem'} height={1.25} margin={'0 auto auto 1.25rem'}>
                      <EvKoreanFont size={0.875} weight={700}>
                        Step 3
                      </EvKoreanFont>
                    </EvFontBox>
                    <EvImgBox
                      width={'0.8rem'}
                      height={0.6}
                      margin={'auto 1rem auto auto'}
                      url={makeLong3 ? 'url(/assets/uparrow.svg)' : 'url(/assets/downarrow.svg)'}
                      onClick={() => {
                        setMakeLong3(!makeLong3);
                      }}
                      isCursor={true}
                    ></EvImgBox>
                  </EvRowBox>
                  <EvFontBox height={1.5} margin={'0.125rem auto 0.875rem 1.25rem'}>
                    <EvKoreanFont size={0.875} weight={500}>
                      현자 브라우니, 출격완료! 비니
                    </EvKoreanFont>
                  </EvFontBox>
                  {makeLong3 && (
                    <>
                      <ExplainLevel levelText={`레벨`} text={`Level 20 ~`} margin={`0.375rem 0 0 0`} />
                      <ExplainLevel
                        levelText={`레벨업 조건`}
                        text={`레벨당 투두 10개`}
                        margin={`0.3125rem 0 1.25rem 0`}
                      />
                    </>
                  )}
                </ExplainYellowWrap>

                <EvFontBox width={'16.75rem'} height={1.625} margin={'2.375rem 2.9375rem 1.25rem  1.25rem'}>
                  <EvKoreanFont size={1.25} weight={700} lineHeight={'26px'}>
                    아이템은 어떻게 받을 수 있나요?
                  </EvKoreanFont>
                </EvFontBox>
                <ExplainBox text={`투두의 카테고리는 스터디, 운동, 쇼핑,\n약속, 기타로 이루어져 있어요`} />
                <ExplainBox
                  text={`기타를 제외한 스터디, 운동, 쇼핑, 약속\n카테고리를 누적 5개, 15개, 30개 완료하면\n아이템을 받을 수 있어요.`}
                />
                <img src="/assets/table.svg" style={{ margin: '1.25rem auto 1.25rem 1.25rem' }}></img>
              </div>
            </GradientScollWrap>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default ExplainModal;
