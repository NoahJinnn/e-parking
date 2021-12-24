import { useRecoilState } from 'recoil';

import { mapMarkerState } from '@states/map';

export const useMarkersHook = (): [IMarker[], (input: IMarker[]) => void] => {
    const [markers, setMarkers] = useRecoilState(mapMarkerState);
    const availableRange: string[] = [];
    const addMarkers = (input: IMarker[]) => {
        if (input) {
            const filtered = input.filter((val) => {
                if (availableRange.includes(val.rangeKey)) {
                    return false;
                }
                availableRange.push(val.rangeKey);
                return true;
            });
            setMarkers([...filtered, ...markers]);
        }
    };
    return [markers, addMarkers];
};
