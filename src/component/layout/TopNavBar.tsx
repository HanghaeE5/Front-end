import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { notiModalState, profileMenuModalState } from '../../recoil/store';
import NotiModal from '../modallayout/NotiModal';
import ProfileMenuModal from '../modallayout/ProfileMenuModal';

const TopNavWrapper = styled.nav`
  height: 3.75rem;
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: row;
  align-items: center;
  background-color: #ffffff;
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

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #f88181; */
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #683b3b; */
`;

type font = {
  size: number;
  color: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

export const TopNavLayout = () => {
  const [, setModalNoti] = useRecoilState(notiModalState);
  const [, setModalProfileMenu] = useRecoilState(profileMenuModalState);

  const nav = useNavigate();

  return (
    <TopNavWrapper>
      <Box
        width="4.1875rem"
        height={2.02}
        margin={'auto auto auto 5.3%'}
        style={{
          backgroundImage: 'url(/assets/로고.svg)',
          backgroundSize: 'cover',
        }}
        onClick={() => {
          nav('/');
        }}
      ></Box>
      <RowBox
        width="5rem"
        height={2.02}
        margin={'auto 5.3% auto auto'}
        style={{
          gap: '1rem',
        }}
      >
        {' '}
        <Box
          width="2rem"
          height={2.02}
          margin={'auto'}
          style={{
            backgroundImage: 'url(/assets/nav/알림.svg)',
            backgroundSize: '1.8rem',
          }}
          onClick={() => {
            setModalNoti(true);
          }}
        ></Box>
        <Box
          width="2rem"
          height={2}
          margin={'auto'}
          style={{
            backgroundImage: 'url(/assets/토끼.PNG)',
            backgroundSize: 'cover',
            borderRadius: '50%',
            border: '2px solid black',
          }}
          onClick={() => {
            setModalProfileMenu(true);
          }}
        ></Box>
      </RowBox>
      <NotiModal></NotiModal>
      <ProfileMenuModal></ProfileMenuModal>
    </TopNavWrapper>
  );
};
