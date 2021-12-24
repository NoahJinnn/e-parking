import { atom } from 'recoil';

/**
 * App loaded state key
 */
const MAP_MARKER_KEY = "map_marker_key";
/**
 * App loaded state, true if app is loaded
 */
export const mapMarkerState = atom<IMarker[]>({
    key: MAP_MARKER_KEY,
    default: [],
});
