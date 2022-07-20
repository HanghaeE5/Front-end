import { Button, Img, PopConfirmNew, PopConfirmProps, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { Board } from '../Types/community';
import { usePopConfirm } from '../hooks/usePopConfirm';
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
import { ReactComponent as WithTodo } from '../asset/icons/icon_withtodo.svg';
import { ReactComponent as Chat } from '../asset/icons/icon_chat.svg';
import { chattingApi } from '../api/callApi';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const CommunityDetailPage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const userInfo = useRecoilValue(userInfoState);
  const [publicChattingRoomId, SetpublicChattingRoomId] = useState<string>('');

  // TODO : 얘도 훅으로 빼기
  const queryClient = useQueryClient();

  const refectchBoardList = () => {
    queryClient.invalidateQueries(communityQueryKey.fetchBoard);
    nav(PATH.COMMUNITY);
  };

  const { visible: visibleChallange, openConfirm: openChallange, closeConfirm: closeChallange } = usePopConfirm();
  const { visible: visibleChat, openConfirm: openChatConfirm, closeConfirm: closeChatConfirm } = usePopConfirm();
  const { visible: visibleError, openConfirm: openErrorConfirm, closeConfirm: closeErrorConfirm } = usePopConfirm();
  const { visible: visibleCancel, openConfirm: openCancelConfirm, closeConfirm: closeCacnelConfirm } = usePopConfirm();
  const {
    visible: copiedConfirmVisible,
    openConfirm: openCopiedConfirm,
    closeConfirm: closeCopiedConfirm,
  } = usePopConfirm();

  const {
    data: postDetail,
    isLoading,
    refetch: refetchBoardDetail,
  } = useQuery<Board>([communityQueryKey.fetchBoardDetail], () => fetchBoardDetailFn(Number(id)));
  const isMine = userInfo?.email === postDetail?.authorEmail;

  const { mutate: joinChallenge } = useMutation(joinChallengeFn);
  const { mutate: cancelChallenge } = useMutation(cancelChallengeFn);
  const { mutate: deleteBoard } = useMutation(deleteBoardFn);

  const onConfirmChallenge = () => {
    if (!postDetail) return;

    joinChallenge(postDetail?.boardId, {
      onSuccess: () => {
        closeChallange();
        openChatConfirm();
      },
      onError: () => {
        alert('처리에 실패했습니다');
        closeChallange();
      },
    });
  };

  const onEditBoard = () => {
    if (!postDetail) return;

    if (postDetail.category === 'CHALLENGE') {
      openErrorConfirm();
      return;
    }
    nav(`${PATH.COMMUNITY_POST}/${postDetail.boardId}`);
  };

  const onDeleteBoard = () => {
    if (!postDetail) return;

    if (postDetail.category === 'CHALLENGE') {
      openErrorConfirm();
      return;
    }
    deleteBoard(postDetail.boardId, {
      onSuccess: () => refectchBoardList(),
    });
  };

  const onShare = () => {
    const url = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname;
    navigator.clipboard.writeText(url);

    openCopiedConfirm();
  };

  const onClickButton = () => {
    if (postDetail?.withTodoDeadline) return;

    if (postDetail?.participating) {
      // 참여취소
      openCancelConfirm();
    } else {
      openChallange();
    }
  };

  //단체채팅방 입장 API
  const enterPublicChattingRoomData = useMutation(
    (roomId: { roomId: string }) => chattingApi.enterPublicChattingRoomApi(roomId),
    {
      onSuccess: (token) => {
        queryClient.invalidateQueries('chattingLists');
        console.log(token);
      },
      onError: (error: AxiosError<{ msg: string }>) => {
        if (error.message === 'Request failed with status code 401') {
          setTimeout(() => enterPublicChattingRoom({ roomId: publicChattingRoomId }), 200);
        } else {
          alert(error.response?.data.msg);
        }
      },
    },
  );

  const enterPublicChattingRoom = (roomId: { roomId: string }) => {
    enterPublicChattingRoomData.mutate(roomId);
  };

  if (isLoading || !postDetail) return <>로딩중</>;
  return (
    <NavLayout>
      {visibleError && (
        <PopConfirmNew
          iconType="warning"
          title={`위드 투 두 게시물은 작성 이후  \n 수정, 삭제가 불가합니다`}
          button={{ text: '확인', onClick: closeErrorConfirm }}
        />
      )}

      {visibleChallange && (
        <PopConfirmNew
          iconType="withTodo"
          title="위드 투 두에 참여하시겠어요?"
          content="모집 마감일 이후 취소가 불가합니다"
          button={{ text: '네', onClick: onConfirmChallenge }}
          optionalButton={{
            text: ' 아니오',
            onClick: () => {
              closeChallange();
            },
          }}
        />
      )}
      {visibleChat && (
        <PopConfirmNew
          iconType="chat"
          title="채팅방에도 참여하시겠어요?"
          button={{
            text: '네',
            onClick: () => {
              // TODO: 채팅방 참여하기 로직
              refetchBoardDetail();
              closeChatConfirm();
              SetpublicChattingRoomId(postDetail.chatRoomId);
              enterPublicChattingRoom({ roomId: postDetail.chatRoomId });
            },
          }}
          optionalButton={{
            text: ' 아니오',
            onClick: () => {
              refetchBoardDetail();
              closeChatConfirm();
            },
          }}
        />
      )}
      {visibleCancel && (
        <PopConfirmNew
          iconType="warning"
          title={'위드 투 두 참여를 \n 취소하시겠어요?'}
          button={{
            text: '네',
            onClick: () => {
              cancelChallenge(postDetail.boardId, {
                onSuccess: () => {
                  refetchBoardDetail();
                  closeCacnelConfirm();
                },
              });
            },
          }}
          optionalButton={{
            text: ' 아니오',
            onClick: () => closeCacnelConfirm(),
          }}
        />
      )}
      {copiedConfirmVisible && (
        <PopConfirmNew
          iconType="success"
          title={'게시글 주소를 복사했습니다'}
          button={{
            text: '확인',
            onClick: () => closeCopiedConfirm(),
          }}
        />
      )}

      <PageLayout title="커뮤니티">
        <Wrapper isColumn alignItems="start" height="100%" justifyContent="space-between">
          <Wrapper isColumn alignItems="start" height="80%">
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
            {postDetail.imageUrl && (
              <Wrapper height="40%">
                <Img url={postDetail.imageUrl} type="square" height="100%" />
              </Wrapper>
            )}
            <PostCard.PostTitle category={postDetail.category}>{postDetail.title}</PostCard.PostTitle>
            <PostCard.Content>{postDetail.boardContent}</PostCard.Content>
            {postDetail.category === 'CHALLENGE' && <PostCard.Gather>{postDetail.participatingCount}</PostCard.Gather>}
          </Wrapper>
          {postDetail.category === 'CHALLENGE' && !isMine && (
            <Wrapper>
              <Button
                margin="1rem"
                buttonType={postDetail.withTodoDeadline ? 'disable' : 'primary'}
                onClick={onClickButton}
              >
                {postDetail.withTodoDeadline
                  ? '마감되었습니다'
                  : postDetail.participating
                  ? '참여 취소하기'
                  : '위드 투 두 참여하기'}
              </Button>
            </Wrapper>
          )}
        </Wrapper>
      </PageLayout>
    </NavLayout>
  );
};
