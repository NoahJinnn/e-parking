import './IntroMenu.scss'

import classNames from 'classnames'
import React, { MouseEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import eclipseCloseImg from 'src/assets/pic/eclipse-menu-close.png'
import eclipseOpenImg from 'src/assets/pic/eclipse-menu-open.png'
import { openPrompter } from 'src/components/modals/Prompter'
import CloseBtn from 'src/components/svg-components/CloseBtn'
import HamburgerBtn from 'src/components/svg-components/HamburgerBtn'
import { useDebounceClick } from 'src/services/react-hooks/debounce-click'
import { useOutsideClickInit } from 'src/services/react-hooks/outside-click-init'
import { willDo } from 'src/services/util-functions/delay-action'

import LangModal from '../lang-modal/LangModal'
import MoreModal from '../more-modal/MoreModal'
import SettingModal from '../setting-modal/SettingModal'
import MenuItemCollection from './MenuItemCollection'

let settingCount = 0
interface IIntroMenuProps {
  isShowMenu: boolean
  showMenuHandler: (isShowMenu: boolean) => void
}

function IntroMenu({ isShowMenu, showMenuHandler }: IIntroMenuProps) {
  const { t } = useTranslation()
  const eclipseWrapperRef = useRef<HTMLImageElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const [isShowModal, setIsShowModal] = useState(false)
  const [openMoreModal, setOpenMoreModal] = useState(false)
  const [openSettingModal, setOpenSettingModal] = useState(false)

  useOutsideClickInit(
    null,
    () => {
      showMenuHandler(false)
    },
    [eclipseWrapperRef, menuContainerRef],
  )
  const showMenu = (e: MouseEvent) => {
    e.stopPropagation()
    showMenuHandler(!isShowMenu)
  }
  const [onDebounceClick] = useDebounceClick()
  const onShowMenuClick = (e) => {
    onDebounceClick(showMenu(e))
    settingCount++
    if (settingCount === 4) {
      settingCount = 0
      setOpenSettingModal(true)
    }
  }

  const onCloseLangModal = () => {
    willDo(() => {
      setIsShowModal(false)
    }, 150)
  }

  const menuContainerClass = classNames({
    'menu__icon-container--hide': isShowMenu,
  })

  const closeContainerClass = classNames({
    'menu__icon-container--hide': !isShowMenu,
  })

  const menuBtnClass = classNames({
    'menu__bars-icon': true,
    'menu__bars-icon--rotate': isShowMenu,
  })

  const closeBtnClass = classNames({
    'menu__close-icon': true,
    'menu__close-icon--rotate': !isShowMenu,
  })

  const onCloseMoreModal = () => {
    setOpenMoreModal(false)
  }

  const onCloseSettingModal = () => {
    setOpenSettingModal(false)
  }

  return (
    <div className="intro-menu">
      {isShowModal && <div className="lang__shadow-bg" />}
      {isShowModal && <LangModal onCloseClick={onCloseLangModal} />}
      <MoreModal open={openMoreModal} closeModal={onCloseMoreModal} />
      <SettingModal open={openSettingModal} closeModal={onCloseSettingModal} />

      <img
        className={`eclipse-wrapper ${isShowMenu ? 'hide-wrapper' : ''}`}
        src={eclipseCloseImg}
        alt="MDN Logo"
        onClick={onShowMenuClick}
      />
      <img
        className={`eclipse-wrapper ${!isShowMenu ? 'hide-wrapper' : ''}`}
        ref={eclipseWrapperRef}
        src={eclipseOpenImg}
        alt="MDN Logo"
        onClick={onShowMenuClick}
      />
      <div className="menu-container" ref={menuContainerRef} onClick={onShowMenuClick}>
        <div className="menu">
          <MenuItemCollection isShowMenu={isShowMenu} setOpenMoreModal={setOpenMoreModal} setIsShowModal={setIsShowModal} />

          <div className={menuContainerClass}>
            <HamburgerBtn className={menuBtnClass} />
            <div className="menu__txt">{t('MenuText')}</div>
          </div>
          <div className={closeContainerClass}>
            <CloseBtn width={'4rem'} height={'4rem'} className={closeBtnClass} />
            <div className="close__txt">{t('CloseText')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroMenu
