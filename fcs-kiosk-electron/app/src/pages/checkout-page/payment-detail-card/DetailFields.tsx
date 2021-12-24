import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BaseField from 'src/components/input-fields/BaseField'
import TimelineField from 'src/components/input-fields/TimelineField'
import LicensePlateIcon from 'src/components/svg-components/LicensePlateIcon'
import TimeCheckinIcon from 'src/components/svg-components/TimeCheckinIcon'
import TimeCheckoutIcon from 'src/components/svg-components/TimeCheckoutIcon'
import TotalMoneyIcon from 'src/components/svg-components/TotalMoneyIcon'

export default function DetailFields() {
  const { t } = useTranslation()
  const [amountBeforeSaled, setAmountBeforeSaled] = useState('100,000')
  const [amountAfterSaled, setAmountAfterSaled] = useState('70,000')

  const detailFields = [
    {
      titleIcon: <LicensePlateIcon className="input__title-icon" />,
      title: t('LicensePlate'),
      body: '51B-12345',
    },
    {
      titleIcon: <TimeCheckinIcon className="input__title-icon" />,
      title: t('CheckinTime'),
      body: <TimelineField displayTime={'12:30 25/06/2020'} />,
    },
    {
      titleIcon: <TimeCheckoutIcon className="input__title-icon" />,
      title: t('CheckoutTime'),
      body: <TimelineField displayTime={'12:30 25/06/2020'} />,
    },
    {
      titleIcon: <TotalMoneyIcon className="input__title-icon" />,
      title: t('TotalTitle'),
      body: (
        <div className="flex items-center">
          <span className="f4 strike moon-gray mr3">{amountBeforeSaled}</span>
          <span className="flex-grow-1">{amountAfterSaled}</span>
          <span className="b">VND</span>
        </div>
      ),
    },
  ]

  return (
    <>
      {detailFields.map((field, index) => (
        <BaseField className="ma3" key={index} {...field} />
      ))}
    </>
  )
}
