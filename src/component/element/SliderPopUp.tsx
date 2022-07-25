import { PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  // max-width: ${({ theme }) => theme.maxWidth};
`;

export const Background = styled.div`
  background-color: black;
  opacity: 0.65;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

export const Slide = keyframes`
    0% {
        transform: translateY(20%);
    }

    100% {
        transform: translateY(0);
    }
`;

export const SliderWrapper = styled.div`
  animation: ${Slide} 0.6s ease;
  z-index: 4;
`;

export const SliderPopUp = ({ children }: PropsWithChildren) => {
  return (
    <ModalContainer>
      <SliderWrapper>{children}</SliderWrapper>
      <Background />
    </ModalContainer>
  );
};
