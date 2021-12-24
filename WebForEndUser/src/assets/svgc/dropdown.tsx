import React from 'react';

export const SVGDropdown: ISvgComponent = ({ viewBox = "0 0 15 9", fill = "#787191", width = "100%", height = "100%", opacity = "1" }) => (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7.5 7L14 1" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
);
