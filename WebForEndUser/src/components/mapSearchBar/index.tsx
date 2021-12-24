import './index.scss';

import React, { ReactElement, useEffect } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import { SVGSearch } from '@assets/svgc/search';
import { useDynamicSelectValue } from '@hooks/dynamicValues';
import { useTypedTranslation } from '@languages/typedTranslation';
import { Debug } from '@utils/log';

export interface IMapSearchBar {
    containerClass?: string;
    showUnits?: IMarker[];
    onItemPress?: (info: IMarker) => any;
    onSearch?: (input: string) => any;
    extraFloatComponent?: IComponent | ReactElement;
}

export const MapSearchBar: IComponent<IMapSearchBar> = (props) => {
    const { containerClass = "", showUnits = [] } = props;
    const dynamicVal = useDynamicSelectValue([1600, 720]);
    const debug = new Debug("MapSearchBar");
    const { t } = useTypedTranslation();

    // Search States
    let searchInput = "";
    const onSearch = () => {
        debug.i("onSearch", "Trigger search content: ", searchInput);
        props.onSearch?.(searchInput);
    };
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    useEffect(() => {}, []);
    return (
        <div
            className={`absolute top-0 left-0 pa4 flex flex-row ${containerClass}`}
            style={{
                transform: `scale(${dynamicVal([0.9, 0.95, 1])}) translate(-${dynamicVal([10, 5, 0])}%, -${dynamicVal([8, 5, 0])}%)`,
            }}>
            <div className="flex flex-column" style={{ width: `${dynamicVal([25, 30, 35])}rem` }}>
                <div
                    className="animate__animated animate__fadeInDown w-100 shadow br4 overflow-hidden flex flex-row bg-med-dark bg-hard-light"
                    style={{ height: "3rem" }}>
                    <input
                        onChange={(e) => (searchInput = e.target.value)}
                        type="text"
                        onKeyDown={onKeyDown}
                        placeholder={t("mapSearchUnits")}
                        className="w-100 h-100 flex bn pr3 pl3 outline-transparent bg-transparent hard"
                    />
                    <div onClick={onSearch} className="flex pa2 pr3 pl3 center-items justify-center pointer grow">
                        <SVGSearch width={24} />
                    </div>
                </div>
                <div className="mt2 w-100">
                    <ScrollMenu
                        data={showUnits.map((val, idx) => (
                            <div
                                key={idx}
                                onClick={() => props.onItemPress?.(val)}
                                className={`br4 pa3 bg-purple-light pointer grow ${idx !== 0 ? "ml2" : ""}`}
                                style={{ animationDelay: `${100 * (idx + 1)}ms` }}>
                                <p className="ma0 f5 white" style={{ width: "max-content" }}>
                                    {val.name}
                                </p>
                            </div>
                        ))}
                        alignCenter={false}
                        hideArrows={true}
                    />
                </div>
                <div className="mt2 w-100 flex">{props.children}</div>
            </div>
            <div className="flex ml2">{props.extraFloatComponent}</div>
        </div>
    );
};
