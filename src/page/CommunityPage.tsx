import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { communityQueryKey, fetchBoardFn } from '../api/communityApi';
import { ButtonFloating, Img, Select, SelectOption, TextInput, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { ContentWrapper } from '../component/styledComponent/CommunityElements';
import { PATH } from '../route/routeList';
import { CommunitySearchControl, FilterType, KeywordFilter, Board } from '../Types/community';
import { useInView } from 'react-intersection-observer';

// sub
const serachOptions: SelectOption[] = [
  { value: 'all', label: '전체' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
];

// filter
const postFilterOptions: SelectOption[] = [
  { value: 'all', label: '전체' },
  { value: 'challenge', label: '챌린저스' },
  { value: 'daily', label: '일상' },
  { value: 'my', label: '내 글만' },
];

export const CommunityPage = () => {
  const nav = useNavigate();
  const [bottomRef, isBottom] = useInView();
  const [control, setControl] = useState<CommunitySearchControl>({
    filter: undefined,
    keyword: undefined,
    page: 0,
    size: 2,
    sub: undefined,
  });
  const [list, setList] = useState<Board[]>([]);

  const { data: fetchBoardData, isLoading } = useQuery(
    [communityQueryKey.fetchBoard, control],
    () => fetchBoardFn(control),
    {
      onSuccess: (data) => {
        if (control.page === 0) {
          setList([...data.content]);
          return;
        }

        setList((prev) => [...prev, ...data.content]);
      },
    },
  );

  const onClickWriteButton = () => {
    nav(PATH.COMMUNITY_POST);
  };

  useEffect(() => {
    if (!isBottom) return;

    if (fetchBoardData?.last) {
      return;
    }

    setControl((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isBottom]);
  return (
    <NavLayout>
      <PageLayout title="커뮤니티">
        <ContentWrapper>
          <section>
            <Wrapper margin="0 0 0.75rem 0">
              <Wrapper width="40%" margin="0 8px 0 0">
                <Select
                  optionList={serachOptions}
                  value={control.sub || 'all'}
                  onChange={(value) =>
                    setControl({ ...control, page: 0, sub: value === 'all' ? undefined : (value as KeywordFilter) })
                  }
                />
              </Wrapper>
              <TextInput
                placeholder="검색어를 입력해주세요"
                value={control.keyword || ''}
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
              value={control.filter || 'all'}
              optionList={postFilterOptions}
              onChange={(value) =>
                setControl({ ...control, page: 0, filter: value === 'all' ? undefined : (value as FilterType) })
              }
            />
          </section>
          <section>
            {list.map((post: Board) => (
              <PostCard key={post.boardId} onClick={() => nav(`${PATH.COMMUNITY_POST}/${post.boardId}`)}>
                <PostCard.PostHeader userImg="" userName={post.authorEmail} />
                {post.imageUrl && (
                  <Wrapper padding="0 1rem">
                    <Img url={post.imageUrl} type="round" />
                  </Wrapper>
                )}
                <PostCard.PostTitle category={post.category}>{post.title}</PostCard.PostTitle>
                <PostCard.Content isSummary>{post.boardContent}</PostCard.Content>
                <PostCard.Gather>{post.participatingCount}</PostCard.Gather>
              </PostCard>
            ))}
            {list.length && <div ref={bottomRef}>spinner</div>}
          </section>
        </ContentWrapper>
        <ButtonFloating onClick={onClickWriteButton} />
      </PageLayout>
    </NavLayout>
  );
};
