import './index.scss';

import React, { useState } from 'react';
import Img from 'react-cool-img';
import LazyLoad from 'react-lazyload';

import { CountryFlags } from '@assets/country';
import { SVGDropdown } from '@assets/svgc/dropdown';
import { useMountedState } from '@hooks/mount';
import { useDidMount } from '@hooks/utils';

// Declare component props
export interface IPrefixSelectorProps {
    onClick?: () => any;
    classContainer?: string;
    currentPrefixCode?: string;
    onSelectPrefix?: (prefix: IPrefix) => any;
}

export const PrefixSelector: IComponent<IPrefixSelectorProps> = (props) => {
    const { onClick, currentPrefixCode = "VN", classContainer = "w-50" } = props;
    const [currentPrefix, setCurrentPrefix] = useState<IPrefix>();
    const [supportPrefix, setSupportPrefix] = useState<{ [key: string]: IPrefix }>({});
    const [showSelector, setShowSelector] = useState(false);
    const getMounted = useMountedState();

    useDidMount(async () => {
        const prefixs: any = await import("@assets/country/country.json");
        const supportList: { [key: string]: IPrefix } = {};
        for (const flag of Object.keys(CountryFlags)) {
            if (prefixs[flag]) {
                supportList[flag] = prefixs[flag];
            }
        }
        if (getMounted()) {
            setSupportPrefix(supportList);
            onSelectPrefix(supportList[currentPrefixCode.toLocaleUpperCase()] || supportList.VN);
        }
    });

    const onSelectPrefix = (prefix: IPrefix) => {
        onChangeShowPopup(false, prefix);
        props.onSelectPrefix?.(prefix);
    };

    const onChangeShowPopup = (show: boolean = !showSelector, prefix?: IPrefix) => {
        requestAnimationFrame(() => {
            if (prefix) {
                setCurrentPrefix(prefix);
            }
            setShowSelector(show);
        });
    };

    const toggleShowPopup = () => onChangeShowPopup();

    const popUpItems = Object.values(supportPrefix)
        .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((val) => (
            <LazyLoad height={50} key={val.code} scrollContainer={"#scroll-prefix-container"}>
                <div onClick={() => onSelectPrefix(val)} className="flex flex-row w-100 items-center pr3 pl3 pointer dim">
                    <div className="flex w-100 flex-row items-center overflow-hidden">
                        <Img
                            className="br-pill"
                            style={{ width: 24, height: 24, objectFit: "cover" }}
                            src={`/country/${val.code.toLocaleLowerCase()}.png`}
                        />
                        <p className="f5 pl2 hard">{val.name}</p>
                    </div>
                    <div>
                        <p className="f5 fw1 light w-max-content">{val.dial_code}</p>
                    </div>
                </div>
            </LazyLoad>
        ));

    const popUpSelector = (
        <div className="animate__animated animate__fadeInDown animate__faster absolute bg-hard mt1 br3 ba bc-light w-100 flex z-1 overflow-hidden">
            <div className="overflow-auto w-100" id="scroll-prefix-container" style={{ maxHeight: 200 }}>
                {popUpItems}
            </div>
        </div>
    );

    return (
        <div onClick={() => onClick?.()}>
            <div className={`${classContainer} relative`}>
                <div
                    className="flex bg-hard-light bg-med-dark flex-row items-center ba bc-light br3 pr3 pl3 dim pointer"
                    onClick={toggleShowPopup}>
                    <div className="flex w-100 flex-row items-center">
                        <Img
                            className="br-pill"
                            style={{ width: 24, height: 24, objectFit: "cover" }}
                            src={`/country/${currentPrefix?.code}.png`}
                        />
                        <p className="f5 pl2 hard">{currentPrefix?.name}</p>
                    </div>
                    <div>
                        <SVGDropdown width={12} />
                    </div>
                </div>
                {showSelector && popUpSelector}
            </div>
        </div>
    );
};
