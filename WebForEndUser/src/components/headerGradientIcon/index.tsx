import './index.scss';

import React from 'react';
import Img from 'react-cool-img';

export interface IHeaderGradientIconProps {
    src: string;
    size?: number;
    alt?: string;
    classOverlay?: string;
    classIcon?: string;
    onClick?: () => any;
}
export const HeaderGradientIcon: IComponent<IHeaderGradientIconProps> = (props) => {
    const { size = 24 } = props;
    const { classOverlay = "bg-prime" } = props;
    const { classIcon = "bg-gradient-prime" } = props;
    const { alt = "lazyload img" } = props;
    return (
        <div className="flex relative pa2 center-items animate__animated animate__fadeIn" style={{ width: size, height: size }}>
            <div className={`${classOverlay} o-10 absolute w-100 h-100 br-pill`} />
            <div className={`${classIcon} w-100 h-100 pa3 br-pill center-items animate__animated animate__bounceIn`}>
                <Img alt={alt} className="w-100 h-100" src={props.src} />
            </div>
        </div>
    );
};
