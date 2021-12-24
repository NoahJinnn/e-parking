import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function SuccessPrompterIcon({ className }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="147.101" height="147.101" viewBox="0 0 147.101 147.101">
        <defs>
          <linearGradient id="v0p9bdm6la" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#4192ff" />
            <stop offset="1" stop-color="#41ccff" />
          </linearGradient>
        </defs>
        <circle cx="52.008" cy="52.008" r="52.008" fill="url(#v0p9bdm6la)" transform="rotate(-45 88.783 36.775)" />
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="7px"
          d="M4375.948 917.945l19.928 16.441 22.98-30.586"
          transform="translate(-4324.307 -845.428)"
        />
      </svg>
    </div>
  )
}
