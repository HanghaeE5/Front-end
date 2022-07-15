import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { communityQueryKey, fetchBoardFn } from '../api/communityApi';
import { ButtonFloating, Img, Select, SelectOption, TextInput, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { ContentWrapper } from '../component/styledComponent/CommunityElements';
import { PATH } from '../route/routeList';
import { Board, CommunitySearchControl, FilterType, KeywordFilter } from '../Types/community';
import { removeListDuplicate } from '../utils/removeListDuplicate';

// sub
const serachOptions: SelectOption[] = [
  { value: 'all', label: '전체' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
];

// filter
const postFilterOptions: SelectOption[] = [
  { value: 'all', label: '전체' },
  { value: 'challenge', label: '위드 투 두' },
  { value: 'daily', label: '일상' },
  { value: 'my', label: '내 글만' },
];

export const CommunityPage = () => {
  const nav = useNavigate();
  const [bottomRef, isBottom] = useInView();

  const [keywordValue, setKeywordValue] = useState<{ sub: KeywordFilter | 'all'; keyword: string }>({
    sub: 'all',
    keyword: '',
  });
  const [control, setControl] = useState<CommunitySearchControl>({
    filter: undefined,
    keyword: undefined,
    page: 0,
    size: 10,
    sub: undefined,
  });

  const [list, setList] = useState<Board[]>([]);

  const { data: fetchBoardData, isLoading } = useQuery(
    [communityQueryKey.fetchBoard, control],
    () => fetchBoardFn(control),
    {
      onSuccess: (data) => {
        if (control.page === 0) {
          setList([...removeListDuplicate<Board>(data.content, 'boardId')]);
          return;
        }
        setList((prev) => removeListDuplicate<Board>([...prev, ...data.content], 'boardId'));
      },
    },
  );

  const onClickWriteButton = () => {
    nav(PATH.COMMUNITY_POST);
  };

  useEffect(() => {
    console.log(isBottom);
    if (isLoading || !isBottom || fetchBoardData?.last) return;

    setControl((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isBottom, isLoading, fetchBoardData]);

  return (
    <NavLayout>
      <PageLayout title="커뮤니티">
        <ContentWrapper>
          <section>
            <Wrapper margin="0 0 0.75rem 0">
              <Wrapper width="40%" margin="0 8px 0 0">
                <Select
                  optionList={serachOptions}
                  value={keywordValue.sub}
                  onChange={(value) => setKeywordValue((prev) => ({ ...prev, sub: value as KeywordFilter }))}
                />
              </Wrapper>
              <TextInput
                inputType="primary"
                inputSize="small"
                placeholder="검색어를 입력해주세요"
                value={keywordValue.keyword || ''}
                onChange={(value) => setKeywordValue((prev) => ({ ...prev, keyword: value }))}
                onSearch={() =>
                  setControl((prev) => ({
                    ...prev,
                    keyword: keywordValue.keyword,
                    sub: keywordValue.sub === 'all' ? undefined : keywordValue.sub,
                    page: 0,
                  }))
                }
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
              <PostCard key={post.boardId} onClick={() => nav(`${PATH.COMMUNITY}/${post.boardId}`)}>
                <PostCard.PostHeader userImg={post.authorProfileImageUrl} userName={post.authorNick} />
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
            {list.length && <div ref={bottomRef} />}
          </section>
        </ContentWrapper>
        <ButtonFloating onClick={onClickWriteButton} />
      </PageLayout>
    </NavLayout>
  );
};
