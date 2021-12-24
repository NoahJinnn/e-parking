import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function PasscodeIcon({ className, width, height }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 110.351 189.961" fill="#36393B" opacity="0.6">
        <g id="icon-passcode">
          <path
            id="Path_498"
            data-name="Path 498"
            d="M104.855,0H20.165A12.866,12.866,0,0,0,7.334,12.831V177.125a12.871,12.871,0,0,0,12.831,12.836h84.69a12.863,12.863,0,0,0,12.831-12.831V12.831A12.866,12.866,0,0,0,104.855,0ZM48.963,9.248H76.057a1.555,1.555,0,0,1,0,3.11H48.963a1.555,1.555,0,0,1,0-3.11Zm13.547,174.3a6.418,6.418,0,1,1,6.415-6.421A6.415,6.415,0,0,1,62.51,183.546Zm46.247-17.33H16.262V20.348h92.495Z"
            transform="translate(-7.334)"
          />
        </g>
      </svg>
    </div>
  )
}
