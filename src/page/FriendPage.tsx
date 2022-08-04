import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';

import { modalGatherState } from '../recoil/store';
import EditNicknameModal from '../component/modallayout/EditNicknameModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Wrapper } from '../component/element';
import { EvBox, EvColumnBox, EvFontBox, EvKoreanFont } from '../component/element/BoxStyle';
import axios, { AxiosError } from 'axios';
import ExpBar from '../component/element/ExpBar';
import setupInterceptorsTo from '../api/Interceptiors';
import { useParams } from 'react-router';
import { FriendInfo } from '../Types/user';
import { BadgeImgBox, EvRowBadgeWrap, TodoNumberBox } from './Main';
import ExplainModal from '../component/modallayout/ExplainModal';
import { friendApi } from '../api/callApi';
import { useCommonConfirm } from '../hooks/useCommonConfirm';

const MainContainer = styled.div`
  height: 100%;
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
  background: #c5de7b; /* fallback for old browsers */
  background: -webkit-linear-gradient(180deg, #ffffff 5%, #c5de7b 75.32%); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    180deg,
    #ffffff 5%,
    #c5de7b 75.32%
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isAlignSide?: boolean;
  isContentSide?: boolean;
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
  min-height: 6.25rem;
  margin: 0.375rem 5.3% 4rem 5.3%;
  min-height: 6.25rem;
  flex-direction: column;
  justify-content: ${(props: box) => (props.isContentSide ? '' : 'center')};
  align-items: ${(props: box) => (props.isAlignSide ? '' : 'center')};
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

export const FriendBadgeBox = styled(EvColumnBox)`
  background-color: #ffffff;
  width: 25%;
  height: 100%;
  box-shadow: 0px 2px 8px rgba(148, 174, 74, 0.5);
  border-radius: 6px;
