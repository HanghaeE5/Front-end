import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsQuestionCircle } from 'react-icons/bs';
import { ReactComponent as DirectionIcon } from '../asset/icons/direction.svg';

import {
  accessTokenState,
  editNicknameModalState,
  editPhotoModalState,
  friendInfoState,
  levelUpModalState,
  refreshTokenState,
  stepUpModalState,
  userChatacterTypeState,
  userInfoState,
  userPhotoWaitState,
  userprofilephotoState,
} from '../recoil/store';
import EditNicknameModal from '../component/modallayout/EditNicknameModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EditPhotoModal from '../component/modallayout/EditPhotoModal';
import { useQuery, useQueryClient } from 'react-query';
import { userApi } from '../api/callApi';
import { InfoModal } from '../component/InfoModal';
import { Typography, Wrapper } from '../component/element';
import { PATH } from '../route/routeList';
import { NoHeaderPageLayout } from '../component/layout/NoHeaderPageLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { EvBox, EvBtn, EvEnglishFont, EvKoreanFont } from '../component/element/BoxStyle';
import { ReactComponent as Excercise } from '../asset/icons/todoIcon/icon_exercise.svg';
import { ReactComponent as PromiseIcon } from '../asset/icons/todoIcon/icon_promise.svg';
import { ReactComponent as Shopping } from '../asset/icons/todoIcon/icon_shopping.svg';
import { ReactComponent as Study } from '../asset/icons/todoIcon/icon_study.svg';
import axios, { AxiosError } from 'axios';
import LevelUpModal from '../component/modallayout/LevelUpModal';
import StepUpModal from '../component/modallayout/StepUpModal';
import ExpBar from '../component/element/ExpBar';
import setupInterceptorsTo from '../api/Interceptiors';
import { useParams } from 'react-router';

const MainContainer = styled.div`
  height: 100%;
  background: #82d5ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #ffffff 25%, #96dcff); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff 25%,
    #96dcff
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
const EventWrapper = styled(Wrapper)`
  cursor: pointer;
`;

export const FriendPage = () => {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [frienduserInfoData, setFriendUserInfoData] = useRecoilState(friendInfoState);
  const accessLoginToken = useSetRecoilState(accessTokenState);
  const refreshLoginToken = useSetRecoilState(refreshTokenState);
  const [fileImage, setFileImage] = useRecoilState(userprofilephotoState);
  const setUserPhotoWait = useSetRecoilState(userPhotoWaitState);
  const all = window.location.href;

  const first = all.split('&');
  const accessToken = first[0].split('=')[1];
  const nav = useNavigate();

  const queryClient = useQueryClient();
  // 친구 유저정보 가져오는 API
  const baseApi = axios.create({
    baseURL: 'https://todowith.shop',
    timeout: 1000,
  });

  const callApi = setupInterceptorsTo(baseApi);
  const friendParam = useParams();
  const friendNick = friendParam.nick;
  const friendUserInfoApi = async () => {
    const fuia = await callApi.get(`/friend/page/${friendNick}`);
    return fuia;
  };
  console.log(friendNick);

  const friendUserInfoData = useQuery('friendUserData', friendUserInfoApi, {
    onSuccess: (data) => {
      setFriendUserInfoData(data.data);
      console.log(data);
    },
    // onError: (error: AxiosError<{ msg: string }>) => {
    //   if (error.message === 'Request failed with status code 401') {
    //     setTimeout(() => chattingMessage((data: FieldValues)), 200);
    //   } else {
    //     alert(error.response?.data.msg);
    //   }
    // },
  });

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
      if (frienduserInfoData?.nick === '') {
        nav('/signupsns');
      }
      if (isNickname === 'Y' && !frienduserInfoData?.characterInfo.type) {
        nav('/choosecharacter');
      }
    }
  }, []);

  // useEffect(() => {
  //   if (frienduserInfoData.error?.message === 'Request failed with status code 401') {
  //     frienduserInfoData.refetch();
  //   }
  // }, []);

  return (
    <NavLayout>
      <MainContainer>
        <ContentContainer>
          <EvBox direction="row" margin="3rem 0 0 0 " height={4.75}>
            <EvBox
              width={'4.75rem'}
              height={4.75}
              margin={'0 auto '}
              url={`url(${frienduserInfoData?.profileImageUrl})`}
              borderRadius="50%"
              border="1px solid #D9D9D9"
            />
          </EvBox>
          <EditPhotoModal />
          <EvBox direction="row" margin="1rem 0 0 0 " height={2.125} style={{ zIndex: 3 }}>
            <EvBox
              width={'9.125rem'}
              height={2.125}
              margin={'0 auto '}
              border="1px solid #DDDDDD"
              borderRadius="100px"
              backgroundColor="#ffffff"
            >
              <EvKoreanFont size={0.875} weight={700}>
                {frienduserInfoData?.nick}
              </EvKoreanFont>
            </EvBox>
          </EvBox>
          <EditNicknameModal />

          <EvBox
            width={'19.375rem'}
            height={19.375}
            margin={'auto '}
            borderRadius="50%"
            url={`url(${frienduserInfoData?.characterInfo.characterUrl})`}
            backgroundsize="19rem"
          />

          <EvBox
            width={'5.25rem'}
            height={0.75}
            margin={'-4rem 9.0625rem 0 9.0625rem '}
            url={`url(/assets/shadow.svg)`}
          />
          <EvBox
            width={'1.3125rem'}
            height={1.3125}
            margin={'-1rem 2rem 0 21.0625rem '}
            url="url(/assets/물음표.svg)"
            isCursor={true}
            backgroundsize="1.5rem"
          />

          <EvBox width={'22rem'} height={4} margin={'1rem auto 0 auto '}>
            <EvBox width={'10rem'} height={1.375}>
              <EvKoreanFont size={1.25} color="#000000" weight={500}>
                {`Lv.${frienduserInfoData?.characterInfo.level}`}
              </EvKoreanFont>
            </EvBox>
            <EvBox width={'22rem'} height={1.375} margin={'0.875rem auto 0 auto '}>
              <EvKoreanFont size={1.64} color="#000000" weight={700}>
                {frienduserInfoData?.characterInfo.characterName}
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
                    {frienduserInfoData?.characterInfo.shopping}
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
                    {frienduserInfoData?.characterInfo.exercise}
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
                    {frienduserInfoData?.characterInfo.shopping}
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
                    {frienduserInfoData?.characterInfo.promise}
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
            {/* {frienduserInfoData?.todayTodoList.map((today) => {
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
            })} */}
          </ToDoBox>

          <EvBox
            style={{ top: '10rem', position: 'absolute' }}
            width={'19.5rem'}
            height="19.5"
            // margin="-41.5rem auto auto auto"
          >
            <ExpBar exp={frienduserInfoData?.characterInfo.expPercent}></ExpBar>
          </EvBox>
        </ContentContainer>
      </MainContainer>
    </NavLayout>
  );
};
