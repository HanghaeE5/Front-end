import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
// import {Client} from "@stomp/stompjs"
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/store';
import { userApi } from '../api/callApi';
import axios, { AxiosError } from 'axios';
import setupInterceptorsTo from '../api/Interceptiors';
import {
  EvBox,
  EvCheckHelfBox,
  EvHelfInputInfo,
  EvImgBox,
  EvKoreanFont,
  EvRowBox,
} from '../component/element/BoxStyle';
import { chatList } from '../Types/chat';
import { useCommonConfirm } from '../hooks/useCommonConfirm';

const ContentWrapper = styled.div`
  background: #feed91; /* fallback for old browsers */
  background: -webkit-linear-gradient(180deg, #fff7d1 0%, #feed91 100%); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(180deg, #fff7d1 0%, #feed91 100%);
  height: calc(100%);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 10px;
  //스크롤바 없애기
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const MessageTextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-radius: 6px;
  padding: 0 0 0 10px;
  border: none;

  :focus {
    background-color: #fffbe9;
  }
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
`;

const RowChattingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 89%;
  height: 2rem;
  margin: 0 auto 0 0;
  /* background-color: #e3f8c3; */
  cursor: pointer;
`;

const ChattingRoomPhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin: ${(props: box) => props.margin};
  /* background-color: yellowgreen; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const ChattingRoomTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 80%;
  height: 2rem;
  margin: auto auto auto 0.625rem;
  /* background-color: #8f68bc; */
`;

const YourChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 70%;
  margin: 1rem auto 0 1.25rem;
  /* background: #bdefcd; */
`;

const MyChatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 70%;
  margin: 1rem 1.25rem 0 auto;
  /* background: #bdefcd; */
`;

const InformChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  margin: 1rem 1.25rem;
  /* background: #bdefcd; */
