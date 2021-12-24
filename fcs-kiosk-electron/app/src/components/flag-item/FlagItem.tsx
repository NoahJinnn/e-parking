import React from 'react'
import TickIcon from 'src/components/svg-components/TickIcon'
import './FlagItem.scss'

import { createRipples } from 'react-ripples'
import { useTranslation } from 'react-i18next'

const MyRipples: any = createRipples({
  during: 800,
  color: '#E0E0E0',
})

interface IFlagItem {
  key: string
  name: string
  img: string
  isEnable: boolean
  isShiny: boolean
}

export interface FlagItemProps {
  item: IFlagItem
  onItemSelect: () => void
  setShinyFlag: (isEnable: boolean) => void
}

export default function FlagItem({ item, onItemSelect, setShinyFlag }: FlagItemProps) {
  const { t } = useTranslation()

  const setShinyFlagHandler = (isShiny: boolean) => () => {
    setShinyFlag(isShiny)
  }

  return (
    <MyRipples
      className="flagitem-modal__ripple"
      key={item.key}
      onMouseEnter={setShinyFlagHandler(true)}
      onMouseLeave={setShinyFlagHandler(false)}
      onClick={onItemSelect}>
      <div className="flagitem-modal__item">
        <img alt="404 Not Found" style={{ width: '36px', height: '36px' }} src={`${item.img}${item.isShiny ? 'shiny' : 'flat'}/64.png`} />
        <div className="flagitem-name text-md">{t(item.name)}</div>
        <TickIcon className={`flagitem-tick ${!item.isEnable ? 'flagitem-tick--hide' : ''}`} stroke="#13d5cd" />
      </div>
    </MyRipples>
  )
}
