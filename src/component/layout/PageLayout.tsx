import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

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
  font-weight: 700;
  line-height: 32.56px;
  font-size: 1.375rem;

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

export const PageHeader = ({ title }: { title: string }) => {
  const nav = useNavigate();
  return (
    <HeaderWrapper>
      <FiChevronLeft
        onClick={() => {
          nav(-1);
        }}
      />
      <span>{title}</span>
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
