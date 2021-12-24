import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Make and timeout hook
 * @param timeOut time on init
 * @param onTimeOut Callback end timout done
 */
export function useTimeOut (timeOut: number, onTimeOut?: () => any): [number, Dispatch<SetStateAction<number>>] {
    const [time, setTime] = useState(timeOut);
    useEffect(() => {
        const timerID = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            } else {
                if (onTimeOut) onTimeOut();
            }
        }, 1000);
        return () => {
            clearInterval(timerID);
        };
    }, [time, setTime, onTimeOut]);

    return [time, setTime];
}
