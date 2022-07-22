import './App.css';

import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { commonPopConfirmState } from './recoil/store';
import { useRecoilValue } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PopConfirmNew } from './component/element';
import { routeList } from './route/routeList';

const ResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};
  box-sizing: border-box;
  font-family: 'NotoSans';
`;

function App() {
  const confirmState = useRecoilValue(commonPopConfirmState);

  return (
    <ResponseContainer>
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
    </ResponseContainer>
  );
}

export default App;
