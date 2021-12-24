import React from 'react';

/**
 * Button
 * @author: Giang Nguyen
 */
interface Props {
    children: React.ReactNode;
    className: string;
    disabled: boolean;
    onClick: any;
}
interface IComponentButton<P = {}> extends React.FC<P> {
    defaultProps: Partial<P>;
}

const Button: IComponentButton<Props> = (props) => {
    // Constructor
    const { children, className, onClick, disabled } = props;
    const btn = React.createRef() as React.RefObject<HTMLButtonElement>;

    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { pageX, pageY, currentTarget } = event;

        const rect = currentTarget.getBoundingClientRect();
        const left = pageX - (rect.left + window.scrollX);
        const top = pageY - (rect.top + window.scrollY);
        if (!disabled) {
            let ripples = document.createElement('span');
            ripples.style.left = left + 'px';
            ripples.style.top = top + 'px';
            ripples.classList.add('components__button-ripple');
            btn.current?.appendChild(ripples);

            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                ripples.remove();
            }, 900);
            onClick();
        }
    };

    return (
        <button className={'components__button ' + className} disabled={disabled} onClick={(event) => handleClickButton(event)} ref={btn}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    className: '',
    disabled: false,
    onClick: () => {},
};

export default Button;
