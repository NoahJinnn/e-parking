import './SuccessCard.scss'

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router'
import SuccessIcon from 'src/components/svg-components/SuccessIcon'
import { willDo } from 'src/services/util-functions/delay-action'

import TickIcon from '../svg-components/TickIcon'

export default function SuccessCard() {
  const { pathname } = useLocation()
  const history = useHistory()
  const { t } = useTranslation()

  useEffect(() => {
    // willDo(() => {
    //   history.push('/')
    // }, 3000)
  }, [])

  return (
    <div className="success-card flex flex-column items-center justify-center">
      {/* <SuccessIcon width={150} height={150} /> */}

      <div className="icon-bg-1">
        <div className="icon-bg-2">
          <TickIcon svgClass="succes-icon" stroke="#fff" />
        </div>
      </div>

      <span style={{ color: '#071013' }} className="f1 lh-title mt3 b">
        {pathname === '/checkin/success' ? t('SuccessCheckinTxt') : t('SuccessCheckoutTxt')}
      </span>
      <h1 style={{ color: '#1C3F4A', fontWeight: 500 }} className="f3 lh-copy">
        {t('ThankTxt')}
      </h1>
    </div>
  )
}
