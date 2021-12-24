import './ProgressFooter.scss'

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import ConfirmInformationIcon from 'src/components/svg-components/ConfirmInformationIcon'
import ConfirmLicensePlateIcon from 'src/components/svg-components/ConfirmLicensePlateIcon'
import DollarIcon from 'src/components/svg-components/DollarIcon'
import TickIcon from 'src/components/svg-components/TickIcon'

import IndicatorPoint from './IndicatorPoint'

export interface IProgressFooterProps {
  isCheckin: boolean
}

export default function ProgressFooter({ isCheckin }: IProgressFooterProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const renderProgressStatus = () => {
    switch (pathname) {
      case '/checkout':
      case '/checkout/passcode':
      case '/checkout/passcode/otp':
        return 1
      case '/checkin':
      case '/checkin/car-status':
      case '/checkin/options-card':
      case '/checkin/options-card/passcode':
      case '/checkin/options-card/passcode/otp':
      case '/checkin/options-card/facial':
      case '/checkout/payment':
      case '/checkout/payment/visa':
      case '/checkout/payment/mobile':
        return 2
      case '/checkin/success':
      case '/checkout/rating':
      case '/checkout/success':
        return 3
      default:
        return 1
    }
  }

  const memoizedRenderProgressStatus = useMemo(() => renderProgressStatus(), [pathname])

  const highlightOne = () => memoizedRenderProgressStatus === 1 || memoizedRenderProgressStatus === 2 || memoizedRenderProgressStatus === 3
  const highlightTwo = () => memoizedRenderProgressStatus === 2 || memoizedRenderProgressStatus === 3
  const highlightThree = () => memoizedRenderProgressStatus === 3
  const highlightSymbol = (isHighlight: boolean) => {
    return isHighlight ? '#fff' : '#4D4F40'
  }
  const progressLineStatus = () => {
    if (memoizedRenderProgressStatus === 1) {
      return '0'
    }
    if (memoizedRenderProgressStatus === 2) {
      return '21%'
    }
    if (memoizedRenderProgressStatus === 3) {
      return '40%'
    }
  }

  const indicatorData = [
    {
      symbol: isCheckin ? (
        <ConfirmLicensePlateIcon stroke={highlightSymbol(highlightOne())} className="flex justify-center items-center h-100" />
      ) : (
        <ConfirmInformationIcon fill={highlightSymbol(highlightOne())} className="flex justify-center items-center h-100" />
      ),
      isHighlight: highlightOne(),
      text: isCheckin ? t('LeftFooterInTxt') : t('LeftFooterOutTxt'),
    },
    {
      symbol: isCheckin ? (
        <ConfirmInformationIcon fill={highlightSymbol(highlightTwo())} className="flex justify-center items-center h-100" />
      ) : (
        <DollarIcon fill={highlightSymbol(highlightTwo())} className="flex justify-center items-center h-100" />
      ),
      isHighlight: highlightTwo(),
      text: isCheckin ? t('MidFooterInTxt') : t('MidFooterOutTxt'),
    },
    {
      symbol: (
        <TickIcon
          stroke={highlightSymbol(highlightThree())}
          className="progress-footer__tick-icon flex justify-center items-center h-100"
          strokeWidth={25}
        />
      ),
      isHighlight: highlightThree(),
      text: isCheckin ? t('RightFooterInTxt') : t('RightFooterOutTxt'),
    },
  ]

  return (
    <div className="progress-footer">
      <div className="flex justify-around w-60" style={{ margin: '0 auto' }}>
        <div className="w-40 bb b--black horizontal-line" />
        <div
          style={{
            width: `${progressLineStatus()}`,
          }}
          className="w-40 bb horizontal-line--loaded"
        />

        {indicatorData.map((indicator, index) => (
          <IndicatorPoint {...indicator} key={index} />
        ))}
      </div>
    </div>
  )
}
