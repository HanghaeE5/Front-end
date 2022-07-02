import styled from 'styled-components';
import { Post } from '../Types/community';
import { Badge, Img, Wrapper } from './element';

interface PostCardProps {
  onClick: (id: string) => void;
}

const CardWrapper = styled(Wrapper)`
  background-color: white;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 0.5rem;
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

const Content = styled.div`
  color: ${({ theme }) => theme.color.grayText};
  font-size: 14px;
  line-height: 19.6px;
  font-family: 'Noto Sans CJK Light KR';
  font-weight: 400;
  height: 2.5rem;
  overflow: hidden;
`;

const Gather = styled.div`
  font-weight: 400;
  font-size: 13px;
  margin: 1rem 0;
`;
export const PostCard = ({
  id,
  userId,
  userImg,
  userName,
  imgUrl,
  title,
  content,
  type,
  gather,
  onClick,
}: Post & PostCardProps) => {
  return (
    <CardWrapper isColumn alignItems="start" padding="1rem" margin="0.5rem 0 0 0">
      <Wrapper margin="0.5rem 0">
        <Img url={userImg} type="profile" />
        <UserName>{userName}</UserName>
      </Wrapper>
      {imgUrl && <Img url={imgUrl} type="round" />}
      <Wrapper justifyContent="space-between">
        <Title>{title}</Title>
        <Badge>{type === 'challange' ? '챌린저스' : '일상'}</Badge>
      </Wrapper>
      <Content>{content}</Content>
      <Gather>{gather}명 참여중!</Gather>
    </CardWrapper>
  );
};
