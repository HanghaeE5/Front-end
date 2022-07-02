import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

const HeaderWrapper = styled.div`
  height: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #f8e8e8; */
  border-bottom: 1px solid #dddddd;

  span {
    font-size: 1.25rem;
    font-family: 'OpensansBold';
  }

  svg {
    position: absolute;
    left: 20px;
    font-size: 1.25rem;
    cursor: pointer;
  }
`;

const Header = ({ children }: PropsWithChildren) => {
  const nav = useNavigate();

  return (
    <HeaderWrapper>
      <FiChevronLeft
        onClick={() => {
          nav(-1);
        }}
      />
      <span>{children}</span>
    </HeaderWrapper>
  );
};

const BodyWrapper = styled.div`
  height: 100%;
  /* background-color: yellow; */
`;

const Body = ({ children }: PropsWithChildren) => {
  return <BodyWrapper>{children}</BodyWrapper>;
};

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 100%;
`;

export const PageLayout = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <LayoutContainer>
      <Header>{title}</Header>
      <PageLayout.Body>{children}</PageLayout.Body>
    </LayoutContainer>
  );
};

PageLayout.Body = Body;
