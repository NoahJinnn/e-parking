import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router'
import { animated, useTransition } from 'react-spring'
import BackIcon from 'src/components/svg-components/BackIcon'
import MoveBackCorner from 'src/components/svg-components/MoveBackCorner'
import { willDo } from 'src/services/util-functions/delay-action'

export default function LeftHeader() {
  const { t } = useTranslation()
  const history = useHistory()
  const { pathname } = useLocation()
  const renderCardTitle = () => {
    switch (pathname) {
      case '/checkin':
      case '/checkin/car-status':
        return t('ConfirmInfoTitle')
      case '/checkin/options-card':
      case '/checkout':
        return t('CheckoutOptionsTitle')
      case '/checkin/options-card/passcode':
      case '/checkout/passcode':
        return t('PhoneNumberTitle')
      case '/checkin/options-card/passcode/otp':
      case '/checkout/passcode/otp':
        return t('OtpTitle')
      case '/checkout/payment':
        return t('ParkingDetailTitle')
      case '/checkout/payment/visa':
        return t('PaymentVisaTitle')
      case '/checkout/payment/mobile':
        return t('PaymentMobile')
      case '/checkout/rating':
        return ''
      default:
        return t('ConfirmInfoTitle')
    }
  }

  const [identifyMethod, setIdentifyMethod] = useState('')
  const [currentPage, setCurrentPage] = useState('')
  useEffect(() => {
    console.log(pathname)
    if (pathname.includes('checkin')) {
      setCurrentPage(t('CheckinTitle'))
    } else {
      setCurrentPage(t('CheckoutTitle'))
    }

    if (pathname.includes('passcode')) {
      setIdentifyMethod('Passcode')
    } else if (pathname.includes('facial')) {
      setIdentifyMethod(t('Facial'))
    } else if (pathname.includes('rating')) {
      setIdentifyMethod(t('RatingTitle'))
    } else {
      setIdentifyMethod('')
    }
  }, [pathname])

  const memoizedRenderCardTitle = useMemo(() => renderCardTitle(), [pathname])
  const transitions = useTransition(memoizedRenderCardTitle, null, {
    config: { mass: 1, tension: 200, friction: 18 },
    from: { opacity: 0, transform: 'translateY(-100%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { display: 'none', transform: 'translateY(100%)' },
  })

  const [isClickPrevent, setIsClickPrevent] = useState(false)
  const onSwitchBack = () => {
    if (isClickPrevent) {
      return
    }
    willDo(() => {
      history.goBack()
      setIsClickPrevent(false)
    }, 50)
    setIsClickPrevent(true)
  }

  return (
    <div className="left-page-header">
      <div className="page-header__corner-title flex">
        <div>
          <div style={{ color: '#071013', fontWeight: 100 }}>{currentPage}</div>
          <div className="__underline-half" />
        </div>
        {identifyMethod && (
          <div className="mh2 pb2">
            <svg height="10" width="8">
              <polygon points="0,0 4,3 0,6" style={{ fill: '#1D1E18', stroke: '#1D1E18', strokeWidth: 1 }} />
            </svg>
          </div>
        )}
        <span style={{ color: '#1D1E18' }}>{identifyMethod}</span>
      </div>
      <div className="back-container" onClick={onSwitchBack}>
        <MoveBackCorner className="page-header__corner" />
        <div className="back-icon__container">
          <BackIcon className="back-icon" />
        </div>
      </div>

      {transitions.map(({ item, key, props }) => (
        <animated.div
          key={key}
          className="page-header__main-title"
          style={{
            ...props,
            marginTop: `${pathname === '/checkout/payment' || pathname === '/checkout/payment/visa' ? '2rem' : '3rem'}`,
          }}>
          {item}
        </animated.div>
      ))}
    </div>
  )
}
