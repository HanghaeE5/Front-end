import { Button, PopConfirmNew, PopConfirmProps, Wrapper } from '../component/element';
import { PostCard } from '../component/PostCard';
import { Board } from '../Types/community';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  cancelChallengeFn,
  communityQueryKey,
  deleteBoardFn,
  fetchBoardDetailFn,
  joinChallengeFn,
} from '../api/communityApi';
import { PATH } from '../route/routeList';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/store';
import { chattingApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { PostImgage, PostWrapper } from '../component/styledComponent/CommunityElements';

export const CommunityDetail = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const userInfo = useRecoilValue(userInfoState);
  const [publicChattingRoomId, SetpublicChattingRoomId] = useState<string>('');

  const queryClient = useQueryClient();

  const refectchBoardList = () => {
    queryClient.invalidateQueries(communityQueryKey.fetchBoard);
    nav(PATH.COMMUNITY);
  };

  // TODO : 컨펌 하나로 관리
  const [confirmState, setConfirmState] = useState<PopConfirmProps & { visible: boolean }>({
    visible: false,
    iconType: 'warning',
    title: '',
    button: {
      text: '확인',
      onClick: () => console.log('gg'),
    },
  });

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  const {
    data: postDetail,
    isLoading,
    refetch: refetchBoardDetail,
  } = useQuery<Board>([communityQueryKey.fetchBoardDetail], () => fetchBoardDetailFn(Number(id)));
  const isMine = userInfo?.email === postDetail?.authorEmail;

  const { mutate: exitChattingRoom } = useMutation((roomId: { roomId: string }) =>
    chattingApi.chattingRoomDeleteAPi(roomId),
  );
  const { mutate: joinChallenge } = useMutation(joinChallengeFn);
  const { mutate: cancelChallenge } = useMutation(cancelChallengeFn);
  const { mutate: deleteBoard } = useMutation(deleteBoardFn, {
    onSuccess: () =>
      openSuccessConfirm({ title: '게시글을 삭제했습니다.', button: { text: '확인', onClick: refectchBoardList } }),
    onError: () => openErrorConfirm({}),
  });

  const onConfirmChallenge = () => {
    if (!postDetail) return;

    joinChallenge(postDetail?.boardId, {
      onSuccess: () => {
        setConfirmState({
          visible: true,
          iconType: 'chat',
          title: '채팅방에도 참여하시겠어요?',
          button: {
            text: '네',
            onClick: () => {
              refetchBoardDetail();
              SetpublicChattingRoomId(postDetail.chatRoomId);
              enterPublicChattingRoom({ roomId: postDetail.chatRoomId });
              setConfirmState((prev) => ({ ...prev, visible: false }));
            },
          },
          optionalButton: {
            text: ' 아니오',
            onClick: () => {
              refetchBoardDetail();
              setConfirmState((prev) => ({ ...prev, visible: false }));
            },
          },
        });
      },

      onError: () => {
        setConfirmState((prev) => ({ ...prev, visible: false }));
        openErrorConfirm({});
      },
    });
  };

  const onEditBoard = () => {
    if (!postDetail) return;

    if (postDetail.category === 'CHALLENGE') {
      openErrorConfirm({ title: `위드 투두 게시물은 작성 이후  \n 수정, 삭제가 불가합니다` });
      return;
    }
    nav(`${PATH.COMMUNITY_POST}/${postDetail.boardId}`);
  };

  const onDeleteBoard = () => {
    if (!postDetail) return;

    if (postDetail.category === 'CHALLENGE') {
      openErrorConfirm({ title: `위드 투두 게시물은 작성 이후  \n 수정, 삭제가 불가합니다` });
      return;
    }
    deleteBoard(postDetail.boardId);
  };

  const onShare = () => {
    const url = window.location.protocol + '//' + window.location.host + window.location.pathname;
    console.log(url);
    navigator.clipboard.writeText(url);

    openSuccessConfirm({ title: '게시글 주소를 복사했습니다.' });
  };

  const onClickParticipateButton = () => {
    if (postDetail?.withTodoDeadline) return;

    if (postDetail?.participating) {
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: `위드 투두 참여를 \n 취소하시겠어요?`,
        content: '모집 마감일 이후 취소가 불가합니다',
        button: {
          text: '네',
          onClick: () => {
            cancelChallenge(postDetail.boardId, {
              onSuccess: () => {
                refetchBoardDetail();
                setConfirmState((prev) => ({ ...prev, visible: false }));
              },
            });

            exitChattingRoom({ roomId: postDetail.chatRoomId });
          },
        },
        optionalButton: {
          text: ' 아니오',
          onClick: () => setConfirmState((prev) => ({ ...prev, visible: false })),
        },
      });
    } else {
      setConfirmState({
        visible: true,
        iconType: 'withTodo',
        title: '위드 투두에 참여하시겠어요?',
        content: '모집 마감일 이후 취소가 불가합니다',
        button: { text: '네', onClick: onConfirmChallenge },
        optionalButton: {
          text: ' 아니오',
          onClick: () => setConfirmState((prev) => ({ ...prev, visible: false })),
        },
      });
    }
  };

  // console.log(userInfo?.nick);
  const localToken = localStorage.getItem('recoil-persist');

  const sock = new SockJS('https://todowith.shop/ws');
  const ws = Stomp.over(sock);

  //단체채팅방 입장 API
  const enterPublicChattingRoomData = useMutation(
    (roomId: { roomId: string }) => chattingApi.enterPublicChattingRoomApi(roomId),
    {
      onSuccess: (token) => {
        queryClient.invalidateQueries('chattingLists');
        // console.log(token);
      },
      onError: (error: AxiosError<{ msg: string }>) => {
        if (error.message === 'Request failed with status code 401') {
          setTimeout(() => enterPublicChattingRoom({ roomId: publicChattingRoomId }), 200);
        } else {
          openErrorConfirm({
            title: error.response?.data.msg,
          });
        }
      },
    },
  );

  const enterPublicChattingRoom = (roomId: { roomId: string }) => {
    enterPublicChattingRoomData.mutate(roomId);
  };

  // 단체방 퇴장 시 알림메시지 발송 API
  function wsDisConnectUnsubscribe(roomIdName: string) {
    try {
      if (localToken) {
        const toto = JSON.parse(localToken);

        if (toto) {
          const data = {
            type: 'QUIT',
            roomId: roomIdName,
            sender: userInfo.nick,
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
      // console.log(error);
    }
  }

  if (isLoading || !postDetail) return <>로딩중</>;
  return (
    <>
      {confirmState.visible && <PopConfirmNew {...confirmState} />}

      <PostWrapper isColumn alignItems="start" height="100%" justifyContent="space-between" backgroundColor="#ffffff">
        <Wrapper isColumn alignItems="start" padding="0 0 2rem 0">
          <PostCard.PostHeader
            userImg={postDetail.authorProfileImageUrl}
            userName={postDetail.authorNick}
            date={postDetail.boardCreatedDate.replaceAll('T', ' ')}
            boardId={postDetail.boardId}
            isMine={isMine}
            dropDownProps={{
              onShare,
              onEdit: onEditBoard,
              onDelete: onDeleteBoard,
            }}
          />
          {postDetail.imageUrl && <PostImgage src={postDetail.imageUrl} />}

          <PostCard.PostTitle isSummary={false} category={postDetail.category}>
            {postDetail.title}
          </PostCard.PostTitle>
          <PostCard.Content>{postDetail.boardContent}</PostCard.Content>
          {postDetail.category === 'CHALLENGE' && <PostCard.Gather>{postDetail.participatingCount}</PostCard.Gather>}
        </Wrapper>
        {postDetail.category === 'CHALLENGE' && !isMine && (
          <Wrapper>
            <Button
              margin="1rem"
              buttonType={postDetail.withTodoDeadline ? 'disable' : 'primary'}
              onClick={onClickParticipateButton}
            >
              {postDetail.withTodoDeadline
                ? '마감되었습니다'
                : postDetail.participating
                ? '참여 취소하기'
                : '위드 투두 참여하기'}
            </Button>
          </Wrapper>
        )}
      </PostWrapper>
    </>
  );
};
