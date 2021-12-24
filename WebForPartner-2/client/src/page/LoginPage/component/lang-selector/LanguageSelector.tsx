import './LanguageSelector.scss';

import { SVGDropdown } from 'component/svg/dropdown';
import React, { useState } from 'react';

export const supportLang = [
  { code: "vi", short: "vie", full: "Việt Nam", logo: "vn" },
  { code: "en", short: "eng", full: "English", logo: "us" },
];

export const LanguageSelector = (props) => {
  const { onClick, classContainer = "" } = props;
  const { currentLang = "vi" } = props;
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
      <div
        onClick={() => onselectLang(lang.code)}
        className="flex row items-center pointer w-max-content"
      >
        <img
          alt="Country flag"
          className="br-pill"
          style={{ width: 30, height: 30 }}
          src={`/country/${lang.logo}.png`}
        />
        <p className="pl2 dim bold f5 light w-max-content">{lang.full}</p>
      </div>
      <div className="w-100 pl1 pr1">
        {idx !== supportLang.length - 1 && (
          <div className="w-100 bg-gray o-50" style={{ height: 1 }} />
        )}
      </div>
    </div>
  ));
  return (
    <>
      {showDrop && (
        <div
          onClick={() => setShowDrop(false)}
          className="absolute top-0 left-0 w-100 h-100"
        />
      )}
      <div
        onClick={onClick}
        className={`language__tiny relative w-max-content miw4 ${classContainer}`}
      >
        <div
          onClick={toggePopup}
          className={`flex row items-center pointer mb2 language__selector-${popupPosition}`}
        >
          <h3 className="f4 ma0 hard pa2 w-auto pr3">
            {supportLang
              .filter((val) => val.code === currentLang)[0]
              ?.short.toLocaleUpperCase() || "VIE"}
          </h3>
          <SVGDropdown width={12} />
        </div>
        {showDrop && (
          <div
            className={`language__popup bc-prime absolute animate__animated animate__bounceIn pa3 bg-hard br3 ba language__popup-${popupPosition}`}
          >
            {SupportLang}
          </div>
        )}
      </div>
    </>
  );
};
