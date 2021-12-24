import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AtmMethodIcon from 'src/components/svg-components/AtmMethodIcon'
import CashMethodIcon from 'src/components/svg-components/CashMethodIcon'
import MobileMethodIcon from 'src/components/svg-components/MobileMethodIcon'
import VisaMethodIcon from 'src/components/svg-components/VisaMethodIcon'
import styled from 'styled-components'

export interface PaymentMethodColumnProps {
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

export default function PaymentMethodColumn({ paymentMethod, setPaymentMethod }: PaymentMethodColumnProps) {
  const { t } = useTranslation()

  const pickPayMethod = (method: string) => {
    setPaymentMethod(method)
  }

  const onMobileMethodPick = () => {
    pickPayMethod('mobile')
  }

  const onVisaMethodPick = () => {
    pickPayMethod('visa')
  }

  const onAtmMethodPick = () => {
    pickPayMethod('atm')
  }

  const onCashMethodPick = () => {
    pickPayMethod('cash')
  }

  const paymentMethodData = [
    {
      onClick: onMobileMethodPick,
      addedClass: `${paymentMethod === 'mobile' ? 'pay-method--active ba' : ''} br3 bt br--top`,
      content: (
        <>
          <MobileMethodIcon className="method-icon" />
          <div className="method-txt">{t('MobileMethod')}</div>
        </>
      ),
    },
    {
      onClick: onVisaMethodPick,
      addedClass: `${paymentMethod === 'visa' ? 'visa-method--active ba' : ''} bt`,
      content: (
        <>
          <VisaMethodIcon className="method-icon" />
          <div className="method-txt">{t('VisaMethod')}</div>
        </>
      ),
    },
    {
      onClick: onAtmMethodPick,
      addedClass: `${paymentMethod === 'atm' ? 'pay-method--active ba' : ''} bt`,
      content: (
        <>
          <AtmMethodIcon className="method-icon" />
          <div className="method-txt">{t('AtmMethod')}</div>
        </>
      ),
    },
    {
      onClick: onCashMethodPick,
      addedClass: `${paymentMethod === 'cash' ? 'pay-method--active ba' : ''} br3 bb bt br--bottom`,
      content: (
        <>
          <CashMethodIcon className="method-icon" />
          <div className="method-txt">{t('CashMethod')}</div>
        </>
      ),
      style: { boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)' },
    },
  ]

  return (
    <div className="payment-methods w-10 flex-column">
      {paymentMethodData.map(({ content, ...methodData }, index) => (
        <PaymentMethod {...methodData} key={index}>
          {content}
        </PaymentMethod>
      ))}
    </div>
  )
}

interface IPaymentMethodProps {
  addedClass?: string
}

const PaymentMethod: any = styled.div.attrs(({ addedClass }: IPaymentMethodProps) => ({
  className: `${addedClass} h-25 br bl b--black-20`,
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  background-color: #f5f3f7;
  &:active {
    box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.2) !important;
    border: none;
    .method-icon,
    .method-txt {
      transform: scale(0.9);
    }
  }
`
