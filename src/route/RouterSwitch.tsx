import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PopConfirmNew } from '../component/element';
import { PopNoti } from '../component/element/PopNoti';
import { commonPopConfirmState, popNotiState } from '../recoil/store';

import { routeList } from './routeList';

export const RouterSwitch = () => {
  const [confirmState, setConfirmState] = useRecoilState(commonPopConfirmState);
  const { visible, type, title, content, button } = confirmState;
  return (
    <BrowserRouter>
      {visible && (
        <PopConfirmNew
          iconType={type === 'success' ? 'success' : 'warning'}
          title={title || (type === 'success' ? '성공했습니다.' : '실패했습니다')}
          content={content || (type === 'error' ? '다시 시도해주세요.' : '')}
          button={{
            text: button?.text || '확인',
            onClick: () => {
              button?.onClick();
              setConfirmState({
                visible: false,
                type: 'success',
                title: '',
                button: undefined,
                content: '',
                optionalButton: undefined,
              });
            },
          }}
        />
      )}

      <Routes>
        {routeList.map((route) => (
          <Route key={route.id} path={route.path} element={<route.page />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
