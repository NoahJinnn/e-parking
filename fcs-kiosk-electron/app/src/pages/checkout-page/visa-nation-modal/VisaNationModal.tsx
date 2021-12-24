import React, { useState } from 'react'
import ModalLayout from 'src/components/modals/ModalLayout'
import FlagItem from 'src/components/flag-item/FlagItem'
import './VisaNationModal.scss'

import { useTranslation } from 'react-i18next'

export default function VisaNationModal() {
  const { t } = useTranslation()
  const [nationItems, setNationItems] = useState([
    {
      key: 'vi',
      name: 'NaVi',
      img: 'https://www.countryflags.io/VN/',
      isEnable: true,
      isShiny: false,
    },
    {
      key: 'en',
      name: 'NaEn',
      img: 'https://www.countryflags.io/GB/',
      isEnable: false,
      isShiny: false,
    },
    {
      key: 'cn',
      name: 'NaCn',
      img: 'https://www.countryflags.io/CN/',
      isEnable: false,
      isShiny: false,
    },
    {
      key: 'jp',
      name: 'NaJp',
      img: 'https://www.countryflags.io/JP/',
      isEnable: false,
      isShiny: false,
    },
  ])

  const setShinyFlag = (naIdx: number) => (isEnable: boolean) => {
    enableShiny(isEnable, naIdx)
  }

  const enableShiny = (isEnable: boolean, index: number) => {
    const newNaList = [...nationItems.slice(0, index), { ...nationItems[index], isShiny: isEnable }, ...nationItems.slice(index + 1)]
    setNationItems(newNaList)
  }

  const switchNation = (naKey: string) => () => {
    enableNation(naKey)
  }

  const enableNation = (key: string) => {
    const newNaList = nationItems.map((item: any) => {
      if (item.key === key) {
        item.isEnable = true
      } else {
        item.isEnable = false
      }
      return item
    })
    setNationItems(newNaList)
  }

  return (
    <ModalLayout
      header={<div className="nation-modal__title">{t('NationModalHeader')}</div>}
      content={
        <div className="flex flex-column scroll-type pa3" style={{ maxHeight: '20rem' }}>
          {nationItems.map((na: any, idx: any) => (
            <FlagItem key={na.key} item={na} onItemSelect={switchNation(na.key)} setShinyFlag={setShinyFlag(idx)} />
          ))}
        </div>
      }
    />
  )
}
