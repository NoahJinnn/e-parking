import { useCallback, useEffect, useState } from 'react';

/**
 * Make dynamic value base on client screen status
 */
export const useDynamicSelectValue = (breakPoints = [960, 480]) => {
    const [sel, setSel] = useState(0);

    const handleResize = useCallback(() => {
        if (window.innerWidth > breakPoints[0]) {
            setSel(2);
        } else if (window.innerWidth <= breakPoints[0] && window.innerWidth > breakPoints[1]) {
            setSel(1);
        } else {
            setSel(0);
        }
    }, [breakPoints]);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    /**
     * Return size base on screen status
     * @param values [small,medium,large] dynamic size to be used
     */
    const getValue = (values: [number, number, number]) => {
        return values[sel];
    };
    return getValue;
};
