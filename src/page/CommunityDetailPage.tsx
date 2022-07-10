import { Button, Img, PopConfirm, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { Board } from '../Types/community';
import { AiFillFire } from 'react-icons/ai';
import { usePopConfirm } from '../hooks/usePopConfirm';

const postDetail: Board = {
  boardId: 1,
  authorEmail: '1',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
  title: '즐거운 토요일 일 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ',
  boardContent: `어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!`,
  category: 'CHALLENGE',
  participatingCount: 0,
  boardCreatedDate: new Date('2022.6.28 18:20:47'),
  participating: true,
};

export const CommunityDetailPage = () => {
  const { visible: visibleChallange, openConfirm: openChallange, closeConfirm: closeChallange } = usePopConfirm();
  const { visible: visibleChat, openConfirm: openChatConfirm, closeConfirm: closeChatConfirm } = usePopConfirm();
  return (
    <NavLayout>
      <PopConfirm
        icon={<AiFillFire />}
        visible={visibleChallange}
        onConfirm={() => {
          console.log('네');
          closeChallange();
          openChatConfirm();
        }}
        onCancel={() => {
          console.log('아니오');
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
            date={postDetail.boardCreatedDate.toISOString().split('T')[0]}
            boardId={postDetail.boardId}
          />
          {postDetail.imageUrl && (
            <Wrapper>
              <Img url={postDetail.imageUrl} type="square" />
            </Wrapper>
          )}
          <PostCard.PostTitle category={postDetail.category}>{postDetail.title}</PostCard.PostTitle>
          <PostCard.Content>{postDetail.boardContent}</PostCard.Content>
          <PostCard.Gather>{postDetail.participating}</PostCard.Gather>
          <Wrapper>
            <Button margin="1rem" buttonType={postDetail.participating ? 'primary' : 'disable'} onClick={openChallange}>
              {postDetail.participating ? '챌린져스 참여하기' : '마감된 챌린져스입니다'}
            </Button>
          </Wrapper>
        </Wrapper>
      </PageLayout>
    </NavLayout>
  );
};
