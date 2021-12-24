import { useEffect, useState } from 'react';

import { gDebug } from '@utils/log';

/**
 * Call an function after component did mount
 * @param cb Callback function for using
 */
export const useDidMount = (cb = () => {}) => {
    useEffect(() => {
        cb();
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return true;
};

export const useCacheValue = (): [any, (input: any, key: string, update: (input: any) => Promise<any>) => any] => {
    const [val, setVal] = useState();
    const [cacheDict, setCacheDict] = useState<any>({});
    const setNewVal = async (input: any, key: string, update: (input: any) => any) => {
        gDebug.i("useCacheValue", "Current cache dict", cacheDict);
        if (cacheDict[input[key]]) {
            setVal(cacheDict[input[key]]);
        } else {
            setVal(undefined);
            const data = await update(input);
            setCacheDict({ ...cacheDict, [input[key]]: data });
            setVal(data);
        }
    };
    return [val, setNewVal];
};
