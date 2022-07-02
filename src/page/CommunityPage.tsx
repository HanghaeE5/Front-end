import { useState } from 'react';
import styled from 'styled-components';
import { Select, SelectOption, TextInput, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { CommunitySearchControl } from '../Types/community';

const ContentWrapper = styled.div`
  padding: 1rem;
  height: 100%;
  section:nth-of-type(1) {
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 8px solid ${({ theme }) => theme.color.grayLight};
  }

  section:nth-of-type(2) {
    overflow-y: scroll;
    height: 100%;
  }
`;

const categoryOptions: SelectOption[] = [
  { value: 'title', label: '가' },
  { value: '11', label: '나' },
  { value: '22', label: '다' },
  { value: '232', label: '라' },
];

export const CommunityPage = () => {
  const [control, setControl] = useState<CommunitySearchControl>({
    category: 'title',
    keyword: '',
    type: 'all',
  });

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
          <section>게시글들!!</section>
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
