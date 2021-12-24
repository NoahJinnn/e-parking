import './index.scss';

import React, { useEffect, useState } from 'react';

import { delay } from '@utils/tools';

// Declare component props
export interface IControllableSwipeViewProps {
    onClick?: () => any;
    index?: number;
    classContainer?: string;
    components: React.ReactElement[];
}
export const ControllableSwipeView: IComponent<IControllableSwipeViewProps> = (props) => {
    const { onClick, classContainer = "" } = props;
    const [crrIndex, setCrrIndex] = useState(0);
    const [hide, setHide] = useState(false);
    useEffect(() => {
        const changeScreen = async () => {
            if (crrIndex !== props.index) {
                setHide(true);
                await delay(500);
                setCrrIndex(props.index || 0);
                setHide(false);
            }
        };
        changeScreen();
    }, [props.index, crrIndex]);
    return (
        <div className={`${classContainer} pa1`}>
            <div
                className={`flex animate__animated animate__faster ${hide ? "animate__fadeOutLeft" : "animate__fadeInRight"}`}
                onClick={onClick?.()}>
                {props.components?.[crrIndex]}
            </div>
        </div>
    );
};
