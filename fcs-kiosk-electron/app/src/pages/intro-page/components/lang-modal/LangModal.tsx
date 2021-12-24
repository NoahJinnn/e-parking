import './LangModal.scss'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'rendition'
import CloseModalIcon from 'src/components/svg-components/CloseModalIcon'

import FlagItem from '../../../../components/flag-item/FlagItem'

export interface ILangModalProps {
  onCloseClick: () => void
}

const initLanguageItems: any = [
  {
    key: 'vi',
    name: 'ViName',
    img: 'https://www.countryflags.io/VN/',
    isEnable: true,
    isShiny: false,
  },
  {
    key: 'en',
    name: 'EnName',
    img: 'https://www.countryflags.io/GB/',
    isEnable: false,
    isShiny: false,
  },
]

export default function LangModal({ onCloseClick }: ILangModalProps) {
  const { t, i18n } = useTranslation()
  const modalTitle = <div className="__title">{t('LangTitle')}</div>
  const [languages, setLanguages] = useState<any>([])

  useEffect(() => {
    const languageItems: string | null = localStorage.getItem('languageItems')

    if (!languageItems || languageItems === '[]') {
      setLanguages(initLanguageItems)
      localStorage.setItem('languageItems', JSON.stringify(initLanguageItems))
    } else {
      setLanguages(JSON.parse(languageItems))
    }
  }, [])

  const setShinyFlag = (langIdx: number) => (isEnable: boolean) => {
    enableShiny(isEnable, langIdx)
  }

  const enableShiny = (isEnable: boolean, index: number) => {
    const newLangList = [...languages.slice(0, index), { ...languages[index], isShiny: isEnable }, ...languages.slice(index + 1)]
    setLanguages(newLangList)
    localStorage.setItem('languageItems', JSON.stringify(newLangList))
  }

  const switchLang = (langKey: string) => () => {
    i18n.changeLanguage(langKey)
    enableLang(langKey)
  }

  const enableLang = (key: string) => {
    const newLangList = languages.map((lang: any) => {
      if (lang.key === key) {
        lang.isEnable = true
      } else {
        lang.isEnable = false
      }
      return lang
    })
    setLanguages(newLangList)
    localStorage.setItem('languageItems', JSON.stringify(newLangList))
  }

  return (
    <div className="lang-modal-container">
      <Modal
        className="lang-modal scroll-style"
        width="40rem"
        titleElement={modalTitle}
        done={onCloseClick}
        primaryButtonProps={{
          margin: '0 auto',
          display: 'none',
        }}>
        <div className="lang-modal__list scroll-style">
          {languages.map((lang: any, idx: any) => (
            <FlagItem key={lang.key} item={lang} onItemSelect={switchLang(lang.key)} setShinyFlag={setShinyFlag(idx)} />
          ))}
        </div>
        <div className="lang-modal__footer">
          <CloseModalIcon onClickHandler={onCloseClick} className="flex justify-center pt4" svgClass="lang-close__btn" />
        </div>
      </Modal>
    </div>
  )
}
