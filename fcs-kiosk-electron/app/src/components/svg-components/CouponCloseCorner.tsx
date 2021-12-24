import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function CouponCloseCorner({ className, onClickHandler }: ISvgComponentProps) {
  return (
    <div onClick={onClickHandler} className={className}>
      <svg width="100" height="67" viewBox="0 0 122 81">
        <defs>
          <linearGradient id="ccc-linear-gradient" x1="-.296" x2=".647" y1=".392" y2=".855" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#fc946e" />
            <stop offset="1" stopColor="#de2f2f" />
          </linearGradient>
          <clipPath id="ccc-cp">
            <path id="Rectangle_100" fill="#fff" stroke="#707070" d="M0 0h107a15 15 0 0 1 15 15v66H0V0z" data-name="Rectangle 100" />
          </clipPath>
          <style>{`.cls-coupon-cc\{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:3px\}`}</style>
        </defs>
        <g id="Group_597" data-name="Group 597" transform="translate(-1599)">
          <g id="Mask_Group_9" clipPath="url(#ccc-cp)" data-name="Mask Group 9" transform="translate(1599)">
            <g id="Floor" transform="translate(-.008 -102.889)">
              <circle id="Floor-2" cx="91.785" cy="91.785" r="91.785" fill="url(#ccc-linear-gradient)" data-name="Floor" />
            </g>
          </g>
          <g id="ccc-gross" data-name="Group 581" opacity="0.6" transform="translate(1659.59 24.097)">
            <path
              id="Path_898"
              d="M19469.8 100l-19.945 19.945"
              className="cls-coupon-cc"
              data-name="Path 898"
              transform="translate(-19449.857 -100)"
            />
            <path
              id="Path_899"
              d="M19449.857 100l19.945 19.945"
              className="cls-coupon-cc"
              data-name="Path 899"
              transform="translate(-19449.857 -100)"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
