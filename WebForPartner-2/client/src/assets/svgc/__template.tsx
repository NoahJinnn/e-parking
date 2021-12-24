import React from 'react';

export const SVGTemplate = ({
  viewBox = "0 0 48 48",
  fill = "white",
  width = "100%",
  height = "100%",
  opacity = "1",
}) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  ></svg>
);
