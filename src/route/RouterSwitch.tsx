import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PopConfirmNew } from '../component/element';
import { commonPopConfirmState } from '../recoil/store';

import { routeList } from './routeList';

export const RouterSwitch = () => {
  const confirmState = useRecoilValue(commonPopConfirmState);

  return (
    <BrowserRouter>
      {confirmState.visible && <PopConfirmNew {...confirmState} />}

      <Routes>
        {routeList.map((route) => (
          <Route key={route.id} path={route.path} element={<route.page />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
