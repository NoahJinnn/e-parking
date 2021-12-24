import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function CloseModalIcon({ className, onClickHandler, svgClass }: ISvgComponentProps) {
  return (
    <div className={className} onClick={onClickHandler}>
      <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 126 126">
        <g>
          <g stroke="#e5e5e5" strokeWidth="5px">
            <g fill="none" transform="translate(-162 -606) translate(162 606)">
              <circle cx="63" cy="63" r="63" stroke="none" />
              <circle cx="63" cy="63" r="60.5" />
            </g>
            <path
              fill="none"
              strokeLinecap="round"
              d="M-2887.411 2508.344l44.819 44.819"
              transform="translate(-162 -606) translate(162 606) translate(2927.549 -2468.654)"
            />
            <path
              fill="#fff"
              strokeLinecap="round"
              d="M-2842.591 2508.344l-44.819 44.819"
              transform="translate(-162 -606) translate(162 606) translate(2927.549 -2468.654)"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
