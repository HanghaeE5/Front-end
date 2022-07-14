import { Button, Img, PopConfirm, PopConfirmNew, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { Board } from '../Types/community';
import { AiFillFire } from 'react-icons/ai';
import { usePopConfirm } from '../hooks/usePopConfirm';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { communityQueryKey, deleteBoardFn, fetchBoardDetailFn, joinChallengeFn } from '../api/communityApi';
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

  const { data: postDetail, isLoading } = useQuery<Board>([communityQueryKey.fetchBoardDetail], () =>
    fetchBoardDetailFn(Number(id)),
  );
  const isMine = userInfo?.email === postDetail?.authorEmail;
  const { mutate: joinChallenge } = useMutation(joinChallengeFn);
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
    console.log('공유하기');
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

  console.log(postDetail?.chatRoomId);

  if (isLoading || !postDetail) return <>로딩중</>;
  return (
    <NavLayout>
      {visibleError && (
        <PopConfirmNew
          confirmType="warning"
          title={`위드 투 두 게시물은 작성 이후  \n 수정, 삭제가 불가합니다`}
          rightButton={{ text: '확인', onClick: closeErrorConfirm }}
        />
      )}
      {visibleChallange && (
        <PopConfirmNew
          confirmType="withTodo"
          title="위드 투 두에 참여하시겠어요?"
          content="모집 마감일 이후 취소가 불가합니다"
          rightButton={{ text: '네', onClick: onConfirmChallenge }}
          leftButton={{
            text: ' 아니오',
            onClick: () => {
              closeChallange();
              openChatConfirm();
            },
          }}
        />
      )}
      {visibleChat && (
        <PopConfirmNew
          confirmType="chat"
          title="채팅방에도 참여하시겠어요?"
          rightButton={{
            text: '네',
            onClick: () => {
              // TODO: 채팅방 참여하기 로직
              closeChatConfirm();
              SetpublicChattingRoomId(postDetail.chatRoomId);
              enterPublicChattingRoom({ roomId: postDetail.chatRoomId });
            },
          }}
          leftButton={{
            text: ' 아니오',
            onClick: closeChatConfirm,
          }}
        />
      )}

      <PageLayout title="커뮤니티">
        <Wrapper isColumn alignItems="start" height="100%">
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
            <Wrapper>
              <Img url={postDetail.imageUrl} type="square" />
            </Wrapper>
          )}
          <PostCard.PostTitle category={postDetail.category}>{postDetail.title}</PostCard.PostTitle>
          <PostCard.Content>{postDetail.boardContent}</PostCard.Content>

          {postDetail.category === 'CHALLENGE' && (
            <>
              <PostCard.Gather>{postDetail.participatingCount}</PostCard.Gather>
              {!isMine && (
                <Wrapper>
                  <Button
                    margin="1rem"
                    buttonType={postDetail.participating ? 'primary' : 'disable'}
                    onClick={postDetail.participating ? openChallange : undefined}
                  >
                    {postDetail.participating ? '위드 투 두 참여하기' : '마감되었습니다'}
                  </Button>
                </Wrapper>
              )}
            </>
          )}
        </Wrapper>
      </PageLayout>
    </NavLayout>
  );
};
