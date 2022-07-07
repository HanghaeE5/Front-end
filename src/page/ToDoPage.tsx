import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';

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
export const ToDoPage = () => {
  return (
    <NavLayout>
      <PageLayout title="투 두 리스트">
        <ContentWrapper>
          <section></section>
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
