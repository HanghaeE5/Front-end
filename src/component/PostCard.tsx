import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Board } from '../Types/community';
import { Badge, DropdownMenu, Img, Typography, Wrapper } from './element';
import { BsDot } from 'react-icons/bs';
import { BiShareAlt } from 'react-icons/bi';

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const PostInfo = styled.span`
  font-size: 12px;
  font-family: 'Noto Sans CJK Light KR';
  font-weight: 600;
  color: ${({ theme }) => theme.color.grayText};
  margin-top: 0.25rem;
`;

const Title = styled.div`
  width: 65%;
  margin: 1rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.25rem;
  font-weight: 600;
`;

const StyledDot = styled(BsDot)`
  padding-top: 0.25rem;
`;

interface ContentWrapperProps {
  isSummary?: boolean;
}
const ContentWrapper = styled.div<ContentWrapperProps>`
  color: ${({ theme }) => theme.color.grayText};
  font-size: 14px;
  line-height: 19.6px;
  font-family: 'NotoLight';
  font-weight: 400;
  height: ${({ isSummary }) => (isSummary ? '2.5rem' : '14rem')};
  overflow-y: ${({ isSummary }) => (isSummary ? 'hidden' : 'scroll')};
  padding: 0 1rem;
  height: ${({ isSummary }) => (isSummary ? '3rem' : '100%')};
  max-height: 18rem;
  width: 100%;
  white-space: ${({ isSummary }) => (isSummary ? 'nowrap' : 'pre-line')};
  text-overflow: ellipsis;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const StyledGather = styled.span`
  font-weight: 400;
  font-size: 13px;
  margin: 1rem 0;
  padding: 0 1rem;
`;

const PostHeader = ({
  userImg,
  userName,
  date,
  boardId,
  dropDownProps,
  isMine = false,
}: {
  userImg?: string;
  userName: string;
  date?: string;
  boardId?: number;
  isMine?: boolean;
  dropDownProps?: {
    onShare: () => void;
    onEdit: () => void;
    onDelete: () => void;
  };
}) => {
  return (
    <Wrapper margin="0.5rem 0" padding="0.5rem 1rem">
      <Wrapper width="2rem">
        <Img url={userImg} type="profile" />
      </Wrapper>

      <Wrapper isColumn alignItems="start" margin="0 0 0 0.5rem">
        <UserName>{userName}</UserName>
        {(boardId || date) && (
          <PostInfo>
            {date?.replaceAll('-', '.')}
            <StyledDot />
            ??????????????? {boardId}
          </PostInfo>
        )}
      </Wrapper>
      {boardId && isMine && dropDownProps && <DropdownMenu isMine={isMine} {...dropDownProps} />}
      {!isMine && dropDownProps && <BiShareAlt onClick={() => dropDownProps.onShare()} />}
    </Wrapper>
  );
};

const PostTitle = ({ children, category }: PropsWithChildren<Pick<Board, 'category'>>) => {
  return (
    <Wrapper justifyContent="space-between" padding="0 1rem">
      <Title>{children}</Title>
      <Badge>{category === 'CHALLENGE' ? '?????? ??? ???' : '??????'}</Badge>
    </Wrapper>
  );
};

const Content = ({ children, isSummary }: PropsWithChildren<ContentWrapperProps>) => {
  return <ContentWrapper isSummary={isSummary}>{children}</ContentWrapper>;
};

const Gather = ({ children }: PropsWithChildren) => {
  return (
    <StyledGather>
      <Typography weight={700}>{children}</Typography>??? ?????????!
    </StyledGather>
  );
};

export const PostCard = ({ children, onClick }: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <Wrapper
      isColumn
      alignItems="start"
      padding="1rem 0"
      margin="0.5rem 0 0 0"
      onClick={() => onClick()}
      backgroundColor="white"
    >
      {children}
    </Wrapper>
  );
};

PostCard.PostHeader = PostHeader;
PostCard.PostTitle = PostTitle;
PostCard.Content = Content;
PostCard.Gather = Gather;
