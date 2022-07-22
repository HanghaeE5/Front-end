import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PopConfirmNew } from '../component/element';
import { PopNoti } from '../component/element/PopNoti';
import { commonPopConfirm, commonPopConfirmState, popNotiState } from '../recoil/store';

import { routeList } from './routeList';

export const RouterSwitch = () => {
  const confirmState = useRecoilValue(commonPopConfirm);

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
