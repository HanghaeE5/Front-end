import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { chattingApi, friendApi } from '../api/callApi';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { chattingListState, friendListState, userInfoState } from '../recoil/store';
import Stomp from 'stompjs';

import SockJS from 'sockjs-client';
import { EvAbleFont, EvColumnBox, EvFontBox, EvImgBox, EvKoreanFont } from '../component/element/BoxStyle';
import { ReactComponent as Empty } from '../asset/icons/icon_empty.svg';
import { useCommonConfirm } from '../hooks/useCommonConfirm';

const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  //스크롤바 없애기
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

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const ChattingRoomPhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin: ${(props: box) => props.margin};
  /* background-color: yellowgreen; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const ChattingRoomTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  height: 3rem;
  margin: auto auto auto 0.75rem;
  /* background-color: #6922bb; */
  cursor: pointer;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #683b3b; */
  background-repeat: no-repeat;
  background-position: center;
`;

const RowChattingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 89%;
  height: 5rem;
  margin: 0 auto 0 auto;
  /* background-color: #ffa6a6; */
`;

type font = {
  size?: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

type btnbox = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  color?: string;
  isSelect?: boolean;
};

const BtnBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-style: solid;
  border-color: #5f5f5f;
  border-width: ${(props: btnbox) => (props.isSelect ? '1px 1px 0px 1px' : '0px 0px 1px 0px')};
  background-color: ${(props: btnbox) => (props.isSelect ? '#FFD600' : 'white')};
  border-radius: 6px 6px 0px 0px;
  width: 44.6%;
  height: 3.125rem;

  background-color: ${(props: btnbox) => props.color};
  cursor: pointer;
