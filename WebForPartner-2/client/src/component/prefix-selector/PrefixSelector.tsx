import { CountryFlags } from 'assets/country';
import { SVGDropdown } from 'component/svg/dropdown';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

export const PrefixSelector = (props) => {
  const { onClick, currentPrefixCode = "VN", classContainer = "w-50" } = props;
  const [currentPrefix, setCurrentPrefix] = useState<IPrefix>();
  const [supportPrefix, setSupportPrefix] = useState<{
    [key: string]: IPrefix;
  }>({});
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    (async () => {
      const prefixs: any = await import("assets/country/country.json");
      const supportList: { [key: string]: IPrefix } = {};
      for (const flag of Object.keys(CountryFlags)) {
        if (prefixs[flag]) {
          supportList[flag] = prefixs[flag];
        }
      }
      setSupportPrefix(supportList);
      onSelectPrefix(
        supportList[currentPrefixCode.toLocaleUpperCase()] || supportList.VN
      );
    })();
  }, []);

  const onSelectPrefix = (prefix: IPrefix) => {
    onChangeShowPopup(false, prefix);
    props.onSelectPrefix?.(prefix);
  };

  const onChangeShowPopup = (
    show: boolean = !showSelector,
    prefix?: IPrefix
  ) => {
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
      <LazyLoad
        height={50}
        key={val.code}
        scrollContainer={"#scroll-prefix-container"}
      >
        <div
          onClick={() => onSelectPrefix(val)}
          className="flex flex-row w-100 items-center pr3 pl3 pointer dim"
        >
          <div className="flex w-100 flex-row items-center overflow-hidden">
            <img
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
      <div
        className="overflow-auto w-100"
        id="scroll-prefix-container"
        style={{ maxHeight: 200 }}
      >
        {popUpItems}
      </div>
    </div>
  );

  return (
    <div onClick={() => onClick?.()}>
      <div className={`${classContainer} relative`}>
        <div
          className="flex bg-hard-light bg-med-dark flex-row items-center ba bc-light br3 pr3 pl3 dim pointer"
          onClick={toggleShowPopup}
        >
          <div className="flex w-100 flex-row items-center">
            <img
              className="br-pill"
              style={{ width: 24, height: 24, objectFit: "cover" }}
              src={`/country/${currentPrefix?.code.toLocaleLowerCase()}.png`}
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
