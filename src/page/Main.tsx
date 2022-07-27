import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsQuestionCircle } from 'react-icons/bs';
import { ReactComponent as DirectionIcon } from '../asset/icons/direction.svg';

import { accessTokenState, modalGatherState, snsSignupNickname, userInfoState } from '../recoil/store';
import EditNicknameModal from '../component/modallayout/EditNicknameModal';
import EditPhotoModal from '../component/modallayout/EditPhotoModal';
import ExplainModal from '../component/modallayout/ExplainModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { userApi } from '../api/callApi';
import { Typography, Wrapper } from '../component/element';
import { PATH } from '../route/routeList';
import { NoHeaderPageLayout } from '../component/layout/NoHeaderPageLayout';
import { PageLayout } from '../component/layout/PageLayout';
import {
  EvBox,
  EvBtn,
  EvColumnBox,
  EvEnglishFont,
  EvFontBox,
  EvImgBox,
  EvKoreanFont,
  EvRowBox,
} from '../component/element/BoxStyle';
import { ReactComponent as Excercise } from '../asset/icons/todoIcon/icon_exercise.svg';
import { ReactComponent as PromiseIcon } from '../asset/icons/todoIcon/icon_promise.svg';
import { ReactComponent as Shopping } from '../asset/icons/todoIcon/icon_shopping.svg';
import { ReactComponent as Study } from '../asset/icons/todoIcon/icon_study.svg';
import { AxiosError } from 'axios';
import LevelUpModal from '../component/modallayout/LevelUpModal';
import StepUpModal from '../component/modallayout/StepUpModal';
import ExpBar from '../component/element/ExpBar';
import { TopNavBar } from '../component/layout/TopNavBar';
import { BottomNavLayout } from '../component/layout/BottomNavBar';
import { useCommonConfirm } from '../hooks/useCommonConfirm';

const MainPageWrapper = styled(Wrapper)`
  max-width: 768px;
  width: 100%;
  position: relative;
`;

const MainContainer = styled.div`
  max-width: 768px;
  width: 100%;
  height: 100%;
  background: #ffe074; /* fallback for old browsers */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  position: relative;
  overflow-y: ${(props: box) => (props.isNoScroll ? 'hidden' : 'auto')};
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: -webkit-linear-gradient(180deg, #ffffff 5%, #ffe074 75.32%); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(180deg, #ffffff 5%, #ffe074 75.32%);
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isNoScroll?: boolean;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
`;

const ToDoBox = styled.div`
  display: flex;
  width: 89.3%;
  height: 6.25rem;
  margin: 0.375rem 5.3% 4rem 5.3%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  padding: 1rem 0;
  gap: 0.7rem;
  background-color: #ffffff;
  border-radius: 6px;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
`;

const EventWrapper = styled(Wrapper)`
  cursor: pointer;
`;

export const EvRowBadgeWrap = styled(EvRowBox)`
  width: 89.3%;
  height: 7.9375rem;
  margin: 0.625rem auto 0 auto;
  column-gap: 0.5rem;
`;

export const BadgeBox = styled(EvColumnBox)`
  background-color: #ffffff;
  width: 25%;
  height: 100%;
  box-shadow: 0px 2px 8px rgba(235, 197, 0, 0.5);
  border-radius: 6px;
`;

export const BadgeImgBox = styled(EvImgBox)`
  width: 3.75rem;
  height: 3.75rem;
`;

export const TodoNumberBox = styled(EvColumnBox)`
  background: #ffd600;
  border-radius: 100px;
  width: 3.125rem;
  height: 1.375rem;
  margin: 0 auto 0.875rem auto;
`;

