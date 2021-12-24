import './index.scss';

import React, { useEffect, useState } from 'react';

import { isOnlyDigit } from '@utils/regex';

// Declare component props
export interface IInputWithPrefixProps {
    onClick?: () => any;
    classContainer?: string;
    currPrefix?: string;
    onPhoneInput?: (pNumber: string) => any;
}

export const InputWithPrefix: IComponent<IInputWithPrefixProps> = (props) => {
    const { onClick, classContainer = "w-50", currPrefix = "+84" } = props;
    const [pass, setPass] = useState(false);
    const [phone, setPhone] = useState("");
    useEffect(() => {}, []);
    const onPhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isOnlyDigit.test(e.target.value) || e.target.value === "") {
            setPhone(e?.target.value);
            props.onPhoneInput?.(e?.target.value || "");
            if (e.target.value.length > 8) {
                requestAnimationFrame(() => {
                    setPass(true);
                });
            } else {
                requestAnimationFrame(() => {
                    setPass(false);
                });
            }
        }
    };
    return (
        <div className={`${classContainer}`} onClick={onClick?.()}>
            <div className="flex relative br3 center-items overflow-hidden flex-row pa2 bg-hard-light bg-med-dark ba bc-light">
                <div className="flex justify-center h-100 pt2 pb2">
                    <p className="f5 pl1 pr3 fw7 hard ma0 w-max-content">{currPrefix}</p>
                    <div className="bg-light" style={{ width: "1px" }} />
                </div>
                <input
                    type="tel"
                    value={phone}
                    onChange={onPhoneInput}
                    placeholder="Phone here"
                    className="w-100 h-100 bn bg-transparent hard f5 pl2 pr2 outline-transparent"
                />
                {pass && (
                    <div className="w-10 h-100 flex center-items animate__animated animate__bounceIn">
                        <div className="flex bg-green br-100 center-items" style={{ width: "24px", height: "24px" }}>
                            <i className="white f7 fas fa-check" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
