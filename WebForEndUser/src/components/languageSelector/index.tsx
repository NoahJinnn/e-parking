import './index.scss';

import React, { useState } from 'react';

import { CountryFlags } from '@assets/country';
import { SVGDropdown } from '@assets/svgc/dropdown';

// Declare component props
export interface ILanguageFormat {
    code: TSupportLanguage;
    short: string;
    full: string;
    logo: keyof typeof CountryFlags;
}
export interface ILanguageSelectorProps {
    onClick?: () => any;
    onSelectLang?: (lang: string) => any;
    currentLang?: TSupportLanguage;
    supportLang: ILanguageFormat[];
    classContainer?: string;
    popupPosition?: "top" | "bottom";
}

export const LanguageSelector: IComponent<ILanguageSelectorProps> = (props) => {
    const { onClick, classContainer = "" } = props;
    const { currentLang = "vi" } = props;
    const { supportLang = [] } = props;
    const { popupPosition = "bottom" } = props;
    const [showDrop, setShowDrop] = useState(false);
    const onselectLang = (lang: string) => {
        onChangeShowPopup(false);
        props.onSelectLang?.(lang);
    };
    const onChangeShowPopup = (show: boolean = !showDrop) => {
        requestAnimationFrame(() => {
            setShowDrop(show);
        });
    };
    const toggePopup = () => onChangeShowPopup();
    const SupportLang = supportLang.map((lang, idx) => (
        <div key={lang.code} className="flex-column flex">
            <div onClick={() => onselectLang(lang.code)} className="flex row items-center pointer w-max-content">
                <img alt="Country flag" className="br-pill" style={{ width: 30, height: 30 }} src={`/country/${lang.logo}.png`} />
                <p className="pl2 dim bold f5 light w-max-content">{lang.full}</p>
            </div>
            <div className="w-100 pl1 pr1">
                {idx !== supportLang.length - 1 && <div className="w-100 bg-gray o-50" style={{ height: 1 }} />}
            </div>
        </div>
    ));
    return (
        <>
            {showDrop && <div onClick={() => setShowDrop(false)} className="absolute top-0 left-0 w-100 h-100" />}
            <div onClick={onClick} className={`language__tiny relative w-max-content miw4 ${classContainer}`}>
                <div onClick={toggePopup} className={`flex row items-center pointer mb2 language__selector-${popupPosition}`}>
                    <h3 className="f4 ma0 hard pa2 w-auto pr3">
                        {supportLang.filter((val) => val.code === currentLang)[0]?.short.toLocaleUpperCase() || "VIE"}
                    </h3>
                    <SVGDropdown width={12} />
                </div>
                {showDrop && (
                    <div
                        className={`language__popup bc-prime absolute animate__animated animate__bounceIn pa3 bg-hard br3 ba language__popup-${popupPosition}`}>
                        {SupportLang}
                    </div>
                )}
            </div>
        </>
    );
};
