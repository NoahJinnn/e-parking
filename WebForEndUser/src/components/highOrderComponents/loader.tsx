import React from 'react';
import { useRecoilValue } from 'recoil';

import { useTypedTranslation } from '@languages/typedTranslation';
import { CircularProgress } from '@material-ui/core';
import { appLoaded } from '@states/app';

interface ILoader {
    mess?: string;
}

export const Loader: IComponent<ILoader> = ({ children, mess }) => {
    const loaded = useRecoilValue(appLoaded);
    const { t } = useTypedTranslation();
    if (!loaded) {
        return (
            <div className="vw-100 vh-100 flex justify-center items-center">
                <div className="flex flex-column justify-center items-center animate__animated animate__flash animate__slower ease-in-out infinite">
                    <CircularProgress color="primary"></CircularProgress>
                    <h3 className="blue">{mess || t("LoaderPrepareData")}</h3>
                </div>
            </div>
        );
    }
    return <div>{children}</div>;
};
