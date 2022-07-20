import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PopNoti } from '../component/element/PopNoti';
import { popNotiState } from '../recoil/store';

import { routeList } from './routeList';

export const RouterSwitch = () => {
  const [popNoti, setPopNoti] = useRecoilState(popNotiState);
  return (
    <BrowserRouter>
      <PopNoti
        confirmType={popNoti.informType}
        visible={popNoti.openPopNoti}
        msg={popNoti.informMsg}
        oneButton={{
          nav: popNoti.btnNav ? popNoti.btnNav : '',
          text: popNoti.btnText ? popNoti.btnText : '확인',
          onClick: () => {
            setPopNoti({
              openPopNoti: false,
            });
          },
        }}
      />
      <Routes>
        {routeList.map((route) => (
          <Route key={route.id} path={route.path} element={<route.page />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
