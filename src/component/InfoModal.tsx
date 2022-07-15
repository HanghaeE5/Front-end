import { SliderPopUp, Typography, Wrapper } from './element';
import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';

const ModalWrapper = styled.div`
  border-radius: 1.25rem;
  width: 21rem;
  height: 28rem;
  background-color: white;
  padding: 1rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
`;

const CloseButton = styled(MdOutlineClose)`
  cursor: pointer;
`;

const GradationBottom = styled.div``;

interface InfoModalProps {
  closeModal: () => void;
}

export const InfoModal = ({ closeModal }: InfoModalProps) => {
  return (
    <SliderPopUp>
      <ModalWrapper>
        <Wrapper width="100%" justifyContent="end">
          <CloseButton onClick={() => closeModal()} />
        </Wrapper>
        <Typography isBold weight={700} size={1.25}>{`캐릭터의 레벨과 스텝은 \n 어떻게 정해지나요?`}</Typography>

        <GradationBottom />
      </ModalWrapper>
    </SliderPopUp>
  );
};
