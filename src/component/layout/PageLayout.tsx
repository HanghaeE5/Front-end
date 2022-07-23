import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { EvKoreanFont } from '../element/BoxStyle';

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 768px;
  height: 3.75rem;
  min-height: 3.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  padding: 1rem;

  span {
    font-size: 1.25rem;
    font-weight: 700;
  }

  & > svg {
    font-size: 1.25rem;
    cursor: pointer;
  }
`;

const BodyWrapper = styled.div`
  height: calc(100% - 3.75rem);
  overflow: hidden;
`;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
  position: relative;
`;

type font = {
  size: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

export const PageHeader = ({ title }: { title: string }) => {
  const nav = useNavigate();
  return (
    <HeaderWrapper>
      <FiChevronLeft
        onClick={() => {
          nav(-1);
        }}
      />
      <EvKoreanFont size={1.375} weight={700}>
        {title}
      </EvKoreanFont>
      <div />
    </HeaderWrapper>
  );
};

export const PageLayout = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <LayoutContainer>
      <PageHeader title={title} />
      <BodyWrapper>{children}</BodyWrapper>
    </LayoutContainer>
  );
};