`;

const YourTextBox = styled.div`
  max-width: calc(100% - 6.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto auto 2.625rem;
  background: #ffff7f;
  border-radius: 0px 12px 12px 12px;
  padding: 10px 14px;
`;

const MyTextBox = styled.div`
  max-width: calc(100% - 3.8rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 auto;
  background: #9addff;
  border-radius: 12px 12px 0px 12px;
  padding: 10px 14px;
  /* word-break: break-all; */
`;

const InformTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 2.625rem;
  background: #ccccc6cc;
  border-radius: 12px;
  padding: 10px 14px;
`;

type font = {
  size?: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const InputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

const MessageSendBox = styled.div`
  position: fixed;
  bottom: 3.5rem;

  height: 3.5rem;
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: row;
  align-items: center;

  z-index: 3;
`;

export const ChattingRoom = () => {
  const nav = useNavigate();
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [myText, setmyText] = useState<string>('');
  const [chatData, setchatData] = useState<chatList>([]);

  const onChangeMyText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmyText(e.target.value);
  };
  const localToken = localStorage.getItem('recoil-persist');

  const sock = new SockJS('https://todowith.shop/ws');
  const ws = Stomp.over(sock);
  const roomIdName = useParams().roomId;
  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();
  const keyUpEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
      setmyText('');
    }
  };

  //채팅 get 실행
  const queryClient = useQueryClient();
  // 이전, 현재 채팅 받는 API
  const baseApi = axios.create({
    baseURL: 'https://todowith.shop',
    timeout: 2000,
  });

  const callApi = setupInterceptorsTo(baseApi);

  const chattingMessageApi = async () => {
    const cma = await callApi.get(`/chat/message/before?roomId=${roomIdName}`);
    return cma;
  };

  const chattingMessageData = useQuery('chattingData', chattingMessageApi, {
    onSuccess: (data) => {
      setchatData(data.data.content);
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

  //유저정보 가져오기 API >> 상단 nav 있으니까 문제없으면 삭제하기
  // const userInformData = useQuery('userData', userApi.userInformApi, {
  //   onSuccess: (data) => {
  //     setUserInfoData(data.data);
  //   },
  //   onError: (error: AxiosError) => {
  //     if (error.message === 'Request failed with status code 404') {
  //       // nav(-1);
  //     }
  //   },
  // });

  //시간 변환
  function messageTime(msgtime: string) {
    const divide = msgtime.split('T')[1];
    const divideHour = Number(divide.split(':')[0]);
    const divideMin = divide.split(':')[1];

    if (divideHour > 12) {
      return `오후 ${divideHour - 12} : ${divideMin}`;
    } else if (divideHour === 12) {
      return `오후 ${divideHour} : ${divideMin}`;
    } else if (divideHour === 0) {
      return `오전 ${divideHour + 12} : ${divideMin}`;
    } else {
      return `오전 ${divideHour} : ${divideMin}`;
    }
  }

  //웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      if (localToken) {
        const toto = JSON.parse(localToken);

        if (toto) {
          ws.connect(
            {
              Authorization: toto.accessTokenState,
            },

            () => {
              ws.subscribe(
                `/sub/chat/room/${roomIdName}`,
                () => {
                  queryClient.invalidateQueries('chattingData'); //chattingData 키값 query 실행

                  // console.log(data);
                },
                { Authorization: toto.accessTokenState, id: roomIdName },
              );
            },
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 연결해제, 구독해제
  function wsDisConnectUnsubscribe() {
    try {
      if (localToken) {
        const toto = JSON.parse(localToken);

        if (toto) {
          const data = {
            type: 'QUIT',
            roomId: roomIdName,
            sender: userInfoData.nick,
            message: myText,
          };
          ws.disconnect(
            () => {
              ws.send('/pub/chat/message', { Authorization: toto.accessTokenState }, JSON.stringify(data));
              ws.unsubscribe(`${roomIdName}`);
            },
            { Authorization: toto.accessTokenState },
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!localToken) {
        openErrorConfirm({
          title: '🙅🏻‍♀️로그인 정보가 없습니다.🙅🏻‍♀️',
          content: '다시 로그인 해주세요.',
          button: {
            text: '확인',
            onClick: () => {
              localStorage.clear();
              nav('/login');
            },
          },
        });
      }
      // send할 데이터
      const data = {
        type: 'TALK',
        roomId: roomIdName,
        sender: userInfoData.nick,
        message: myText,
      };
      // 빈문자열이면 리턴
      // if (messageText === '') {
      //   return;
      // }
      // 로딩 중
      if (localToken) {
        const toto = JSON.parse(localToken);

        if (toto) {
          waitForConnection(ws, function () {
            ws.send('/pub/chat/message', { Authorization: toto.accessTokenState }, JSON.stringify(data));
            // console.log(ws.ws.readyState);
          });
        }
      }
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  useEffect(() => {
    wsConnectSubscribe();
  }, []);

  return (
    <NavLayout>
      <PageLayout title="채팅">
        <ContentWrapper>
          {chatData.map((chat, chatindex) => {
            if (chat.type === 'QUIT') {
              return (
                <InformChatBox key={chatindex}>
                  <InformTextBox>
                    <KoreanFont size={1}>{chat.message}</KoreanFont>
                  </InformTextBox>
                </InformChatBox>
              );
            } else if (chat.sender !== userInfoData.nick) {
              return (
                <YourChatBox key={chatindex}>
                  <RowChattingBox
                    onClick={() => {
                      nav(`/friend/page/${chat.sender}`);
                    }}
                  >
                    <ChattingRoomPhotoBox
                      style={{
                        backgroundImage: `url(${chat.profileImageUrl})`,
                      }}
                    ></ChattingRoomPhotoBox>
                    <ChattingRoomTextBox>
                      <KoreanFont size={0.75}>{chat.sender}</KoreanFont>
                    </ChattingRoomTextBox>
                  </RowChattingBox>
                  <EvBox style={{ alignItems: 'flex-end' }} direction="row">
                    <YourTextBox>
                      <KoreanFont size={1}>{chat.message}</KoreanFont>
                    </YourTextBox>
                    <EvBox width={'3.5rem'} isAlignSide={true}>
                      <KoreanFont size={0.625}>{messageTime(chat.createdDate)}</KoreanFont>
                    </EvBox>
                  </EvBox>
                </YourChatBox>
              );
            } else {
              return (
                <MyChatBox key={chatindex} style={{ alignItems: 'flex-end' }}>
                  <EvBox width={'3.5rem'} style={{ alignItems: 'flex-end' }}>
                    <EvKoreanFont size={0.625}>{messageTime(chat.createdDate)}</EvKoreanFont>
                  </EvBox>
                  <MyTextBox>
                    <KoreanFont size={1}>{chat.message}</KoreanFont>
                  </MyTextBox>
                </MyChatBox>
              );
            }
          })}
          <MessageSendBox>
            <EvRowBox
              style={{ boxShadow: '0px 2px 8px rgba(235, 197, 0, 0.25)' }}
              borderRadius="6px"
              backgroundColor="#ffffff"
              width={'89.3%'}
              height={2.75}
              margin={'auto'}
            >
              <EvHelfInputInfo
                width={'90%'}
                height={2.75}
                margin={'0'}
                type="text"
                placeholder="메시지를 입력해주세요"
                name="myText"
                value={myText}
                onChange={onChangeMyText}
                onKeyUp={keyUpEvent}
              />
              <EvCheckHelfBox
                width={'10%'}
                height={2.75}
                margin={'0'}
                url={'url(/assets/send.svg)'}
                isCursor={true}
                backgroundColor="#FFFFFF"
                backgroundsize="27px"
                onClick={() => {
                  sendMessage();
                  setmyText('');
                }}
              />
            </EvRowBox>
          </MessageSendBox>
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
