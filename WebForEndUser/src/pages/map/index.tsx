import './index.scss';

import GoogleMapReact, { ChangeEventValue } from 'google-map-react';
import React, { useState } from 'react';

import { findUnits } from '@apis/map';
import MapDarkConf from '@assets/map/dark.json';
import MapStandardConf from '@assets/map/standard.json';
import { UnitMarker } from '@components/mapMarker';
import { MapSearchBar } from '@components/mapSearchBar';
import { MapUnitInfo } from '@components/mapUnitInfo';
import { MAP_KEY } from '@config';
import { useDarkMode } from '@hooks/darkmode';
import { useMarkersHook } from '@hooks/mapMakers';
import { useDidMount } from '@hooks/utils';
import { Debug } from '@utils/log';

export const MapScreen = () => {
    let centerPosstion: IGeoLocationShort = { lng: 106.720719, lat: 10.798331 };
    const [selectedMark, setSelectedMark] = useState<IMarker>();
    const [markers, addMarkers] = useMarkersHook();
    const [center, setCenter] = useState<IGeoLocationShort>(centerPosstion);
    const dark = useDarkMode();
    const debug = new Debug("Map page");

    useDidMount(async () => {
        const queryMarkers = await findUnits(center.lat, center.lng, 4000);
        addMarkers(queryMarkers.data);
    });

    const getStatus = (curr: number, max: number) => {
        const availPer = curr / max;
        if (availPer === 0) return "unavailable";
        if (availPer < 0.4) return "nearfull";
        return "available";
    };

    const onMapEvent = (event: ChangeEventValue) => {
        const out =
            Math.sqrt(Math.pow(event.center.lat - centerPosstion.lat, 2) + Math.pow(event.center.lng - centerPosstion.lng, 2)) * 100;
        debug.i("onMapEvent", "Output distances", out);
        if (out > 10) {
            centerPosstion = { ...event.center };
            findUnits(centerPosstion.lat, centerPosstion.lng, 3000).then((queryMarkers) => {
                addMarkers(queryMarkers.data);
            });
        }
    };

    return (
        <div className="flex h-100 w-100 relative map">
            {/* <div className="w-30 pa4 bg-white br4 shadow" style={{ height: 20 }}></div> */}
            <div className="flex" style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    defaultZoom={16}
                    defaultCenter={centerPosstion}
                    center={center}
                    options={{ styles: dark ? MapDarkConf : MapStandardConf }}
                    onChange={onMapEvent}
                    bootstrapURLKeys={{ key: MAP_KEY }}>
                    {markers.map((info, idx) => (
                        <UnitMarker
                            onClick={() => {
                                setCenter({ lat: info.latitude, lng: info.longitude });
                                setSelectedMark(info);
                            }}
                            active={selectedMark?.rangeKey === info.rangeKey}
                            key={idx}
                            lat={info.latitude}
                            lng={info.longitude}
                            status={getStatus(info.available_cabin, info.total_cabin)}
                        />
                    ))}
                </GoogleMapReact>
                <MapSearchBar
                    onItemPress={(info) => {
                        setCenter({ lat: info.latitude, lng: info.longitude });
                        setSelectedMark(info);
                    }}
                    showUnits={markers}>
                    {selectedMark && <MapUnitInfo unitMarker={selectedMark} />}
                </MapSearchBar>
            </div>
        </div>
    );
};
