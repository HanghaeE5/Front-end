import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';
import {
  accessTokenState,
  editNicknameModalState,
  editPhotoModalState,
  levelUpModalState,
  refreshTokenState,
  stepUpModalState,
  userChatacterTypeState,
  userInfoState,
  userPhotoWaitState,
  userprofilephotoState,
} from '../recoil/store';
import EditNicknameModal from '../component/modallayout/EditNicknameModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditPhotoModal from '../component/modallayout/EditPhotoModal';
import { useQuery } from 'react-query';
import { userApi } from '../api/callApi';
import { NoHeaderPageLayout } from '../component/layout/NoHeaderPageLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { EvBox, EvBtn, EvEnglishFont, EvKoreanFont } from '../component/element/BoxStyle';
import { ReactComponent as Excercise } from '../asset/icons/todoIcon/icon_exercise.svg';
import { ReactComponent as PromiseIcon } from '../asset/icons/todoIcon/icon_promise.svg';
import { ReactComponent as Shopping } from '../asset/icons/todoIcon/icon_shopping.svg';
import { ReactComponent as Study } from '../asset/icons/todoIcon/icon_study.svg';
import { AxiosError } from 'axios';
import LevelUpModal from '../component/modallayout/LevelUpModal';
import StepUpModal from '../component/modallayout/StepUpModal';
import ExpBar from '../component/element/ExpBar';

const MainContainer = styled.div`
  /* display: flex; */
  /* flex-direction: column;
  align-items: center; */
  height: 100%;
  background: #ffe074; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #ffffff 25%, #ffe074); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff 25%,
    #ffe074
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  position: relative;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  section:nth-of-type(1) {
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  section:nth-of-type(2) {
    overflow-y: scroll;
    height: 100%;
    background-color: ${({ theme }) => theme.color.grayLight};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
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
  max-height: 6.1875rem;
  margin: 0.375rem 5.3% 0 5.3%;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 1rem 0;
  gap: 0.7rem;
  background-color: #ffffff;
  border-radius: 6px;
  //스크롤바 없애기
  ::-webkit-scrollbar {
    display: none;
  }
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
`;

console.log(window.location.href);

