import './App.css';

import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { commonPopConfirmState } from './recoil/store';
import { useRecoilValue } from 'recoil';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { PopConfirmNew } from './component/element';
import { routeList } from './route/routeList';
import { MainPageWrapper } from './page/MediaType';
import { EvBtnAble, EvFontBox, EvImgBox, EvKoreanFont } from './component/element/BoxStyle';

const ResponsiveContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  @media (min-width: 1025px) {
    background-image: url('/assets/pcBackground.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  & > div {
    @media (min-width: 1025px) {
      max-width: 32rem;
      position: absolute;
      right: 10rem;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.mainColor};
  }
`;

function App() {
  const confirmState = useRecoilValue(commonPopConfirmState);
  // const nav = useNavigate();

  function checkMobile() {
    const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    // alert(varUA);
    if (varUA.indexOf('android') > -1) {
      if (varUA.indexOf('naver') != -1) {
        //안드로이드 네이버
        return 'phoneNaver';
      } else if (varUA.indexOf('samsungbrowser') != -1) {
        //안드로이드 삼성
        return 'phoneSamsung';
      }
      //네이버, 삼성 아닌 안드로이드
      return 'other';
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
      //IOS
      return 'other';
    } else {
      //아이폰, 안드로이드 외
      return 'other';
    }
  }

  if (checkMobile() === 'phoneNaver' || checkMobile() === 'phoneSamsung') {
    return (
      <MainPageWrapper>
        <EvFontBox width={'100%'} height={8} backgroundColor="#FFD600 " margin="5rem auto 0 auto">
          <EvKoreanFont weight={500} size={1.1} lineHeight={'20px'} align={'center'} style={{ whiteSpace: 'pre-line' }}>
            {`안드로이드(갤럭시, LG 등) 기종은\n크롬, 카카오 브라우저 이용을 부탁드립니다.\n
            삼성 기본브라우저, 네이버앱에서는\n서비스 이용이 제한됩니다😥`}
          </EvKoreanFont>
        </EvFontBox>
        <EvImgBox width={'17rem'} height={15} margin="1rem auto" url="url(/assets/캐릭터/브라우니2단계.gif)" />
      </MainPageWrapper>
    );
  }
  return (
    <ResponsiveContainer>
      <div>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            {confirmState.visible && <PopConfirmNew {...confirmState} />}
            <Routes>
              {routeList.map((route) => (
                <Route key={route.id} path={route.path} element={<route.page />} />
              ))}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </ResponsiveContainer>
  );
}

export default App;
