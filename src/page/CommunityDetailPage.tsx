import { Button, Img, PopConfirm, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { PostDetail } from '../Types/community';
import { AiFillFire } from 'react-icons/ai';
import { usePopConfirm } from '../hooks/usePopConfirm';

const postDetail: PostDetail = {
  id: 1,
  userId: 1,
  userImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
  userName: '강남스타일1234',
  imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
  title: '즐거운 토요일 일 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ',
  content: `어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!
    어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!`,
  type: 'challange',
  gather: 0,
  postNumber: 11,
  date: '2022.6.28 18:20:47',
  isOpenChallange: true,
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
            userImg={postDetail.userImg}
            userName={postDetail.userName}
            date={postDetail.date}
            postNumber={postDetail.postNumber}
          />
          {postDetail.imgUrl && (
            <Wrapper>
              <Img url={postDetail.imgUrl} type="square" />
            </Wrapper>
          )}
          <PostCard.PostTitle type={postDetail.type}>{postDetail.title}</PostCard.PostTitle>
          <PostCard.Content>{postDetail.content}</PostCard.Content>
          <PostCard.Gather>{postDetail.gather}</PostCard.Gather>
          <Wrapper>
            <Button
              margin="1rem"
              buttonType={postDetail.isOpenChallange ? 'primary' : 'disable'}
              onClick={openChallange}
            >
              {postDetail.isOpenChallange ? '챌린져스 참여하기' : '마감된 챌린져스입니다'}
            </Button>
          </Wrapper>
        </Wrapper>
      </PageLayout>
    </NavLayout>
  );
};
