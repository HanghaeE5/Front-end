import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userApi } from '../../api/callApi';
import {
  notiModalState,
  profileMenuModalState,
  userInfoState,
  userJoinTypeState,
  userNicknameState,
  userprofilephotoState,
} from '../../recoil/store';
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

export const TopNavLayout = () => {
  const [, setModalNoti] = useRecoilState(notiModalState);
  const [, setModalProfileMenu] = useRecoilState(profileMenuModalState);
  const [fileImage, setFileImage] = useRecoilState(userprofilephotoState);
  const [userJoinType, setUserJoinType] = useRecoilState(userJoinTypeState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState);

  const nav = useNavigate();

  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserNickname(data.data.nick);
      setFileImage({ img_show: data.data.profileImageUrl, img_file: '' });
      setUserInfo(data.data);
    },
    onError: () => {
      // nav('/login');
    },
  });

  //???????????? ?????? ?????? API
  const joinTypeData = useMutation(() => userApi.joinTypeApi(), {
    onSuccess: (data) => {
      setUserJoinType(data.data.socialUser);
    },
  });

  const joinType = () => {
    joinTypeData.mutate();
  };

  useEffect(() => {
    joinType();
  }, []);

  return (
    <TopNavWrapper>
      <Box
        width="4.1875rem"
        height={2.02}
        margin={'auto auto auto 5.3%'}
        style={{
          backgroundImage: 'url(/assets/??????.svg)',
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
            backgroundImage: 'url(/assets/nav/??????.svg)',
          }}
          onClick={() => {
            setModalNoti(true);
          }}
        ></Box>
        <Box
          width="1.6rem"
          height={1.6}
          margin={'auto'}
          style={{
            backgroundImage: `url(${fileImage.img_show})`,
            border: '0.3px solid',
            backgroundSize: 'cover',
            borderRadius: '50%',
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
