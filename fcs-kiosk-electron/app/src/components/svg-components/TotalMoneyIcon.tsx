import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function TotalMoneyIcon({ className }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
        <g id="Group_607" data-name="Group 607" transform="translate(-562 -590)">
          <circle id="Ellipse_45" cx="11.5" cy="11.5" r="11.5" fill="#ddd" data-name="Ellipse 45" transform="translate(562 590)" />
          <text
            id="_"
            opacity="0.6"
            fill="#36393B"
            data-name="$"
            fontFamily="SourceSansPro-Bold, Source Sans Pro"
            fontSize="13px"
            fontWeight="700"
            transform="translate(570 605)">
            <tspan x="0" y="0">
              $
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  )
}