`;

export const Chatting = () => {
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [chattingListbtn, setChattingListbtn] = useState<boolean>(true);
  const [friendListbtn, setFriendListbtn] = useState<boolean>(false);
  const [friendList, setFriendList] = useRecoilState(friendListState);
  const [chattingList, setChattingList] = useRecoilState(chattingListState);
  const [makeChattingRoomName, setMakeChattingRoomName] = useState<string>('');
  const [makeChattingRoomNickname, setMakeChattingRoomNickname] = useState<string>('');
  const [deleteChattingroom, setDeleteChattingroom] = useState<string>('');
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  //채팅 목록 API
  const getChattingQuery = useQuery('chattingLists', chattingApi.chattingListApi, {
    //여기서 리코일에 저장

    onSuccess: (data) => {
      console.log('첫번째실행');
      setChattingList(data.data);
    },
    // onError: (error: AxiosError<{ msg: string }>) => {
    //   if (error.message === 'Request failed with status code 401') {
    //     useQuery('chattingLists', chattingApi.chattingListApi, {
    //       onSuccess: (data) => {
    //         console.log('채팅목록불러오기 재실행');
    //         setChattingList(data.data);
    //       },
    //     });
    //   }
    // },
  });

  //친구 목록 API
  const getFriendQuery = useQuery('friendLists', friendApi.friendListApi, {
    //여기서 리코일에 저장
    onSuccess: (data) => {
      setFriendList(data.data);
    },
  });
  // console.log(getFriendQuery);

  //채팅방 생성 API
  const makePrivateChattingRoomData = useMutation(
    (data: { name: string; nick: string }) => chattingApi.makePrivateChattingRoomApi(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('chattingLists');
      },
      onError: (error: AxiosError<{ msg: string }>) => {
        if (error.message === 'Request failed with status code 401') {
          setTimeout(
            () => makePrivateChattingRoom({ name: makeChattingRoomName, nick: makeChattingRoomNickname }),
            200,
          );
        } else {
          openErrorConfirm({
            title: error.response?.data.msg,
          });
        }
      },
    },
  );

  //채팅방 삭제 API
  const chattingRoomDeleteData = useMutation(
    (roomId: { roomId: string }) => chattingApi.chattingRoomDeleteAPi(roomId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('chattingLists');
      },
      // onError: (error: AxiosError<{ msg: string }>) => {
      //   if (error.message === 'Request failed with status code 401') {
      //     setTimeout(() => chattingRoomDelete({ roomId: deleteChattingroom }), 200);
      //   } else {
      //     openErrorConfirm({
      //       title: error.response?.data.msg,
      //     });
      //   }
      // },
    },
  );

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws: Stomp.Client, callback: () => void) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1, // 밀리초 간격으로 실행
    );
  }

  const chattingRoomDelete = (roomId: { roomId: string }) => {
    chattingRoomDeleteData.mutate(roomId);
  };

  const makePrivateChattingRoom = (data: { name: string; nick: string }) => {
    makePrivateChattingRoomData.mutate(data);
  };

  const localToken = localStorage.getItem('recoil-persist');

  const sock = new SockJS('https://todowith.shop/ws');
  const ws = Stomp.over(sock);

  // 연결해제, 구독해제
  function wsDisConnectUnsubscribe(roomIdName: string) {
    try {
      if (localToken) {
        const toto = JSON.parse(localToken);

        if (toto) {
          const data = {
            type: 'QUIT',
            roomId: roomIdName,
            sender: userInfoData.nick,
            message: '',
          };
          ws.send('/pub/chat/message', { Authorization: toto.accessTokenState }, JSON.stringify(data));
          ws.unsubscribe('sub-0');
          ws.disconnect(
            () => {
              ws.unsubscribe('sub-0');
            },
            { Authorization: toto.accessTokenState },
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NavLayout>
      <PageLayout title="채팅">
        <ContentWrapper>
          <RowBox margin={'1.875rem 0 1.875rem 0'}>
            <BtnBox
              onClick={() => {
                setChattingListbtn(true);
                setFriendListbtn(false);
              }}
              isSelect={chattingListbtn}
            >
              <EvAbleFont size={0.875} isDisable={!chattingListbtn}>
                채팅방
              </EvAbleFont>
            </BtnBox>
            <BtnBox
              onClick={() => {
                setChattingListbtn(false);
                setFriendListbtn(true);
              }}
              isSelect={friendListbtn}
            >
              <EvAbleFont size={0.875} isDisable={!friendListbtn}>
                친구목록
              </EvAbleFont>
            </BtnBox>
          </RowBox>
          {chattingListbtn ? (
            //채팅버튼 눌렸을때
            chattingList.length === 0 ? (
              // 채팅방이 없으면
              <EvColumnBox width={'16rem'} height={10} margin="5rem auto auto auto">
                <EvImgBox margin="0 auto">
                  <Empty />
                </EvImgBox>
                <EvFontBox margin="1.25rem auto auto auto">
                  <EvKoreanFont align="center" isWhiteSpace={true} size={0.875} lineHeight={'20px'} color="#5F5F5F">
                    {`아직 참여하신 채팅방이 없어요.\n상단의 친구목록을 눌러 친구를 선택하거나\n커뮤니티에서 위드 투 두에 참가하시면\n채팅을 시작 할 수 있습니다!`}
                  </EvKoreanFont>
                </EvFontBox>
              </EvColumnBox>
            ) : (
              //채팅방 있으면
              chattingList.map((chatting) => {
                return (
                  <RowChattingBox key={chatting.roomId}>
                    <ChattingRoomPhotoBox
                      style={
                        chatting.participantList[0]
                          ? {
                              backgroundImage: `url(${chatting.participantList[0].user.profileImageUrl})`,
                            }
                          : { backgroundImage: `url(/assets/defaultprofile.svg)` }
                      }
                      onClick={() => {
                        nav(`/chat/room/${chatting.roomId}`);
                      }}
                    ></ChattingRoomPhotoBox>
                    <ChattingRoomTextBox
                      onClick={() => {
                        nav(`/chat/room/${chatting.roomId}`);
                      }}
                    >
                      <KoreanFont size={1}>
                        {chatting.name.length > 16 ? chatting.name.slice(0, 16) + '...' : chatting.name}
                      </KoreanFont>
                    </ChattingRoomTextBox>
                    <RowBox
                      width={'2rem'}
                      height={2}
                      margin={'auto 0 auto auto'}
                      style={{
                        backgroundSize: '1.5rem',
                        backgroundImage: 'url(/assets/exit.svg)',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        wsDisConnectUnsubscribe(chatting.roomId);
                        chattingRoomDelete({ roomId: chatting.roomId });
                        setDeleteChattingroom(chatting.roomId);
                        console.log(chatting.roomId);
                      }}
                    ></RowBox>
                  </RowChattingBox>
                );
              })
            )
          ) : // 친구목록 버튼 눌렸을때
          friendList.length === 0 ? (
            // 친구목록이 비어있으면
            <EvColumnBox width={'16rem'} height={10} margin="5rem auto auto auto">
              <EvImgBox margin="0 auto">
                <Empty />
              </EvImgBox>
              <EvFontBox margin="1.25rem auto auto auto">
                <EvKoreanFont align="center" isWhiteSpace={true} size={0.875} lineHeight={'20px'} color="#5F5F5F">
                  {`아직 추가하신 친구가 없어요.\n친구 목록 페이지에서 친구의 닉네임을\n입력하면 친구를 추가할 수 있습니다!`}
                </EvKoreanFont>
              </EvFontBox>
            </EvColumnBox>
          ) : (
            // 친구목록 있으면
            friendList.map((friend) => {
              return (
                <RowChattingBox
                  key={friend.id}
                  onClick={() => {
                    setMakeChattingRoomName(`${friend.nick}님과 ${userInfoData.nick}님의 대화`);
                    setMakeChattingRoomNickname(friend.nick);
                    makePrivateChattingRoom({
                      name: `${friend.nick}님과 ${userInfoData.nick}님의 대화`,
                      nick: friend.nick,
                    });
                  }}
                >
                  <ChattingRoomPhotoBox
                    style={{
                      backgroundImage: `url(${friend.profileImageUrl})`,
                    }}
                  ></ChattingRoomPhotoBox>
                  <ChattingRoomTextBox>
                    <KoreanFont size={1}>{friend.nick}</KoreanFont>
                  </ChattingRoomTextBox>
                </RowChattingBox>
              );
            })
          )}
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
