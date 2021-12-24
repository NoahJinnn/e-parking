import { CustomPickerUtils } from 'component/CustomDatePicker/CustomPickerUtils';
import { LoginPage } from 'page/LoginPage/LoginPage';
import ParkingManagerPage from 'page/ParkingManagerPage/ParkingManagerPage';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation
} from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { MainNavBar } from './component/navbar/MainNavBar';
import { loginState } from './state-management/app';

export function AppSwitcher() {
  const [login] = useRecoilState(loginState);
  const [dark] = useState(false);
  const location = useLocation();
  return (
    <div
      className={`fixed top-0 left-0 h-100 w-100 z--1 app__${
        dark ? "dark" : "light"
      }`}
    >
      <CustomPickerUtils>
        <Switch location={location}>
          <Route path="/login">
            {login && <Redirect to="/" />}
            <LoginPage />
          </Route>
          <Route path="/">
            {/* {!login && <Redirect to="/login" />} */}
            <AppMainSwitcher />
          </Route>
        </Switch>
      </CustomPickerUtils>
    </div>
  );
}

export function AppMainSwitcher() {
  const location = useLocation();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<TMainPages>("map");

  useEffect(() => {
    history.push(`/${currentPage}`);
  }, [currentPage, history]);
  return (
    <Switch location={location}>
      <MainNavBar page={currentPage} onNavigateToPage={setCurrentPage}>
        <Route path="/parking-manager">
          <ParkingManagerPage />
        </Route>
      </MainNavBar>
    </Switch>
  );
}
