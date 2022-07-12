import { Button, Img, PopConfirm, Wrapper } from '../component/element';
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

export const CommunityDetailPage = () => {
  const nav = useNavigate();
  const { id } = useParams();

  // TODO : 얘도 훅으로 빼기
  const queryClient = useQueryClient();

  const refectchBoardList = () => {
    queryClient.invalidateQueries(communityQueryKey.fetchBoard);
    nav(PATH.COMMUNITY);
  };

  const { visible: visibleChallange, openConfirm: openChallange, closeConfirm: closeChallange } = usePopConfirm();
  const { visible: visibleChat, openConfirm: openChatConfirm, closeConfirm: closeChatConfirm } = usePopConfirm();

  const { data: postDetail, isLoading } = useQuery<Board>([communityQueryKey.fetchBoardDetail], () =>
    fetchBoardDetailFn(Number(id)),
  );

  const { mutate: joinChallenge } = useMutation(joinChallengeFn);
  const { mutate: deleteBoard } = useMutation(deleteBoardFn);

  const onConfirmChallenge = () => {
    if (!postDetail) return;

    joinChallenge(postDetail?.boardId, {
      onSuccess: () => {
        closeChallange();
        openChatConfirm();
      },
      onError: (error) => {
        alert('처리에 실패했습니다');
        closeChallange();
      },
    });
  };

  const onEditBoard = () => {
    if (!postDetail) return;

    if (postDetail.category === 'CHALLENGE') {
      alert('챌린지는 수정이 불가능합니다');
      return;
    }
    nav(`${PATH.COMMUNITY_POST}/${postDetail.boardId}`);
  };

  const onDeleteBoard = () => {
    if (!postDetail) return;
    deleteBoard(postDetail.boardId, {
      onSuccess: () => refectchBoardList(),
    });
  };

  const onShare = () => {
    console.log('공유하기');
  };

  if (isLoading || !postDetail) return <>로딩중</>;
  return (
    <NavLayout>
      <PopConfirm
        icon={<AiFillFire />}
        visible={visibleChallange}
        onConfirm={onConfirmChallenge}
        onCancel={() => {
          closeChallange();
          openChatConfirm();
        }}
      >
        챌린져스에 참여하시겠어요?
      </PopConfirm>
      <PopConfirm
        icon={<AiFillFire />}
        visible={visibleChat}
        onConfirm={() => {
          console.log('네');
          closeChatConfirm();
        }}
        onCancel={() => {
          console.log('아니오');
          closeChatConfirm();
        }}
      >
        채팅방에도 참여하시겠어요?
      </PopConfirm>
      <PageLayout title="커뮤니티">
        <Wrapper isColumn alignItems="start" height="100%">
          <PostCard.PostHeader
            userImg={''} // TODO : userImage
            userName={postDetail.authorEmail}
            date={postDetail.boardCreatedDate.split('T')[0]}
            boardId={postDetail.boardId}
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
          <PostCard.Gather>{postDetail.participatingCount}</PostCard.Gather>
          <Wrapper>
            <Button
              margin="1rem"
              buttonType={postDetail.participating ? 'primary' : 'disable'}
              onClick={postDetail.participating ? openChallange : undefined}
            >
              {postDetail.participating ? '챌린져스 참여하기' : '마감된 챌린져스입니다'}
            </Button>
          </Wrapper>
        </Wrapper>
      </PageLayout>
    </NavLayout>
  );
};
