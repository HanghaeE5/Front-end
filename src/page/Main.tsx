import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BsQuestionCircle } from 'react-icons/bs';
import { ReactComponent as DirectionIcon } from '../asset/icons/direction.svg';

import {
  accessTokenState,
  editNicknameModalState,
  editPhotoModalState,
  refreshTokenState,
  userNicknameState,
  userPhotoWaitState,
  userprofilephotoState,
} from '../recoil/store';
import EditNicknameModal from '../component/modallayout/EditNicknameModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EditPhotoModal from '../component/modallayout/EditPhotoModal';
import { useQuery } from 'react-query';
import { userApi } from '../api/callApi';
import { InfoModal } from '../component/InfoModal';
import { Typography, Wrapper } from '../component/element';
import { PATH } from '../route/routeList';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  /* background-color: #f5d7e5; */
  margin: 0px auto 0px auto;
  position: relative;
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
  background-color: #ffffff;
`;

const ToDoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  //스크롤바 없애기
  ::-webkit-scrollbar {
    display: none;
  }
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
`;

const BoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #6922bb; */
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

const EnglishFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'OpensansBold' : 'OpensansMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const EventWrapper = styled(Wrapper)`
  cursor: pointer;
`;
console.log(window.location.href);

export const Main = () => {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [, setmodalEditNickname] = useRecoilState(editNicknameModalState);
  const [, setModalEditPhoto] = useRecoilState(editPhotoModalState);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState);
  const accessLoginToken = useSetRecoilState(accessTokenState);
  const refreshLoginToken = useSetRecoilState(refreshTokenState);
  const [fileImage, setFileImage] = useRecoilState(userprofilephotoState);
  const setUserPhotoWait = useSetRecoilState(userPhotoWaitState);
  const all = window.location.href;

  const first = all.split('&');
  const accessToken = first[0].split('=')[1];
  const nav = useNavigate();

  //유저정보 가져오기 API
  const userInformData = useQuery('userData', userApi.userInformApi, {
    onSuccess: (data) => {
      setUserNickname(data.data.nick);
      setFileImage({ img_show: data.data.profileImageUrl, img_file: '' });
      setUserPhotoWait({ img_show: data.data.profileImageUrl, img_file: '' });
    },
    onError: () => {
      // nav('/login');
    },
  });

  useEffect(() => {
    if (accessToken != null) {
      // console.log();
      const refreshToken = first[1].split('=')[1];
      // console.log(refreshToken);
      const isNickname = first[2].split('=')[1];
      // console.log(isNickname);

      if (isNickname === 'N') {
        nav('/signupsns');
      } else {
        accessLoginToken(accessToken);
        refreshLoginToken(refreshToken);
        // window.location.replace('/');
      }
    }
  }, [userNickname]);

  return (
    <>
      {/* <EventWrapper
        backgroundColor="black"
        height="2.85rem"
        justifyContent="center"
        padding="1rem"
        alignItems="center"
        onClick={() => nav(PATH.EVENT)}
      >
        <Typography color="#FFD600" weight={700}>
          투두윗 100% 당첨 럭키박스 이벤트 바로가기 <DirectionIcon />
        </Typography>
      </EventWrapper> */}

      <NavLayout>
        <MainContainer>
          {infoModalVisible && <InfoModal closeModal={() => setInfoModalVisible(false)} />}
          <Box
            width={'4.75rem'}
            height={4.75}
            margin={'1.1875rem 9.375rem 0 9.3125rem'}
            style={{
              borderRadius: '50%',
              border: '1px solid #D9D9D9',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${fileImage.img_show})`,
            }}
          />

          <Box
            width={'1.3294rem'}
            height={1.2468}
            margin={'-1.3rem 8.7731rem 0 13.3356rem'}
            style={{
              border: 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: 'url(/assets/camera.svg)',
              cursor: 'pointer',
            }}
            onClick={() => {
              setModalEditPhoto(true);
            }}
          />

          <EditPhotoModal></EditPhotoModal>
          <RowBox margin={'0.628rem 0px 0px 0px'}>
            <Box
              height={1.5}
              margin={'0 0 0 0'}
              style={{ display: 'flex', justifyContent: 'initial', borderBottom: '0.5px solid #000000' }}
            >
              <KoreanFont size={0.875} color="#000000">
                {userNickname}
              </KoreanFont>
            </Box>
            <Box
              width={'1rem'}
              height={1}
              margin={'-0.5rem 0 0 0.2rem '}
              style={{
                border: 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: 'url(/assets/pencil.svg)',
                cursor: 'pointer',
              }}
              onClick={() => {
                setmodalEditNickname(true);
              }}
            ></Box>
            <EditNicknameModal></EditNicknameModal>
          </RowBox>
          <Box
            width={'11.8125rem'}
            height={12.5625}
            margin={'1.75rem 5.8125rem 0 5.8125rem '}
            style={{
              border: 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: 'url(/assets/Sloth.svg)',
            }}
          ></Box>
          <Box
            width={'5.25rem'}
            height={0.75}
            margin={'1.125rem 9.0625rem 0 9.0625rem '}
            style={{
              border: 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: 'url(/assets/shadow.svg)',
            }}
          ></Box>
          <BoxSide width={'60%'} height={1.6875} margin={'0.8125rem auto 0 8%'}>
            <KoreanFont size={1.25} color="#000000">
              ToDo의 고수늘보
            </KoreanFont>
          </BoxSide>

          <Box width={'100%'} margin={'0.4rem 1.25rem 0rem 1.25rem'}>
            <Box
              width={'89%'}
              height={1.3125}
              margin={'0'}
              style={{ border: '1px solid #DDDDDD', borderRadius: '30px' }}
            >
              <KoreanFont size={0.85} color="#000000" style={{ zIndex: '3', margin: '0 1rem 0 auto' }}>
                41.8%
              </KoreanFont>
            </Box>
            <BoxSide
              width={'42.6%'}
              height={1.3125}
              margin={'-1.3125rem auto auto 5.6%'}
              style={{
                background: 'linear-gradient(90deg, #F4D687 0%, #F08C15 161.46%)',
                borderRadius: '30px 0px 0px 30px',
              }}
            ></BoxSide>
          </Box>
          <RowBox
            width={'84%'}
            margin={'0.25rem 1.875rem 0rem 1.875rem'}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <BoxSide width={1.8} height={1.375}>
              <KoreanFont size={1} color="#000000">
                23
              </KoreanFont>
            </BoxSide>
            <BoxSide width={1.8} height={1.375}>
              <KoreanFont size={1} color="#000000">
                24
              </KoreanFont>
            </BoxSide>
          </RowBox>
          <Box width={10.0625} height={1.6875} margin={'1.6875rem auto 0 8%'}>
            <EnglishFont size={1.25} color="#000000">
              Today_ to do list
            </EnglishFont>
          </Box>

          <ToDoBox
            width={'89%'}
            margin={'0.375rem 5.6% 0 5.6%'}
            style={{
              padding: '0.8125rem 0',
              gap: '0.7rem',
              background: '#FFFFFF',
              border: '1px solid #DDDDDD',
              borderRadius: '6px',
            }}
          >
            <RowBox width={'100%'}>
              <Box width={'0.825rem'} margin={'0rem 0.5rem 0 1rem'}>
                <KoreanFont size={0.87} color="#000000">
                  ✔
                </KoreanFont>
              </Box>
              <BoxSide width={'82%'} margin={'0rem auto 0 0'}>
                <KoreanFont size={0.87} color="#000000">
                  영어듣기 1시간 하기
                </KoreanFont>
              </BoxSide>
            </RowBox>
            <RowBox width={'100%'}>
              <Box width={'0.825rem'} margin={'0rem 0.5rem 0 1rem'}>
                <KoreanFont size={0.87} color="#000000">
                  ✔
                </KoreanFont>
              </Box>
              <BoxSide width={'82%'} margin={'0rem auto 0 0'}>
                <KoreanFont size={0.87} color="#000000">
                  강아지 산책 시키기
                </KoreanFont>
              </BoxSide>
            </RowBox>
            <RowBox width={'100%'}>
              <Box width={'0.825rem'} margin={'0rem 0.5rem 0 1rem'}>
                <KoreanFont size={0.87} color="#000000">
                  ✔
                </KoreanFont>
              </Box>
              <BoxSide width={'82%'} margin={'0rem auto 0 0'}>
                <KoreanFont size={0.87} color="#000000">
                  사당자동차운전연습장에서 운전연수 2시간 받기
                </KoreanFont>
              </BoxSide>
            </RowBox>
          </ToDoBox>
        </MainContainer>
      </NavLayout>
    </>
  );
};
