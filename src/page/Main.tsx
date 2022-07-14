import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  accessTokenState,
  editNicknameModalState,
  editPhotoModalState,
  refreshTokenState,
  userChatacterTypeState,
  userInfoState,
  userNicknameState,
  userPhotoWaitState,
  userprofilephotoState,
} from '../recoil/store';
import EditNicknameModal from '../component/modallayout/EditNicknameModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditPhotoModal from '../component/modallayout/EditPhotoModal';
import { useQuery } from 'react-query';
import { userApi } from '../api/callApi';
import { NoHeaderPageLayout } from '../component/layout/NoHeaderPageLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { EvBox, EvKoreanFont } from '../component/element/BoxStyle';

const MainContainer = styled.div`
  /* display: flex; */
  /* flex-direction: column;
  align-items: center; */
  height: 100%;
  /* background-color: #f5d7e5; */
  position: relative;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  section:nth-of-type(1) {
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  section:nth-of-type(2) {
    overflow-y: scroll;
    height: 100%;
    background-color: ${({ theme }) => theme.color.grayLight};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

console.log(window.location.href);

export const Main = () => {
  const [, setmodalEditNickname] = useRecoilState(editNicknameModalState);
  const [, setModalEditPhoto] = useRecoilState(editPhotoModalState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [userChatacterType, setUserChatacterType] = useRecoilState(userChatacterTypeState);
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
      setUserInfoData(data.data);
      setFileImage({ img_show: data.data.profileImageUrl, img_file: '' });
      // setUserPhotoWait({ img_show: data.data.profileImageUrl, img_file: '' });
    },
    onError: () => {
      // nav('/login');
    },
  });
  console.log(userInformData);
  useEffect(() => {
    if (accessToken) {
      // console.log();
      const refreshToken = first[1].split('=')[1];
      // console.log(refreshToken);
      const isNickname = first[2].split('=')[1];
      // console.log(isNickname);
      accessLoginToken(accessToken);
      refreshLoginToken(refreshToken);

      if (isNickname === 'N') {
        nav('/signupsns');
      } else {
        window.location.replace('/');
      }
      if (!userInfoData?.characterInfo.type) {
        nav('/choosecharacter');
      }
    }
  }, []);

  return (
    <NavLayout>
      <MainContainer>
        <ContentContainer>
          <EvBox direction="row" margin="3rem 0 0 0 " height={4.75}>
            <EvBox
              width={'4.75rem'}
              height={4.75}
              margin={'0 0 0 9rem'}
              url={`url(${fileImage.img_show})`}
              borderRadius="50%"
              border="1px solid #D9D9D9"
            />
            <EvBox
              width={'1.3294rem'}
              height={1.2468}
              margin={'auto 7.0625rem auto 1rem'}
              url={'url(/assets/camera.svg)'}
              isCursor={true}
              onClick={() => {
                setModalEditPhoto(true);
              }}
            />
          </EvBox>
          <EditPhotoModal />

          <EvBox direction="row" margin="1rem 0 0 0 " height={2.125} style={{ zIndex: 3 }}>
            <EvBox
              width={'9.125rem'}
              height={2.125}
              margin={'0 1rem 0 7.125rem'}
              border="1px solid #DDDDDD"
              borderRadius="100px"
            >
              <EvKoreanFont size={0.875} weight={700}>
                {userInfoData?.nick}
              </EvKoreanFont>
            </EvBox>
            <EvBox
              width={'1rem'}
              height={1}
              margin={'auto 5.375rem auto 0.6875rem'}
              url="url(/assets/pencil.svg)"
              isCursor={true}
              onClick={() => {
                setmodalEditNickname(true);
              }}
            ></EvBox>
          </EvBox>
          <EditNicknameModal />

          <EvBox
            width={'19.375rem'}
            height={19.375}
            margin={'-0.5rem auto 0 auto '}
            borderRadius="50%"
            backgroundColor="#ffad60"
          >
            {' '}
            <EvBox
              width={'17.5rem'}
              height={17.5}
              margin={'auto '}
              borderRadius="50%"
              backgroundColor="#ffffff"
              url="url(/assets/캐릭터/나무늘보_STEPl1.svg)"
              backgroundsize="22rem"
            ></EvBox>
          </EvBox>
          <EvBox
            width={'5.25rem'}
            height={0.75}
            margin={'-3.5rem 9.0625rem 0 9.0625rem '}
            url="url(/assets/shadow.svg)"
          ></EvBox>
          <EvBox
            width={'1.3125rem'}
            height={1.3125}
            margin={'1rem 2.0625rem 0 20.0625rem '}
            url="url(/assets/물음표.svg)"
          ></EvBox>

          <EvBox width={'10'} height={1.375} margin={'0.5rem auto 0 auto '}>
            <EvKoreanFont size={1.25} color="#000000" weight={500}>
              {`Lv.${userInfoData?.characterInfo.level}`}
            </EvKoreanFont>
          </EvBox>

          <EvBox width={'10'} height={1.375} margin={'0.5rem auto 0 auto '}>
            <EvKoreanFont size={1.25} color="#000000" weight={500}>
              {userInfoData?.characterInfo.type === '나무늘보'
                ? userInfoData?.characterInfo.step === 'FIRST'
                  ? '누워있는 나무늘보'
                  : userInfoData?.characterInfo.step === 'SECOND'
                  ? '2단계 나무늘보'
                  : '3단계 나무늘보'
                : userInfoData?.characterInfo.step === 'FIRST'
                ? '누워있는 거북이'
                : userInfoData?.characterInfo.step === 'SECOND'
                ? '2단계 거북이'
                : '3단계 거북이'}
            </EvKoreanFont>
          </EvBox>

          {/* <Box width={'100%'} margin={'0.4rem 1.25rem 0rem 1.25rem'}>
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
          </RowBox> */}

          <EvBox direction={'row'} width={'92%'} height={5.75} columnGap={'10px'} margin={'1.125rem auto 0 auto '}>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'} backgroundColor="green">
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid 1A1A1A'}
                borderRadius="50%"
                backgroundColor="yellow"
              ></EvBox>
            </EvBox>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'} backgroundColor="green">
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid 1A1A1A'}
                borderRadius="50%"
                backgroundColor="yellow"
              ></EvBox>
            </EvBox>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'} backgroundColor="green">
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid 1A1A1A'}
                borderRadius="50%"
                backgroundColor="yellow"
              ></EvBox>
            </EvBox>
            <EvBox width={'4.3125rem'} height={5.75} margin={'0 auto'} backgroundColor="green">
              <EvBox
                width={'4.3125rem'}
                height={4.3125}
                margin={'auto 0 0 0'}
                border={'1px solid 1A1A1A'}
                borderRadius="50%"
                backgroundColor="yellow"
              ></EvBox>
            </EvBox>
          </EvBox>

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
        </ContentContainer>
      </MainContainer>
    </NavLayout>
  );
};
