import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { editNicknameModalState, notiModalState, profileMenuModalState } from '../../recoil/store';
import NotiModal from '../modallayout/NotiModal';
import ProfileMenuModal from '../modallayout/ProfileMenuModal';

const TopNavWrapper = styled.div`
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

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

export const TopNavLayout = () => {
  const [modalNoti, setModalNoti] = useRecoilState(notiModalState);
  const [modalProfileMenu, setModalProfileMenu] = useRecoilState(profileMenuModalState);

  const nav = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <TopNavWrapper>
      <Box
        width="4.1875rem"
        height={2.02}
        margin={'auto auto auto 5.3%'}
        style={{
          backgroundImage: 'url(/assets/로고.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          cursor: 'pointer',
        }}
        onClick={() => {
          nav('/');
        }}
      ></Box>
      <RowBox
        width="5.8rem"
        height={2.02}
        margin={'auto 5.3% auto auto'}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          gap: '1rem',
        }}
      >
        {' '}
        <Box
          width="4.1875rem"
          height={2.02}
          margin={'auto'}
          style={{
            backgroundImage: 'url(/assets/nav/notiicon.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '3.7rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            setModalNoti(true);
          }}
        ></Box>
        <Box
          width="3rem"
          height={2.02}
          margin={'auto'}
          style={{
            backgroundImage: 'url(/assets/토끼.PNG)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '50%',
            border: '2px solid black',
            cursor: 'pointer',
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
