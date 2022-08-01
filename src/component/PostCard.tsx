import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Board } from '../Types/community';
import { Badge, DropdownMenu, Img, Typography, Wrapper } from './element';
import { BsDot } from 'react-icons/bs';
import { BiShareAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router';

const DropdownMenuButton = styled(DropdownMenu)`
  cursor: pointer;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const PostInfo = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.grayText};
  margin-top: 0.25rem;
  font-family: Opensans;
`;

const Title = styled.div<{ isSummary?: boolean }>`
  width: 75%;
  margin: 1rem 0;
  white-space: ${({ isSummary }) => (isSummary ? 'nowrap' : 'pre-line')};
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ${({ isSummary }) => isSummary && 'ellipsis'};
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
  const nav = useNavigate();
  return (
    <Wrapper margin="0.5rem 0" padding="0.5rem 1rem">
      <Wrapper
        width={boardId ? '2.5rem' : '2rem'}
        onClick={() => {
          nav(`/friend/page/${userName}`);
        }}
      >
        <Img
          isPointer
          url={userImg}
          type="profile"
          width={boardId ? '2.5rem' : '2rem'}
          height={boardId ? '2.5rem' : '2rem'}
        />
      </Wrapper>

      <Wrapper isColumn alignItems="start" margin="0 0 0 0.5rem">
        <UserName>{userName}</UserName>
        {(boardId || date) && (
          <PostInfo>
            {date?.replaceAll('-', '.')}
            <StyledDot />
            게시물번호 {boardId}
          </PostInfo>
        )}
      </Wrapper>
      {boardId && dropDownProps && <DropdownMenuButton isMine={isMine} {...dropDownProps} />}
    </Wrapper>
  );
};

const PostTitle = ({
  children,
  category,
  isSummary,
}: PropsWithChildren<Pick<Board, 'category'> & { isSummary?: boolean }>) => {
  return (
    <Wrapper justifyContent="space-between" padding="0 1rem">
      <Title isSummary={isSummary}>{children}</Title>
      <Badge>{category === 'CHALLENGE' ? '위드 투두' : '일상'}</Badge>
    </Wrapper>
  );
};

const Content = ({ children, isSummary }: PropsWithChildren<ContentWrapperProps>) => {
  return <ContentWrapper isSummary={isSummary}>{children}</ContentWrapper>;
};

const Gather = ({ children }: PropsWithChildren) => {
  return (
    <StyledGather>
      <Typography weight={700}>{children}</Typography>명 참여중!
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
      isPointer
    >
      {children}
    </Wrapper>
  );
};

PostCard.PostHeader = PostHeader;
PostCard.PostTitle = PostTitle;
PostCard.Content = Content;
PostCard.Gather = Gather;
