import './index.scss';

import React, { Fragment, useState } from 'react';
import LazyImg from 'react-cool-img';

/**
 * Image Lazyload
 * @author: Giang Nguyen
 */
export interface ILazyImgProps {
    isBlur?: boolean;
    placeholder?: string;
    className?: string;
    src: string;
    onClick?: () => any;
}

export const LazyLoadImg: IComponent<ILazyImgProps> = (props) => {
    // Constructor
    const { isBlur, placeholder, className, src, onClick } = props;
    const [classes, setClasses] = useState([isBlur ? "components__img-thumb" : "", className] as string[]);

    const handleImageLoaded = () => {
        if (isBlur) {
            classes[0] = "components__img-full";
            setTimeout(() => {
                setClasses([...classes]);
            }, 500);
        }
    };

    const renderClass = () => {
        let classOutput = "";
        for (const [index, item] of classes.entries()) {
            classOutput += item;
            if (item && index < classes.length - 1) {
                classOutput += " ";
            }
        }
        return classOutput;
    };

    return (
        <Fragment>
            <LazyImg
                className={renderClass()}
                placeholder={placeholder ? placeholder : src}
                src={src}
                onClick={() => onClick?.()}
                onLoad={() => handleImageLoaded()}
                debounce={0}
                alt="e-Parking"
            />
            <noscript>
                <img className={className} src={src} alt="e-Parking" />
            </noscript>
        </Fragment>
    );
};

LazyLoadImg.defaultProps = {
    isBlur: false,
    placeholder: "",
    className: "",
    src: "",
    onClick: () => {},
};
