import React from 'react'
import Popup from 'reactjs-popup'

export default function BasePopup({ children, ...props }) {
  return (
    <Popup contentStyle={{ border: 0, padding: 0, borderRadius: '15px' }} overlayStyle={{ top: '-50%' }} {...props}>
      {children}
    </Popup>
  )
}
