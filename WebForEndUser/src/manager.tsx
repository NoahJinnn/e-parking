import React, { PropsWithChildren, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { appLoaded, darkState } from '@states/app';
import { getAppConfigs, saveAppConfigs } from '@utils/storage';

/**
 * Components manager the app, handle changes of state
 */
export const Manager: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    // TODO: Handle background process here
    const appConf = getAppConfigs();
    const [, setLoaded] = useRecoilState(appLoaded);
    const [, setDark] = useRecoilState(darkState);
    const appLoader = () => {
        // TODO: Prepare data of app here
        setDark(appConf.dark || "auto");
        setLoaded(true);
        // setLoadState(true);
        setInterval(() => {
            // Handle task each 10s
        }, 10000);
        setInterval(() => {
            // Handle task each 30s
        }, 30000);
        setInterval(() => {
            // Handle task each 60s
        }, 60000);
    };
    useEffect(appLoader, [appLoader]);
    /**
     * Using useEffect to catch recoil state changes and handle it logic!
     */
    useEffect(() => {
        // TODO: Catch changed of state an handle it
        saveAppConfigs(appConf);
        return () => {};
    }, [appConf]);
    return <>{children}</>;
};
