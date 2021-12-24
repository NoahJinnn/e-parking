import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { darkState } from '@states/app';
import { gDebug } from '@utils/log';

/**
 * Return an bool if app is in darkmode
 */
export const useDarkMode = () => {
    const [currentVal] = useRecoilState(darkState);
    const [dark, setDark] = useState(currentVal === "dark");
    const darkListender = (event: MediaQueryListEvent) => {
        setDark(event.matches);
    };
    const darkRef = useRef<MediaQueryList>();
    useEffect(() => {
        darkRef.current = window.matchMedia("(prefers-color-scheme: dark)");
        switch (currentVal) {
            case "auto": {
                darkRef.current.addEventListener("change", darkListender);
                setDark(darkRef.current.matches);
                break;
            }
            default: {
                darkRef.current.removeEventListener("change", darkListender);
                setDark(currentVal === "dark");
            }
        }
        gDebug.i("useDarkMode", "Global dark value", currentVal.toString());
    }, [currentVal]);
    useEffect(() => {
        gDebug.i("useDarkMode", "Current dark value", dark.toString());
    }, [dark]);
    return dark;
};
