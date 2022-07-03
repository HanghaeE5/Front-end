import { Img } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { PostDetail } from '../Types/community';

const postDetail: PostDetail = {
  id: 1,
  userId: 1,
  userImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
  userName: '강남스타일1234',
  imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
  title: '즐거운 토요일 일 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ',
  content:
    '어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다! 어떤 운동이든 상관없이 딱 한시간 운동하기입니다!',
  type: 'challange',
  gather: 0,
  postNumber: 11,
  date: '2022.6.28 18:20:47',
};

export const CommunityDetailPage = () => {
  return (
    <NavLayout>
      <PageLayout title="커뮤니티">
        <PageLayout.Body>
          <div>
            <PostCard.PostHeader
              userImg={postDetail.userImg}
              userName={postDetail.userName}
              date={postDetail.date}
              postNumber={postDetail.postNumber}
            />
            {postDetail.imgUrl && <Img url={postDetail.imgUrl} type="square" />}
            <PostCard.PostTitle type={postDetail.type}>{postDetail.title}</PostCard.PostTitle>
            <PostCard.Content>{postDetail.content}</PostCard.Content>
            <PostCard.Gather>{postDetail.gather}</PostCard.Gather>
          </div>
        </PageLayout.Body>
      </PageLayout>
    </NavLayout>
  );
};
