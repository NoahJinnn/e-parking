import './index.scss';

import React from 'react';

/**
 * Button
 * @author: Giang Nguyen
 */
export interface IRippleBtn {
    children?: React.ReactNode;
    className?: string;
    activeClass?: string;
    disabled?: boolean;
    onClick?: any;
}

export const RippleButton: IComponent<IRippleBtn> = (props) => {
    // Constructor
    const { children, className, onClick, disabled, activeClass = "" } = props;
    const btn = React.createRef() as React.RefObject<HTMLButtonElement>;

    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { pageX, pageY, currentTarget } = event;

        const rect = currentTarget.getBoundingClientRect();
        const left = pageX - (rect.left + window.scrollX);
        const top = pageY - (rect.top + window.scrollY);
        if (!disabled) {
            const ripples = document.createElement("span");
            ripples.style.left = left + "px";
            ripples.style.top = top + "px";
            ripples.classList.add("components__button-ripple");
            btn.current?.appendChild(ripples);

            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                ripples.remove();
            }, 900);
            onClick();
        }
    };

    return (
        <button
            className={`${className} components__button ${!disabled ? activeClass : "o-60"}`}
            disabled={disabled}
            onClick={(event) => handleClickButton(event)}
            ref={btn}>
            {children}
        </button>
    );
};

RippleButton.defaultProps = {
    className: "",
    disabled: false,
    onClick: () => {},
};