`;

export const FriendPage = () => {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [frienduserInfoData, setFriendUserInfoData] = useState<FriendInfo>();
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const localToken = localStorage.getItem('recoil-persist');

  const nav = useNavigate();

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  const queryClient = useQueryClient();
  // 친구 유저정보 가져오는 API
  const baseApi = axios.create({
    baseURL: 'https://todowith.shop',
    timeout: 2000,
  });

  //닉네임 친구추가 API
  const friendAddData = useMutation((nick: { nick: string | undefined }) => friendApi.friendAddApi(nick), {
    onSuccess: (token) => {
      openSuccessConfirm({
        title: `${frienduserInfoData?.nick}님께 친구 요청을 보냈습니다!`,
      }),
        setmodalGather({ ...modalGather, friendAddModal: false });
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        // setTimeout(() => friendAdd(), 200);
      } else {
        openErrorConfirm({
          title: error.response?.data.msg,
        });
      }
    },
  });

  const goFriendAdd = { nick: frienduserInfoData?.nick };

  const friendAdd = () => {
    friendAddData.mutate(goFriendAdd);
  };

  const callApi = setupInterceptorsTo(baseApi);
  const friendParam = useParams();
  const friendNick = friendParam.nick;
  const friendUserInfoApi = async () => {
    const fuia = await callApi.get(`/friend/page/${friendNick}`);
    return fuia;
  };
  // console.log(friendNick);

  const friendUserInfoData = useQuery('friendUserData', friendUserInfoApi, {
    onSuccess: (data) => {
      setFriendUserInfoData(data.data);
      // console.log(data);
    },
    // onError: (error: AxiosError<{ msg: string }>) => {
    //   if (error.message === 'Request failed with status code 401') {
    //     setTimeout(() => chattingMessage((data: FieldValues)), 200);
    //   } else {
    // openErrorConfirm({
    //   title: error.response?.data.msg,
    // });
    //   }
    // },
  });

  useEffect(() => {
    if (!localToken) {
      nav('/login');
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
        {frienduserInfoData && (
          <ContentContainer>
            <EvBox direction="row" margin="1.875rem 0 0 0 " height={4.75}>
              <EvBox
                width={'5.625rem'}
                height={5.625}
                margin={'0 auto '}
                url={`url(${frienduserInfoData?.profileImageUrl})`}
                borderRadius="50%"
              />
            </EvBox>

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
                  {frienduserInfoData?.nick}
                </EvKoreanFont>
              </EvBox>
              <EvBox
                width={'1.3rem'}
                height={1.3}
                margin={'auto 5.5rem auto 0rem'}
                url="url(/assets/friendadd.png)"
                isCursor={true}
                onClick={() => {
                  friendAdd();
                }}
              ></EvBox>
            </EvBox>
            <EditNicknameModal />

            <EvBox
              width={'19.375rem'}
              height={19.375}
              margin={'1rem auto 0 auto '}
              backgroundsize="16rem"
              url={`url(${frienduserInfoData?.characterInfo.characterUrl})`}
            />
            <ExplainModal />
            <EvBox
              width={'5.25rem'}
              height={0.75}
              margin={'-3rem 9.0625rem 0 9.0625rem '}
              url={`url(/assets/shadow.svg)`}
            />
            <EvBox
              style={{ zIndex: 2 }}
              width={'2em'}
              height={2}
              margin={'-16.5rem 2rem 0 20.0625rem '}
              url="url(/assets/물음표.svg)"
              isCursor={true}
              onClick={() => {
                setmodalGather({ ...modalGather, explainModal: true });
              }}
            />

            <EvBox width={'22rem'} height={4} margin={'15.5rem auto 0 auto '}>
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

            <EvFontBox width={10.0625} height={1.6875} margin={'2.5rem auto 0 5.3%'}>
              <EvKoreanFont size={1.125} color="#000000" weight={500}>
                {frienduserInfoData?.nick}님의 보유 아이템
              </EvKoreanFont>
            </EvFontBox>

            <EvRowBadgeWrap>
              <FriendBadgeBox margin="0 auto 0 0">
                <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                  <EvKoreanFont size={0.875} weight={700}>
                    스터디
                  </EvKoreanFont>
                </EvFontBox>
                <BadgeImgBox
                  url={
                    frienduserInfoData?.characterInfo.study >= 30
                      ? 'url(/assets/mainbadge/badge_study01.svg)'
                      : frienduserInfoData?.characterInfo.study >= 15
                      ? 'url(/assets/mainbadge/badge_study02.svg)'
                      : frienduserInfoData?.characterInfo.study >= 5
                      ? 'url(/assets/mainbadge/badge_study03.svg)'
                      : 'url(/assets/mainbadge/badge_study_zero.svg)'
                  }
                ></BadgeImgBox>
                <TodoNumberBox>
                  <EvFontBox margin="-0.2rem 0 0 0">
                    <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                      {frienduserInfoData?.characterInfo.study}
                    </EvKoreanFont>
                  </EvFontBox>
                </TodoNumberBox>
              </FriendBadgeBox>

              <FriendBadgeBox margin="auto">
                <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                  <EvKoreanFont size={0.875} weight={700}>
                    운동
                  </EvKoreanFont>
                </EvFontBox>
                <BadgeImgBox
                  url={
                    frienduserInfoData?.characterInfo.exercise >= 30
                      ? 'url(/assets/mainbadge/badge_exercise01.svg)'
                      : frienduserInfoData?.characterInfo.exercise >= 15
                      ? 'url(/assets/mainbadge/badge_exercise02.svg)'
                      : frienduserInfoData?.characterInfo.exercise >= 5
                      ? 'url(/assets/mainbadge/badge_exercise03.svg)'
                      : 'url(/assets/mainbadge/badge_exercise_zero.svg)'
                  }
                ></BadgeImgBox>
                <TodoNumberBox>
                  <EvFontBox margin="-0.2rem 0 0 0">
                    <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                      {frienduserInfoData?.characterInfo.exercise}
                    </EvKoreanFont>
                  </EvFontBox>
                </TodoNumberBox>
              </FriendBadgeBox>

              <FriendBadgeBox margin="auto">
                <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                  <EvKoreanFont size={0.875} weight={700}>
                    쇼핑
                  </EvKoreanFont>
                </EvFontBox>
                <BadgeImgBox
                  url={
                    frienduserInfoData?.characterInfo.shopping >= 30
                      ? 'url(/assets/mainbadge/badge_shopping01.svg)'
                      : frienduserInfoData?.characterInfo.shopping >= 15
                      ? 'url(/assets/mainbadge/badge_shopping02.svg)'
                      : frienduserInfoData?.characterInfo.shopping >= 5
                      ? 'url(/assets/mainbadge/badge_shopping03.svg)'
                      : 'url(/assets/mainbadge/badge_shopping_zero.svg)'
                  }
                ></BadgeImgBox>
                <TodoNumberBox>
                  <EvFontBox margin="-0.2rem 0 0 0">
                    <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                      {frienduserInfoData?.characterInfo.shopping}
                    </EvKoreanFont>
                  </EvFontBox>
                </TodoNumberBox>
              </FriendBadgeBox>

              <FriendBadgeBox margin="0 0 0 auto">
                <EvFontBox width={'2.4375rem'} height={1.3125} margin={'0.625rem auto 0 auto'}>
                  <EvKoreanFont size={0.875} weight={700}>
                    약속
                  </EvKoreanFont>
                </EvFontBox>
                <BadgeImgBox
                  url={
                    frienduserInfoData?.characterInfo.promise >= 30
                      ? 'url(/assets/mainbadge/badge_promise01.svg)'
                      : frienduserInfoData?.characterInfo.promise >= 15
                      ? 'url(/assets/mainbadge/badge_promise02.svg)'
                      : frienduserInfoData?.characterInfo.promise >= 5
                      ? 'url(/assets/mainbadge/badge_promise03.svg)'
                      : 'url(/assets/mainbadge/badge_promise_zero.svg)'
                  }
                ></BadgeImgBox>
                <TodoNumberBox>
                  <EvFontBox margin="-0.2rem 0 0 0">
                    <EvKoreanFont size={1} color="#FFFFFF" weight={700}>
                      {frienduserInfoData?.characterInfo.promise}
                    </EvKoreanFont>
                  </EvFontBox>
                </TodoNumberBox>
              </FriendBadgeBox>
            </EvRowBadgeWrap>

            <EvFontBox width={10.0625} height={1.6875} margin={'1.75rem auto 0 5.3%'}>
              <EvKoreanFont size={1.125} color="#000000" weight={500}>
                오늘의 투두리스트
              </EvKoreanFont>
            </EvFontBox>

            {frienduserInfoData?.todoList === null || frienduserInfoData?.todoList.length < 1 ? (
              <ToDoBox>
                <EvKoreanFont weight={500} size={0.875} color="#5F5F5F">
                  오늘의 투두리스트가 없거나, 비공개입니다
                </EvKoreanFont>
              </ToDoBox>
            ) : (
              <ToDoBox isContentSide={true}>
                {frienduserInfoData.todoList.map((today) => {
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
                })}{' '}
              </ToDoBox>
            )}

            <EvBox style={{ top: '10rem', position: 'absolute' }} width={'19.5rem'} height="19.5">
              {frienduserInfoData && <ExpBar exp={frienduserInfoData?.characterInfo.expPercent} ismine={false} />}
            </EvBox>
          </ContentContainer>
        )}
      </MainContainer>
    </NavLayout>
  );
};
