import './index.scss';

import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Rating from 'react-rating';
import SwipeableViews from 'react-swipeable-views';

import { getUnitInfo } from '@apis/map';
import { SVGExtraInfo } from '@assets/svgc/extraInfo';
import { LazyLoadImg } from '@components/lazyLoadImg';
import { RippleButton } from '@components/rippleButton';
import { useDarkMode } from '@hooks/darkmode';
import { useDynamicSelectValue } from '@hooks/dynamicValues';
import { useCacheValue, useDidMount } from '@hooks/utils';
import { Debug } from '@utils/log';

export interface IMapUnitInfoProps {
    onClick?: () => any;
    unitMarker: IMarker;
}

export const MapUnitInfo: IComponent<IMapUnitInfoProps> = (props) => {
    const { onClick, unitMarker } = props;
    const [unitInfo, setUnitInfo] = useCacheValue() as [
        IParkingUnit,
        (input: IMarker, key: string, update: (input: IMarker) => Promise<IParkingUnit>) => any,
    ];
    const [slideIndex, setSlideIndex] = useState(0);
    const dynamicVal = useDynamicSelectValue([1600, 720]);
    const isDark = useDarkMode();

    const handleIndexChange = (index: number) => {
        setSlideIndex(index);
    };

    useEffect(() => {
        setUnitInfo(unitMarker, "rangeKey", async (input) => {
            const info = await getUnitInfo(unitMarker.hashKey, unitMarker.rangeKey);
            return info;
        });
    }, [unitMarker]);

    if (unitInfo) {
        return (
            <div onClick={onClick?.()} className="w-100 flex flex-column h-100">
                <div className="w-100 br4 flex-column bg-med-dark bg-hard-light shadow">
                    <div className="w-100 relative br4 overflow-hidden" style={{ height: dynamicVal([160, 196, 210]) }}>
                        <SwipeableViews
                            index={slideIndex}
                            onChangeIndex={handleIndexChange}
                            className="flex w-100 h-100 br4 br--bottom bg-light">
                            {["/images/test/test_1.jpg", "/images/test/test_2.jpg", "/images/test/test_3.jpg"].map((url) => (
                                <div key={url} className="w-100 h-100 overflow-hidden">
                                    <LazyLoadImg className="h-100 w-100 ob-cover overflow-hidden br4 br--top" src={url} />
                                </div>
                            )) || <></>}
                        </SwipeableViews>
                    </div>
                    <div className="flex w-100 flex-column pa3 relative">
                        <h4 className="ma0 hard">{unitInfo.name}</h4>
                        <div className="flex flex-row items-center pt2">
                            <p className="ma0 light thin f5">{unitInfo.address}</p>
                        </div>
                        <div className="absolute right-0 top-0 pr3 map__directIcon pointer">
                            <img alt="Go to" height="100%" className="ob-contain grow" src="/images/circleDirection.png" />
                        </div>
                    </div>
                </div>
                <div className="w-100 br4 pa3 flex flex-row bg-med-dark bg-hard-light shadow mt1">
                    <div className="w-50 flex flex-column">
                        <div className="pa2 bg-med center-items flex flex-column br3">
                            <p className="hard light f6 ma0">Thời gian hoạt động</p>
                            <p className="f6 fw7 hard ma0 pt2">
                                {unitInfo.open_time} - {unitInfo.closed_time}
                            </p>
                        </div>
                        <div className="flex items-center pt2">
                            <SVGExtraInfo height={11} width={11} />
                            <h4 className="hard fw1 ma0 pt1 pl2">{unitInfo.type}</h4>
                        </div>
                    </div>
                    <div className="w-50 h-100 flex flex-column center-items">
                        <h3 className="hard fw7">
                            {unitInfo.available_cabin} / {unitInfo.total_cabin}
                        </h3>
                    </div>
                </div>
                <div className="w-100 br4 pa3 flex flex-row bg-med-dark bg-hard-light shadow mt1">
                    {unitInfo.fee_per_hour_for_day.map((val, idx) => (
                        <div key={idx} className="flex w-100 flex-column center-items">
                            <h4 className="ma0 prime-light hard-dark">{val.name}</h4>
                            <h5 className="ma0 pt1 fw1 prime-light hard-dark">
                                {val.timeStart} - {val.timeEnd}
                            </h5>
                            <p className="ma0 light pt2">
                                <strong>{val.fee.toLocaleString()}</strong> vnd
                            </p>
                        </div>
                    ))}
                </div>
                <div className="w-100 br4 pa3 flex flex-column bg-med-dark bg-hard-light shadow mt1">
                    <div className="flex flex-row w-100 items-center">
                        <h4 className="ma0 hard">Reviews</h4>
                        <div className="flex w-100"></div>
                        <h5 className="ma0 fw1 light grow" style={{ whiteSpace: "nowrap" }}>
                            {"More >"}
                        </h5>
                    </div>
                    <div className="flex flex-row pt2 items-center">
                        <h1 className="ma0 blue pr2">3.5</h1>
                        <Rating
                            initialRating={3.5}
                            readonly
                            fullSymbol={
                                <img
                                    alt="star"
                                    className="icon"
                                    width={28}
                                    height={28}
                                    style={{ objectFit: "cover", objectPosition: "0" }}
                                    src={require("@assets/images/fullStar.png")}
                                />
                            }
                            emptySymbol={<img alt="star" className="icon" width={28} src={require("@assets/images/emptyStar.png")} />}
                        />
                    </div>
                    <RippleButton className="mt2 bg-prime white">Book</RippleButton>
                </div>
            </div>
        );
    }
    return (
        <div className="w-100 flex flex-column h-100">
            <SkeletonTheme color={isDark ? "#202020" : "#fff"} highlightColor={isDark ? "#555" : "#eee"}>
                <div className="overflow-hidden br4 shadow">
                    <Skeleton height={dynamicVal([180, 216, 230])} />
                </div>

                <div className="overflow-hidden br4 mt1 shadow">
                    <Skeleton height={dynamicVal([90, 120, 120])} />
                </div>
                <div className="overflow-hidden br4 mt1 shadow">
                    <Skeleton height={dynamicVal([90, 120, 120])} />
                </div>
                <div className="overflow-hidden br4 mt1 shadow">
                    <Skeleton height={dynamicVal([90, 120, 120])} />
                </div>
            </SkeletonTheme>
        </div>
    );
};
