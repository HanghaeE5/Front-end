import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routeList } from './routeList';

export const RouterSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routeList.map((route) => (
          <Route key={route.id} path={route.path} element={<route.page />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
