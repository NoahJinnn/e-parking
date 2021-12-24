import './index.scss';

import React, { useEffect, useState } from 'react';

// Declare component props
export interface IOTPInputViewProps {
    onClick?: () => any;
    codeLength?: number;
    size?: number;
    onCodeFilled?: (code: string) => any;
}

export const OTPInputView: IComponent<IOTPInputViewProps> = (props) => {
    const { onClick, codeLength = 6 } = props;
    const { size = 4 } = props;
    const [inputCode, setInputCode] = useState("");
    useEffect(() => {}, []);
    const CodeElements = [];
    for (let i = 0; i < codeLength; i++) {
        CodeElements.push(
            <div
                key={i}
                className="ma1 br3 animate__animated animate__bounceIn flex center-items bg-hard-light bg-hard-light bg-med-dark ba bc-light"
                style={{
                    animationDelay: `${(i + 1) * 100}ms`,
                    width: `${size}rem`,
                    height: `${size}rem`,
                }}>
                <p className="f3 light">{inputCode[i] || ""}</p>
            </div>,
        );
    }
    const onInputOTP = (otp: string) => {
        if (otp.length > 6) return;
        if (otp.length === 6) {
            props.onCodeFilled?.(otp);
        }
        setInputCode(otp);
    };
    return (
        <div className="flex flex-row relative" onClick={onClick?.()}>
            <div className="flex relative center-items w-auto-ns w-100">
                <input
                    type="number"
                    value={inputCode}
                    onChange={(e) => onInputOTP(e.target.value)}
                    className="absolute top-0 h-100 bg-red w-100 o-0 z-1"
                />
                {CodeElements}
            </div>
        </div>
    );
};

OTPInputView.defaultProps = {
    onClick: () => {},
};
