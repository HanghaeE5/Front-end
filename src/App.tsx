import './App.css';

import styled, { ThemeProvider } from 'styled-components';

import { RouterSwitch } from './route/RouterSwitch';
import { theme } from './theme';

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
  font-family: 'NotoMed';
`;

function App() {
  return (
    <ResponseContainer>
      <ThemeProvider theme={theme}>
        <RouterSwitch />
      </ThemeProvider>
    </ResponseContainer>
  );
}

export default App;
