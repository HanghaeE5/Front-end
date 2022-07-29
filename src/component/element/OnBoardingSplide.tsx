import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import { EvColumnBox, EvFontBox, EvKoreanFont } from './BoxStyle';
import styled from 'styled-components';
import '../../style/on-boarding.css';

const OnBoardingImgBox = styled(EvColumnBox)`
  width: 100%;
  height: 23.4375rem;
  /* background-color: orange; */
  overflow-x: hidden;
`;

const OnBoardingImg = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-x: hidden;
`;

const OnBoardingFontBox = styled(EvFontBox)`
  width: 100%;
  height: 9rem;
  margin: 0rem auto 2.5rem auto;
  justify-content: flex-start;
  /* background-color: #bfd5bf; */
  overflow-x: hidden;
  row-gap: 10px;
`;

const OnBoardingTitleFont = styled(EvKoreanFont)`
  size: 1.25rem;
  font-weight: 700;
  text-align: center;
`;

const OnBoardingContentFont = styled(EvKoreanFont)`
  size: 1rem;
  text-align: center;
  line-height: 22px;
  white-space: pre-line;
  color: #5f5f5f;
`;

export const OnBoardingSplide = () => {
  return (
    <EvColumnBox width={'100%'}>
      <Splide
        aria-label="My Favorite Images"
        options={{
          rewind: true,
          arrows: false,
          width: 770,
          gap: '0rem',
          perMove: 1,
        }}
      >
        <SplideSlide>
          <OnBoardingImgBox>
            <OnBoardingImg src="/assets/온보딩/온보딩1.png" alt="" />
          </OnBoardingImgBox>
          <OnBoardingFontBox>
            <OnBoardingTitleFont>투두윗에 오신 여러분을 환영합니다!</OnBoardingTitleFont>
            <OnBoardingContentFont>{`투두윗 서비스는 투두리스트 작성을 통해
            목표를 수립하고 달성할 수 있도록 도와주는
            서비스입니다. 혼자서도 좋지만 같이 할 수 있는
            사람이 있다면 더 힘이 나겠죠?!`}</OnBoardingContentFont>
          </OnBoardingFontBox>
        </SplideSlide>

        <SplideSlide>
          <OnBoardingImgBox>
            <OnBoardingImg src="/assets/온보딩/온보딩2.png" alt="" />
          </OnBoardingImgBox>
          <OnBoardingFontBox>
            <OnBoardingTitleFont>내 캐릭터를 선택하고 함께 성장해요!</OnBoardingTitleFont>
            <OnBoardingContentFont>{`사용자가 원하는 캐릭터를 선택하고,
            투두를 수행하며 얻는 경험치로
            캐릭터를 진화시킬 수 있습니다.
            사용자와 캐릭터가 함께 성장하는 것이죠 😎`}</OnBoardingContentFont>
            <EvFontBox width={'100%'} margin={'-0.5rem auto '}>
              <OnBoardingContentFont style={{ color: '#989898', fontSize: '0.8125rem' }}>
                *자세한 설명은 메인페이지 캐릭터 옆 물음표 아이콘에 있습니다.
              </OnBoardingContentFont>
            </EvFontBox>
          </OnBoardingFontBox>
        </SplideSlide>

        <SplideSlide>
          <OnBoardingImgBox>
            <OnBoardingImg src="/assets/온보딩/온보딩3.png" alt="" />
          </OnBoardingImgBox>
          <OnBoardingFontBox>
            <OnBoardingTitleFont>친구들과 함께하고 싶다면? 위드 투두!</OnBoardingTitleFont>
            <OnBoardingContentFont>{`더불어, 커뮤니티의 위드 투두 게시글에서
            ‘위드 투두 참여하기’ 버튼을 클릭하시면
            다른 사용자와 투두리스트를 함께 공유하고
             채팅을 통해 소통할 수 있습니다!`}</OnBoardingContentFont>
          </OnBoardingFontBox>
        </SplideSlide>

        <SplideSlide>
          <OnBoardingImgBox>
            <OnBoardingImg src="/assets/온보딩/온보딩4.png" alt="" />
          </OnBoardingImgBox>
          <OnBoardingFontBox>
            <OnBoardingTitleFont>홈 화면에 추가해서 편하게 사용하세요!</OnBoardingTitleFont>
            <OnBoardingContentFont>{`아래와 같은 방법으로 모바일에서
            매일 쉽고 편하게 투두윗을 사용하실 수 있어요!
            아이폰(사파리) : 하단 즐겨찾기 - 홈화면에 추가
            안드로이드(크롬) : 하단 메뉴 - 현재페이지 추가
            `}</OnBoardingContentFont>
            <EvFontBox width={'100%'} margin={'-0.5rem auto '}>
              <OnBoardingContentFont style={{ color: '#989898', fontSize: '0.8125rem' }}>
                *삼성인터넷과 네이버앱은 사용이 불가합니다.
              </OnBoardingContentFont>
            </EvFontBox>
          </OnBoardingFontBox>
        </SplideSlide>
      </Splide>
    </EvColumnBox>
  );
};

//   export const Img = ({ url, type = 'round', width = '100%', height }: ImgProps) => {
//     return <StyledImg url={url} type={type} width={width} height={height} />;
//   };
