import { ThemeProvider } from 'styled-components';

import { RouterSwitch } from './route/RouterSwitch';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterSwitch />
    </ThemeProvider>
  );
}

export default App;
