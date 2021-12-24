import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import CheckinMenuIcon from 'src/components/svg-components/CheckinMenuIcon'
import CheckoutMenuIcon from 'src/components/svg-components/CheckoutMenuIcon'
import LanguageMenuIcon from 'src/components/svg-components/LanguageMenuIcon'

import MenuItem from './MenuItem'

export default function MenuItemCollection({ isShowMenu, setOpenMoreModal, setIsShowModal }) {
  const { t } = useTranslation()
  const history = useHistory()

  const onOpenMoreModal = () => {
    setOpenMoreModal(true)
  }

  const openModal = () => {
    setIsShowModal(true)
  }

  const onMenuItemClick = (path: string) => () => {
    history.push(path)
  }
  const menusCollection = [
    {
      menuClickHandler: onOpenMoreModal,
      clazz: 'menu__more-item',
      icon: <div className="menu-icon">...</div>,
      name: `More`,
    },
    {
      menuClickHandler: onMenuItemClick('checkout'),
      clazz: 'menu__checkout-item',
      icon: <CheckoutMenuIcon className="menu-icon" />,
      name: t('CheckoutMenu'),
    },
    {
      menuClickHandler: onMenuItemClick('checkin'),
      clazz: 'menu__checkin-item',
      icon: <CheckinMenuIcon className="menu-icon" />,
      name: t('CheckinMenu'),
    },
    {
      menuClickHandler: openModal,
      clazz: 'menu__lang-item',
      icon: <LanguageMenuIcon className="menu-icon" />,
      name: t('LanguageMenu'),
    },
  ]

  const shrinkClass = classNames({
    'menu--shrink': !isShowMenu,
  })

  return (
    <>
      {menusCollection.map(({ menuClickHandler, clazz, icon, name }, index) => (
        <MenuItem onMenuItemClick={menuClickHandler} menuClass={clazz} menuIcon={icon} name={name} shrinkClass={shrinkClass} key={index} />
      ))}
    </>
  )
}