export const Main = () => {
  // const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [accessLoginToken, setAccessLoginToken] = useRecoilState(accessTokenState);
  const [snsSignupNicknameOk, setSnsSignupNicknameOk] = useRecoilState(snsSignupNickname);
  const localToken = localStorage.getItem('recoil-persist');
  const all = window.location.href;

  const first = all.split('&');
  const accessToken = first[0].split('=')[1];
  const nav = useNavigate();

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserInfoData(data.data);
    },

    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.response?.data.msg === '닉네임 입력 후 서비스 이용 가능합니다.') {
        setSnsSignupNicknameOk(false);
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
              console.log('메인에서 사용자 못찾아서 보내는것');
              nav('/login');
            },
          },
        });
      }
    },
  });

  // useEffect(() => {
  //   if (accessToken) {
  //     setAccessLoginToken(accessToken);
  //     const isNickname = first[1].split('=')[1];
  //     console.log(accessToken);
  //     if (isNickname === 'N' || userInfoData?.nick === '') {
  //       nav('/signupsns');
  //     }
  //     if (isNickname === 'Y' && !userInfoData?.characterInfo.type) {
  //       nav('/choosecharacter');
  //     } else {
  //       window.location.replace('/');
  //     }
  //   } else if (!localToken) {
  //     nav('/login');
  //   }
  // }, [accessToken]);

  // useEffect(() => {
  //   if (modalGather.editPhotoModal === true) {
  //     document.body.style.cssText = `
  //     overflow: hidden;
  //     `;
  //   } else {
  //     document.body.style.cssText = '';
  //   }
  // }, [modalGather]);

  if (userInformData.status === 'loading') {
    return <EvColumnBox>로딩중</EvColumnBox>;
  }

  return (
    <MainPageWrapper isColumn height="100%">
      <EventWrapper
        backgroundColor="black"
        height="2.85rem"
        justifyContent="center"
        padding="1rem"
        alignItems="center"
        onClick={() => nav(PATH.EVENT)}
      >
        <Typography color="#FFD600" weight={700} size={0.875}>
          투두윗 100% 당첨 럭키박스 이벤트 바로가기 <DirectionIcon />
        </Typography>
      </EventWrapper>

      <TopNavBar isWithBanner />
      <MainContainer
        isNoScroll={modalGather.editPhotoModal || modalGather.editNicknameModal || modalGather.explainModal}
      >
        <ContentContainer>
          <EvBox direction="row" margin="1.875rem 0 0 0 " height={4.75}>
            <EvBox
              width={'5.625rem'}
              height={5.625}
              margin={'0 0 0 9rem'}
              url={`url(${userInfoData?.profileImageUrl})`}
              borderRadius="50%"
            />
            <EvBox
              width={'1.3294rem'}
              height={1.2468}
              margin={'auto 7.5625rem auto 0.5rem'}
              url={'url(/assets/camera.svg)'}
              isCursor={true}
              onClick={() => {
                setmodalGather({ ...modalGather, editPhotoModal: true });
              }}
            />
          </EvBox>
          <EditPhotoModal />
          <EvBox direction="row" margin="1rem 0 0 0 " height={2.125} style={{ zIndex: 2 }}>
            <EvBox
              width={'9.125rem'}
              height={2.125}
              margin={'0 1rem 0 7.125rem'}
              border="1px solid #DDDDDD"
              borderRadius="100px"
              backgroundColor="#ffffff"
            >
              <EvKoreanFont size={0.875} weight={700}>
                {userInfoData?.nick}
              </EvKoreanFont>
            </EvBox>
            <EvBox
              width={'1rem'}
              height={1}
              margin={'auto 5.5rem auto 0rem'}
              url="url(/assets/pencil.svg)"
              isCursor={true}
              onClick={() => {
                setmodalGather({ ...modalGather, editNicknameModal: true });
              }}
            ></EvBox>
          </EvBox>
          <EditNicknameModal />

          <EvBox
            width={'19.375rem'}
            height={19.375}
            margin={'1rem auto 0 auto '}
            backgroundsize="16rem"
            url={`url(${userInfoData?.characterInfo.characterUrl})`}
          />

          <EvBox
            width={'5.25rem'}
            height={0.75}
            margin={'-3rem 9.0625rem 0 9.0625rem '}
            url={`url(/assets/shadow.svg)`}
          />
          <EvBox
            style={{ zIndex: 2 }}
            width={'1.3125rem'}
            height={1.3125}
            margin={'-0.4rem 2rem 0 20.0625rem '}
            url="url(/assets/물음표.svg)"
            isCursor={true}
            onClick={() => {
              setmodalGather({ ...modalGather, explainModal: true });
            }}
          />
          <ExplainModal />

          <EvBox width={'22rem'} height={4} margin={'-0.3rem auto 0 auto '}>
            <EvBox width={'10rem'} height={1.375}>
              <EvKoreanFont size={1.25} color="#000000" weight={500}>
                {`Lv.${userInfoData?.characterInfo.level}`}
              </EvKoreanFont>
            </EvBox>
            <EvBox width={'22rem'} height={1.375} margin={'0.875rem auto 0 auto '}>
              <EvKoreanFont size={1.64} color="#000000" weight={700}>
                {userInfoData?.characterInfo.characterName}
              </EvKoreanFont>
            </EvBox>
          </EvBox>

          {/* 나의 보유아이템 */}
          <EvFontBox width={10.0625} height={1.6875} margin={'2.5rem auto 0 5.3%'}>
            <EvKoreanFont size={1.125} color="#000000" weight={500}>
              나의 보유 아이템
            </EvKoreanFont>
          </EvFontBox>

          <EvRowBadgeWrap>
            <BadgeBox margin="0 auto 0 0">
              <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                <EvKoreanFont size={0.875} weight={700}>
                  스터디
                </EvKoreanFont>
              </EvFontBox>
              <BadgeImgBox
                url={
                  userInfoData?.characterInfo.study >= 30
                    ? 'url(/assets/mainbadge/badge_study01.svg)'
                    : userInfoData?.characterInfo.study >= 15
                    ? 'url(/assets/mainbadge/badge_study02.svg)'
                    : userInfoData?.characterInfo.study >= 5
                    ? 'url(/assets/mainbadge/badge_study03.svg)'
                    : 'url(/assets/mainbadge/badge_study_zero.svg)'
                }
              ></BadgeImgBox>
              <TodoNumberBox>
                <EvFontBox margin="-0.2rem 0 0 0">
                  <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                    {userInfoData?.characterInfo.study}
                  </EvKoreanFont>
                </EvFontBox>
              </TodoNumberBox>
            </BadgeBox>

            <BadgeBox margin="auto">
              <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                <EvKoreanFont size={0.875} weight={700}>
                  운동
                </EvKoreanFont>
              </EvFontBox>
              <BadgeImgBox
                url={
                  userInfoData?.characterInfo.exercise >= 30
                    ? 'url(/assets/mainbadge/badge_exercise01.svg)'
                    : userInfoData?.characterInfo.exercise >= 15
                    ? 'url(/assets/mainbadge/badge_exercise02.svg)'
                    : userInfoData?.characterInfo.exercise >= 5
                    ? 'url(/assets/mainbadge/badge_exercise03.svg)'
                    : 'url(/assets/mainbadge/badge_exercise_zero.svg)'
                }
              ></BadgeImgBox>
              <TodoNumberBox>
                <EvFontBox margin="-0.2rem 0 0 0">
                  <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                    {userInfoData?.characterInfo.exercise}
                  </EvKoreanFont>
                </EvFontBox>
              </TodoNumberBox>
            </BadgeBox>

            <BadgeBox margin="auto">
              <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                <EvKoreanFont size={0.875} weight={700}>
                  쇼핑
                </EvKoreanFont>
              </EvFontBox>
              <BadgeImgBox
                url={
                  userInfoData?.characterInfo.shopping >= 30
                    ? 'url(/assets/mainbadge/badge_shopping01.svg)'
                    : userInfoData?.characterInfo.shopping >= 15
                    ? 'url(/assets/mainbadge/badge_shopping02.svg)'
                    : userInfoData?.characterInfo.shopping >= 5
                    ? 'url(/assets/mainbadge/badge_shopping03.svg)'
                    : 'url(/assets/mainbadge/badge_shopping_zero.svg)'
                }
              ></BadgeImgBox>
              <TodoNumberBox>
                <EvFontBox margin="-0.2rem 0 0 0">
                  <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                    {userInfoData?.characterInfo.shopping}
                  </EvKoreanFont>
                </EvFontBox>
              </TodoNumberBox>
            </BadgeBox>

            <BadgeBox margin="0 0 0 auto">
              <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                <EvKoreanFont size={0.875} weight={700}>
                  약속
                </EvKoreanFont>
              </EvFontBox>
              <BadgeImgBox
                url={
                  userInfoData?.characterInfo.promise >= 30
                    ? 'url(/assets/mainbadge/badge_promise01.svg)'
                    : userInfoData?.characterInfo.promise >= 15
                    ? 'url(/assets/mainbadge/badge_promise02.svg)'
                    : userInfoData?.characterInfo.promise >= 5
                    ? 'url(/assets/mainbadge/badge_promise03.svg)'
                    : 'url(/assets/mainbadge/badge_promise_zero.svg)'
                }
              ></BadgeImgBox>
              <TodoNumberBox>
                <EvFontBox margin="-0.2rem 0 0 0">
                  <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                    {userInfoData?.characterInfo.promise}
                  </EvKoreanFont>
                </EvFontBox>
              </TodoNumberBox>
            </BadgeBox>
          </EvRowBadgeWrap>

          {/* 오늘의 투두리스트 */}
          <EvFontBox width={10.0625} height={1.6875} margin={'1.75rem auto 0 5.3%'}>
            <EvKoreanFont size={1.125} color="#000000" weight={500}>
              오늘의 투두 리스트
            </EvKoreanFont>
          </EvFontBox>
          <ToDoBox>
            {userInfoData?.todayTodoList.length > 0 ? (
              userInfoData?.todayTodoList.map((today) => {
                return (
                  <EvBox direction={'row'} width={'100%'} key={today.todoId}>
                    <EvBox width={'0.875rem'} margin={'0rem 0.5rem 0 1rem'}>
                      <AiOutlineCheck color={today.state ? '#000000' : ' #BABABA'} />
                    </EvBox>
                    <EvBox width={'83%'} margin={'0rem auto 0 0'} isAlignSide={true}>
                      <EvKoreanFont size={0.875} color="#000000">
                        {today.todoContent}
                      </EvKoreanFont>
                    </EvBox>
                  </EvBox>
                );
              })
            ) : (
              <EvKoreanFont weight={500} size={0.875} color="#5F5F5F">
                오늘의 투두리스트가 없습니다.
              </EvKoreanFont>
            )}
          </ToDoBox>

          <EvBox style={{ top: '10rem', position: 'absolute' }} width={'19.5rem'} height="19.5">
            <ExpBar exp={userInfoData?.characterInfo.expPercent} ismine={true}></ExpBar>
          </EvBox>
        </ContentContainer>
      </MainContainer>
      <BottomNavLayout />
    </MainPageWrapper>
  );
};
