import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';

const HeaderWrapper = styled.div`
  height: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dddddd;

  span {
    font-size: 1.25rem;
    font-weight: 700;
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

type font = {
  size: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

export const PageLayout = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <LayoutContainer>
      <Header>
        <KoreanFont size={1.125}>{title}</KoreanFont>
      </Header>
      <PageLayout.Body>{children}</PageLayout.Body>
    </LayoutContainer>
  );
};

PageLayout.Body = Body;
