import './index.scss';

import React from 'react';

export interface IUnitMarkerProps extends IGeoLocationShort {
    status?: "available" | "nearfull" | "unavailable";
    onClick?: () => any;
    active?: boolean;
    size?: number;
}

export const UnitMarker: IComponent<IUnitMarkerProps> = (props) => (
    <div onClick={() => props.onClick?.()}>
        <img
            alt={"marker"}
            className={`${props.active ? `map__marker-${props.status}` : ""}`}
            height={props.size || 64}
            src={`images/marker_${props.status || "unavailable"}.png`}
        />
    </div>
);
