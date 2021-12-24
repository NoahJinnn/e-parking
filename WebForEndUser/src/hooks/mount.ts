import { useEffect, useRef } from 'react';

/**
 * Get mounted states of current component that init this hook
 */
export const useMountedState = () => {
    // TODO: Refactor this some day
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    const getMounted = () => mounted.current;
    return getMounted;
};
