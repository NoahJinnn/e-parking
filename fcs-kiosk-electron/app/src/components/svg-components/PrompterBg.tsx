import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function PrompterBg({ className, stroke = '#fd9a10' }: ISvgComponentProps) {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="388.468" height="133.392" viewBox="0 0 388.468 133.392">
        <defs>
          <style>
            {`.cls-1,
                        .cls-2{fill:none}
                        .cls-1{{stroke:#111;stroke-linecap:round;stroke-linejoin:round;stroke-width:.75px}}
                        .cls-2{stroke:${stroke};stroke-miterlimit:10}`}
          </style>
        </defs>
        <g id="Group_753" transform="translate(.375 .5)">
          <path
            id="Path_1035"
            d="M184.04 202.606a6 6 0 0 0-4.216 1.744 7.656 7.656 0 0 0-15.227.11 7.82 7.82 0 0 0-4.435-1.382 8.314 8.314 0 0 0-7.94 6.7.575.575 0 0 0 .564.683h37.5l.031-.026a6.665 6.665 0 0 0-6.277-7.829z"
            className="cls-1"
            transform="translate(-109.523 -166.545)"
          />
          <path
            id="Path_1036"
            d="M296.816 186.367a6 6 0 0 1 4.217 1.745 7.656 7.656 0 0 1 15.227.108 7.817 7.817 0 0 1 4.434-1.38 8.314 8.314 0 0 1 7.941 6.694.576.576 0 0 1-.564.683h-37.5l-.031-.026a6.666 6.666 0 0 1 6.276-7.824z"
            className="cls-1"
            transform="translate(-34.057 -175.41)"
          />
          <path
            id="Path_1037"
            d="M323.15 215.093a4.175 4.175 0 1 1-4.175-4.175 4.175 4.175 0 0 1 4.175 4.175z"
            className="cls-2"
            transform="translate(-20.769 -159.25)"
          />
          <path
            id="Path_1038"
            d="M371.789 261.91a4.176 4.176 0 1 1-4.177-4.175 4.176 4.176 0 0 1 4.177 4.175z"
            className="cls-2"
            transform="translate(5.782 -133.694)"
          />
          <path
            id="Path_1039"
            d="M206.192 183.4a5.905 5.905 0 1 1-5.905-5.905 5.905 5.905 0 0 1 5.905 5.905z"
            className="cls-2"
            transform="translate(-86.502 -177.495)"
          />
          <path
            id="Path_1040"
            d="M144.666 250.183a4.176 4.176 0 1 1-4.177-4.175 4.177 4.177 0 0 1 4.177 4.175z"
            className="cls-2"
            transform="translate(-118.2 -140.095)"
          />
          <path id="Line_8" d="M0 0L22.714 0" className="cls-1" transform="translate(325.935 41.003)" />
          <path id="Line_9" d="M0 0L27.862 0" className="cls-1" transform="translate(359.855 50.089)" />
          <path id="Line_10" d="M0 0L6.852 0" className="cls-1" transform="translate(345.886 50.089)" />
          <path id="Line_11" d="M0 0L22.714 0" className="cls-1" transform="translate(30.475 3.875)" />
          <path id="Line_12" d="M0 0L25.447 0" className="cls-1" transform="translate(16.384 12.96)" />
          <path id="Line_13" d="M0 0L8.165 0" className="cls-1" transform="translate(0 12.96)" />
        </g>
      </svg>
    </div>
  )
}
