import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
    BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation
} from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { CustomPickerUtils } from '@components/highOrderComponents/customPickerUtils';
import { Loader } from '@components/highOrderComponents/loader';
import { MainNavBar } from '@components/mainNavBar';
import { useDarkMode } from '@hooks/darkmode';
import { useDidMount } from '@hooks/utils';
import { useTypedTranslation } from '@languages/typedTranslation';
import { loginState } from '@states/app';
import { gDebug } from '@utils/log';

import { Manager } from './manager';

/**
 * Code splitting
 */
const LoginPage = lazy(() => import("./pages/login/index").then((module) => ({ default: module.LoginPage })));
const MapPage = lazy(() => import("./pages/map/index").then((module) => ({ default: module.MapScreen })));

export function AppSwitcher () {
    const [login] = useRecoilState(loginState);
    const location = useLocation();
    return (
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
    );
}

export function AppMainSwitcher () {
    const location = useLocation();
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState<TMainPages>("map");
    useDidMount(() => {
        if (location.pathname === "/") {
            history.replace("/map");
        }
    });
    useEffect(() => {
        gDebug.i("AppMainSwitcher", "Switch to new tab", currentPage);
        history.push(`/${currentPage}`);
    }, [currentPage, history]);
    return (
        <Switch location={location}>
            <MainNavBar page={currentPage} onNavigateToPage={setCurrentPage}>
                <Route path="/map">
                    <MapPage />
                </Route>
            </MainNavBar>
        </Switch>
    );
}

export function RootRouter () {
    const dark = useDarkMode();
    const { t } = useTypedTranslation();
    const [loaderMess] = useState(t("LoaderPrepareData"));
    return (
        <Router>
            <div className={`fixed top-0 left-0 h-100 w-100 z--1 app__${dark ? "dark" : "light"}`}>
                <Manager>
                    <CustomPickerUtils>
                        <Suspense fallback={<Loader mess="Loading"></Loader>}>
                            <Loader mess={loaderMess}>
                                <AppSwitcher />
                            </Loader>
                        </Suspense>
                    </CustomPickerUtils>
                </Manager>
            </div>
        </Router>
    );
}
