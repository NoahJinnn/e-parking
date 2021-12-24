import './CouponListModal.scss'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedKeyboard from 'src/components/animated-keyboard/AnimatedKeyboard'
import BaseInput from 'src/components/input-fields/BaseInput'
import ModalLayout from 'src/components/modals/ModalLayout'
import CouponCloseCorner from 'src/components/svg-components/CouponCloseCorner'
import { useOutsideClickInit } from 'src/services/react-hooks/outside-click-init'
import { useShiftKeyClick } from 'src/services/react-hooks/shift-key-click'
import { onKeyPressHandler } from 'src/services/util-functions/virtual-keyboard-handlers'
import { defaultLayout } from 'src/virtual-keyboard-layout'

import CouponList from './CouponList'

export default function CouponListModal({ onClose }) {
  const { t } = useTranslation()
  const keyboardRef = useRef<HTMLDivElement>()
  const searchInputRef = useRef<HTMLDivElement>(null)
  const [couponSearch, setCouponSearch] = useState('')
  const [couponList, setCouponList] = useState([
    {
      couponId: 1,
      couponImg: null,
      couponCount: 5,
      couponName: 'MÃ GIẢM GIÁ LÊN ĐẾN 50%',
      couponTime: '2 NGÀY',
    },
    {
      couponId: 2,
      couponImg: null,
      couponCount: 3,
      couponName: 'MÃ GIẢM GIÁ LÊN ĐẾN 50%',
      couponTime: '2 NGÀY',
    },
    {
      couponId: 3,
      couponImg: null,
      couponCount: 2,
      couponName: 'MÃ GIẢM GIÁ LÊN ĐẾN 50%',
      couponTime: '2 NGÀY',
    },
  ])
  const [filteredCoupons, setFilteredCoupons]: any[] = useState([])

  const [showVirtualKeyboard, setShowVirtualKeyboard] = useOutsideClickInit(null, null, [keyboardRef, searchInputRef])
  const [keyboardLayoutName, setNewLayout] = useShiftKeyClick()
  // TODO: Fetch coupon list from API
  useEffect(() => {
    setFilteredCoupons(couponList)
  }, [])

  const onKeyPressVirtualKeyboard = (button) => {
    const newInput = onKeyPressHandler(
      button,
      couponSearch,
      () => {
        setShowVirtualKeyboard(false)
      },
      () => {
        setNewLayout(keyboardLayoutName)
      },
      () => {
        setShowVirtualKeyboard(false)
      },
    )
    setCouponSearch(newInput)
  }

  const clearTxt = () => {
    setCouponSearch('')
    setFilteredCoupons(couponList)
  }

  const onSearchClickHandler = () => {
    if (couponSearch) {
      const filteredList = couponList.filter((cp) => {
        let isMatch = false
        for (const cpKey in cp) {
          if (cpKey !== 'couponImg' && cpKey !== 'couponId') {
            if (cp[cpKey].toString().includes(couponSearch)) {
              isMatch = true
              break
            }
          }
        }
        return isMatch
      })
      setFilteredCoupons(filteredList)
    }
  }

  return (
    <div className="coupons-modal">
      <ModalLayout
        header={
          <div>
            <h3 className="f2 mt3 black">{t('CouponTitle')}</h3>
            <CouponCloseCorner onClickHandler={onClose} className="modal__close-corner" />
          </div>
        }
        content={
          <div className="mh3">
            <div className="flex items-center mb3 pa4">
              <BaseInput
                showClearBtn={showVirtualKeyboard}
                label={t('CouponPlaceholder')}
                labelStyle={{ width: '11rem' }}
                value={couponSearch}
                containerRef={searchInputRef}
                onClearTxt={clearTxt}
                containerClassName={'flex-grow-1'}
                autoFocus={true}
              />
              <div className="coupon-search-btn__container w-30 ml3">
                <button onClick={onSearchClickHandler} className="coupon-search-btn w-100">
                  Search
                </button>
              </div>
            </div>
            <CouponList couponList={filteredCoupons} />
            <AnimatedKeyboard
              animationTrigger={showVirtualKeyboard}
              from={{ opacity: 0, transform: 'translateY(100%)' }}
              enter={{ opacity: 1, transform: 'translateY(0%)' }}
              leave={{ opacity: 0, transform: 'translateY(100%)' }}
              animatedStyle={{ position: 'absolute', top: '50%', right: '0', display: 'flex', justifyContent: 'center' }}
              className="w-100 z-1"
              layout={defaultLayout}
              layoutName={keyboardLayoutName}
              keyboardRef={keyboardRef}
              onKeyPress={onKeyPressVirtualKeyboard}
              maxLength={6}
            />
          </div>
        }
      />
    </div>
  )
}
