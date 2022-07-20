import styled from 'styled-components';

type ImgType = 'profile' | 'round' | 'square';

interface ImgProps {
  type?: ImgType;
  url?: string;
  width?: string;
  height?: string;
}

const StyledImg = styled.img<ImgProps>`
  max-width: 770px;
  border-radius: ${({ type }) => (type === 'profile' ? '50%' : type === 'round' ? '0.5rem' : '')};
  width: ${({ type, width }) => (type === 'profile' ? '2rem' : width)};
  height: ${({ type, height }) => (type === 'profile' ? '2rem' : height)};
  max-height: 500px;
  background-color: ${({ theme }) => theme.color.grayMedium};
  min-height: ${({ type }) => type !== 'profile' && '200px'};
`;

export const Img = ({ url, type = 'round', width = '100%', height = '200px' }: ImgProps) => {
  return <StyledImg src={url} type={type} width={width} height={height} />;
};
