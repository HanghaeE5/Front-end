import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { chattingApi, friendApi } from '../api/callApi';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { chattingListState, friendListState, userNicknameState } from '../recoil/store';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

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
  background-color: ${(props: btnbox) => (props.isSelect ? '#89ee73' : 'white')};
  border-radius: 6px 6px 0px 0px;
  width: 45%;
  height: 2.6875rem;
  margin: '0 0 0 auto';
  background-color: ${(props: btnbox) => props.color};
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #ecee73;
  }
`;

export const Chatting = () => {
  const [chattingListbtn, setChattingListbtn] = useState<boolean>(true);
  const [friendListbtn, setFriendListbtn] = useState<boolean>(false);
  const [friendList, setFriendList] = useRecoilState(friendListState);
  const userNickname = useRecoilValue(userNicknameState);
  const [chattingList, setChattingList] = useRecoilState(chattingListState);
  const [makeChattingRoomName, setMakeChattingRoomName] = useState<string>('');
  const [makeChattingRoomNickname, setMakeChattingRoomNickname] = useState<string>('');
  const [deleteChattingroom, setDeleteChattingroom] = useState<string>('');
  const nav = useNavigate();
  const queryClient = useQueryClient();

  //채팅 목록 API
  const getChattingQuery = useQuery('chattingLists', chattingApi.chattingListApi, {
    //여기서 리코일에 저장

    onSuccess: (data) => {
      // console.log(data);
      setChattingList(data.data);
      console.log(data);
    },
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
          alert(error.response?.data.msg);
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
      onError: (error: AxiosError<{ msg: string }>) => {
        if (error.message === 'Request failed with status code 401') {
          setTimeout(() => chattingRoomDelete({ roomId: deleteChattingroom }), 200);
        } else {
          alert(error.response?.data.msg);
        }
      },
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
            sender: userNickname,
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

  useEffect(() => {
    if (chattingList) {
      getChattingQuery;
    }
  }, [chattingList]);

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
              <KoreanFont size={0.875} color="#5F5F5F">
                채팅목록
              </KoreanFont>
            </BtnBox>
            <BtnBox
              onClick={() => {
                setChattingListbtn(false);
                setFriendListbtn(true);
              }}
              isSelect={friendListbtn}
            >
              <KoreanFont size={0.875} color="#5F5F5F">
                친구목록
              </KoreanFont>
            </BtnBox>
          </RowBox>
          {chattingListbtn
            ? chattingList.map((chatting) => {
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
                      <KoreanFont size={1}>{chatting.name}</KoreanFont>
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
            : friendList.map((friend) => {
                return (
                  <RowChattingBox
                    key={friend.id}
                    onClick={() => {
                      setMakeChattingRoomName(`${friend.nick}님과 ${userNickname}님의 대화`);
                      setMakeChattingRoomNickname(friend.nick);
                      makePrivateChattingRoom({
                        name: `${friend.nick}님과 ${userNickname}님의 대화`,
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
              })}
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