export const Main = () => {
  const [, setmodalEditNickname] = useRecoilState(editNicknameModalState);
  const [, setModalEditPhoto] = useRecoilState(editPhotoModalState);
  const [modalLevelUp, setModalLevelUp] = useRecoilState(levelUpModalState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [modalStepUp, setModalStepUp] = useRecoilState(stepUpModalState);
  const [userChatacterType, setUserChatacterType] = useRecoilState(userChatacterTypeState);
  const accessLoginToken = useSetRecoilState(accessTokenState);
  const refreshLoginToken = useSetRecoilState(refreshTokenState);
  const [fileImage, setFileImage] = useRecoilState(userprofilephotoState);
  const setUserPhotoWait = useSetRecoilState(userPhotoWaitState);
  const all = window.location.href;

  const first = all.split('&');
  const accessToken = first[0].split('=')[1];
  const nav = useNavigate();

  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserInfoData(data.data);
      setFileImage({ img_show: data.data.profileImageUrl, img_file: '' });
      // setUserPhotoWait({ img_show: data.data.profileImageUrl, img_file: '' });
    },
    onError: (error: AxiosError) => {
      if (error.message === 'Request failed with status code 404') {
        nav(-1);
      }
    },
  });

  console.log(userInformData);
  useEffect(() => {
    if (accessToken) {
      // console.log();
      const refreshToken = first[1].split('=')[1];
      // console.log(refreshToken);
      const isNickname = first[2].split('=')[1];
      // console.log(isNickname);
      accessLoginToken(accessToken);
      refreshLoginToken(refreshToken);

      if (isNickname === 'N') {
        nav('/signupsns');
      } else {
        window.location.replace('/');
      }
      if (userInfoData?.nick === '') {
        nav('/signupsns');
      }
      if (isNickname === 'Y' && !userInfoData?.characterInfo.type) {
        nav('/choosecharacter');
      }
    }
  }, []);

  useEffect(() => {
    if (userInformData.error?.message === 'Request failed with status code 401') {
      userInformData.refetch();
    }
  }, []);

  return (
    <NavLayout>
      <MainContainer>
        <ContentContainer>
          <EvBox direction="row" margin="3rem 0 0 0 " height={4.75}>
            <EvBox
              width={'4.75rem'}
              height={4.75}
              margin={'0 0 0 9rem'}
              url={`url(${fileImage.img_show})`}
              borderRadius="50%"
              border="1px solid #D9D9D9"
            />
            <EvBox
              width={'1.3294rem'}
              height={1.2468}
              margin={'auto 7.5625rem auto 0.5rem'}
              url={'url(/assets/camera.svg)'}
              isCursor={true}
              onClick={() => {
                setModalEditPhoto(true);
              }}
            />
          </EvBox>
          <EditPhotoModal />
          <EvBox direction="row" margin="1rem 0 0 0 " height={2.125} style={{ zIndex: 3 }}>
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
              margin={'auto 5.0rem auto 0'}
              url="url(/assets/pencil.svg)"
              isCursor={true}
              onClick={() => {
                setmodalEditNickname(true);
              }}
            ></EvBox>
          </EvBox>
          <EditNicknameModal />
          {/* <EvBox
            width={'19.375rem'}
            height={19.375}
            margin={'-0.5rem auto 0 auto '}
            borderRadius="50%"
            backgroundColor="#ffad60"
          > */}{' '}
          <EvBox
            width={'19.375rem'}
            height={19.375}
            margin={'auto '}
            borderRadius="50%"
            // backgroundColor="#ffffff"
            url={`url(${userInfoData?.characterInfo.characterUrl})`}
            backgroundsize="21rem"
          ></EvBox>
          {/* </EvBox> */}
          <EvBox
            width={'5.25rem'}
            height={0.75}
            margin={'-4rem 9.0625rem 0 9.0625rem '}
            url={`url(/assets/shadow.svg)`}
          ></EvBox>
          <EvBox
            width={'1.3125rem'}
            height={1.3125}
            margin={'-1rem 2rem 0 21.0625rem '}
            url="url(/assets/물음표.svg)"
            isCursor={true}
            backgroundsize="1.5rem"
          ></EvBox>
          <EvBox width={'15rem'} height={4} margin={'0rem auto 0 auto '}>
            <EvBox width={'10rem'} height={1.375}>
              <EvKoreanFont size={1.25} color="#000000" weight={500}>
                {`Lv.${userInfoData?.characterInfo.level}`}
              </EvKoreanFont>
            </EvBox>
            <EvBox width={'10'} height={1.375} margin={'0.875rem auto 0 auto '}>
              <EvKoreanFont size={1.64} color="#000000" weight={700}>
                {userInfoData?.characterInfo.characterName}
              </EvKoreanFont>
            </EvBox>
          </EvBox>
          <EvBox direction={'row'} width={'92%'} height={5.75} columnGap={'10px'} margin={'1.125rem auto 0 auto '}>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'}>
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid #1A1A1A'}
                borderRadius="50%"
                backgroundColor="#ffffff"
              >
                <EvBox width={'3.5rem'} height={3.5} margin={'auto'}>
                  <Study />
                  <EvKoreanFont size={0.875} color="#000000" weight={600}>
                    {userInfoData?.characterInfo.shopping}
                  </EvKoreanFont>
                </EvBox>
              </EvBox>
            </EvBox>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'}>
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid #1A1A1A'}
                borderRadius="50%"
                backgroundColor="#ffffff"
              >
                <EvBox width={'3.5rem'} height={3.5} margin={'auto'} backgroundColor="#fffff">
                  <Excercise />
                  <EvKoreanFont size={0.875} color="#000000" weight={600}>
                    {userInfoData?.characterInfo.exercise}
                  </EvKoreanFont>
                </EvBox>
              </EvBox>
            </EvBox>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'}>
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid #1A1A1A'}
                borderRadius="50%"
                backgroundColor="#ffffff"
              >
                <EvBox width={'3.5rem'} height={3.5} margin={'auto'}>
                  <Shopping />
                  <EvKoreanFont size={0.875} color="#000000" weight={600}>
                    {userInfoData?.characterInfo.shopping}
                  </EvKoreanFont>
                </EvBox>
              </EvBox>
            </EvBox>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'}>
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid #1A1A1A'}
                borderRadius="50%"
                backgroundColor="#ffffff"
              >
                <EvBox width={'3.5rem'} height={3.5} margin={'auto'} backgroundColor="#fffff">
                  <PromiseIcon />
                  <EvKoreanFont size={0.875} color="#000000" weight={600}>
                    {userInfoData?.characterInfo.promise}
                  </EvKoreanFont>
                </EvBox>
              </EvBox>
            </EvBox>
          </EvBox>
          <EvBox width={10.0625} height={1.6875} margin={'1.75rem auto 0 8%'}>
            <EvEnglishFont size={1.25} color="#000000" weight={700}>
              Today_ to do list
            </EvEnglishFont>
          </EvBox>
          <ToDoBox>
            {userInfoData?.todayTodoList.map((today) => {
              return (
                <EvBox direction={'row'} width={'100%'} key={today.todoId}>
                  <EvBox width={'0.875rem'} margin={'0rem 0.5rem 0 1rem'}>
                    <AiOutlineCheck color={today.state ? '#000000' : ' #BABABA'} />
                  </EvBox>
                  <EvBox width={'83%'} margin={'0rem auto 0 0'} isAlignSide={true}>
                    <EvKoreanFont size={0.87} color="#000000">
                      {today.todoContent}
                    </EvKoreanFont>
                  </EvBox>
                </EvBox>
              );
            })}
          </ToDoBox>
          <EvBtn
            onClick={() => {
              setModalLevelUp(true);
            }}
          >
            레벨업모달
          </EvBtn>
          <LevelUpModal />
          <EvBtn
            onClick={() => {
              setModalStepUp(true);
            }}
          >
            스텝업모달
          </EvBtn>
          <StepUpModal />
          <EvBox width={'19.5rem'} height="19.5" margin="-40.5rem auto auto auto">
            <ExpBar exp={userInfoData?.characterInfo.expPercent}></ExpBar>
          </EvBox>
        </ContentContainer>
      </MainContainer>
    </NavLayout>
  );
};
