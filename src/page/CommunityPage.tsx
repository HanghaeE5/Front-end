import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Img, Select, SelectOption, TextInput, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { CommunitySearchControl, Post } from '../Types/community';

const ContentWrapper = styled.div`
  height: 100%;
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

const categoryOptions: SelectOption[] = [
  { value: 'title', label: '가' },
  { value: '11', label: '나' },
  { value: '22', label: '다' },
  { value: '232', label: '라' },
];

const postList: Post[] = [
  {
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
  },
  {
    id: 2,
    userId: 2,
    userImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
    userName: 'gisele',
    title: '즐거운 토요일',
    content:
      '오늘은 토요일 너무 덥다. 너무 더워. 산책언제가지. 이 날씨면 개도 사람도 더위먹지이이 시원해지면 가야겠다. 점심은 뭐먹으면 좋을까. 생각보다 진도가 안나가는군',
    type: 'challange',
    gather: 0,
  },
  {
    id: 3,
    userId: 3,
    userName: 'henrry',
    title: '즐거운 토요',
    content:
      '오늘은 토요일 너무 덥다. 너무 더워. 산책언제가지. 이 날씨면 개도 사람도 더위먹지이이 시원해지면 가야겠다. 점심은 뭐먹으면 좋을까. 생각보다 진도가 안나가는군',
    type: 'daily',
    gather: 2,
  },
  {
    id: 4,
    userId: 4,
    userImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
    userName: 'sean',
    title: '즐거운 토요일',
    content:
      '오늘은 토요일 너무 덥다. 너무 더워. 산책언제가지. 이 날씨면 개도 사람도 더위먹지이이 시원해지면 가야겠다. 점심은 뭐먹으면 좋을까. 생각보다 진도가 안나가는군',
    type: 'challange',
    gather: 0,
  },
  {
    id: 5,
    userId: 5,
    userImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
    userName: 'sean',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
    title: '즐거운 토요일',
    content:
      '오늘은 토요일 너무 덥다. 너무 더워. 산책언제가지. 이 날씨면 개도 사람도 더위먹지이이 시원해지면 가야겠다. 점심은 뭐먹으면 좋을까. 생각보다 진도가 안나가는군',
    type: 'challange',
    gather: 2,
  },
];
export const CommunityPage = () => {
  const nav = useNavigate();
  const [control, setControl] = useState<CommunitySearchControl>({
    category: 'title',
    keyword: '',
    type: 'all',
  });

  const onClickPost = (id: string) => {
    nav(`/community/${id}`);
  };

  return (
    <NavLayout>
      <PageLayout title="커뮤니티">
        <ContentWrapper>
          <section>
            <Wrapper margin="0 0 0.75rem 0">
              <Wrapper width="30%" margin="0 8px 0 0">
                <Select
                  optionList={categoryOptions}
                  value={control.category}
                  onChange={(value) => setControl({ ...control, category: value })}
                />
              </Wrapper>
              <TextInput
                placeholder="검색어를 입력해주세요"
                value={control.keyword}
                onChange={(value) => setControl({ ...control, keyword: value })}
                showSearch={{
                  onSearch: () => {
                    console.log(control.keyword);
                  },
                }}
              />
            </Wrapper>
            <Select
              type="default"
              value={control.category}
              optionList={categoryOptions}
              onChange={(value) => setControl({ ...control, category: value })}
            />
          </section>
          <section>
            {postList.map((post) => (
              <PostCard key={post.id} onClick={onClickPost}>
                <PostCard.PostHeader userImg={post.userImg} userName={post.userName} />
                {post.imgUrl && <Img url={post.imgUrl} type="round" />}
                <PostCard.PostTitle type={post.type}>{post.title}</PostCard.PostTitle>
                <PostCard.Content isSummary>{post.content}</PostCard.Content>
                <PostCard.Gather>{post.gather}</PostCard.Gather>
              </PostCard>
            ))}
          </section>
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
