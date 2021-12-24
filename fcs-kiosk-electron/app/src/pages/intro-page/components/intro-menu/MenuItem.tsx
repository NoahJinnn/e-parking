import React from 'react'

export interface MenuItem {
  onMenuItemClick: any
  menuClass: string
  shrinkClass: string
  name: string
  menuIcon: React.ReactNode
}

export default function MenuItem({ onMenuItemClick, menuClass, shrinkClass, name, menuIcon }: MenuItem) {
  return (
    <div onClick={onMenuItemClick} className={menuClass + ' ' + shrinkClass}>
      <div className="menu-label">{name}</div>
      <div className="icon-container">{menuIcon}</div>
    </div>
  )
}
