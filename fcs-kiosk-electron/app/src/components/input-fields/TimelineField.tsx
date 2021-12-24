import React from 'react'

export interface ITimelineFieldProps {
  displayTime: string
  options?: object
}
export default function TimelineField({ displayTime, options }: ITimelineFieldProps) {
  return <div {...options}>{displayTime}</div>
}
