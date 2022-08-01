import styled from 'styled-components';

type ImgType = 'profile' | 'round' | 'square';

interface ImgProps {
  type?: ImgType;
  url?: string;
  width?: string;
  height?: string;
  isPointer?: boolean;
}

const StyledImg = styled.div<ImgProps>`
  max-width: 770px;
  border-radius: ${({ type }) => (type === 'profile' ? '50%' : type === 'round' ? '0.5rem' : '')};
  width: ${({ type, width }) => (type === 'profile' ? width || '2rem' : width)};
  height: ${({ type, height }) => (type === 'profile' ? height || '2rem' : height || '200px')};
  max-height: 500px;
  background-color: ${({ theme }) => theme.color.grayMedium};
  background-image: ${({ url }) => (url ? `url(${url})` : '')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 50%;
  cursor: ${({ isPointer }) => isPointer && 'pointer'};
`;

export const Img = ({ url, type = 'round', width = '100%', ...style }: ImgProps) => {
  return <StyledImg url={url} type={type} width={width} {...style} />;
};
