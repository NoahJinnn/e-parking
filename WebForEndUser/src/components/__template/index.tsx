import './index.scss';

import React from 'react';

import { useTypedTranslation } from '@languages/typedTranslation';

export interface ITemplateProps {
    color?: string;
}

export const Template: IComponent<ITemplateProps> = ({ color, children }) => {
    const { t } = useTypedTranslation();
    const style: React.CSSProperties = {
        color,
    };
    return <h1 style={style}>{t("AppName")}</h1>;
};
