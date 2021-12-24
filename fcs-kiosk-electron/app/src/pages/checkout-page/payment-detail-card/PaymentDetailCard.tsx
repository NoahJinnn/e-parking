import './PaymentDetailCard.scss'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import Popup from 'reactjs-popup'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'
import BaseField from 'src/components/input-fields/BaseField'
import BaseInput from 'src/components/input-fields/BaseInput'
import TimelineField from 'src/components/input-fields/TimelineField'
import AtmMethodIcon from 'src/components/svg-components/AtmMethodIcon'
import CashMethodIcon from 'src/components/svg-components/CashMethodIcon'
import LicensePlateIcon from 'src/components/svg-components/LicensePlateIcon'
import MobileMethodIcon from 'src/components/svg-components/MobileMethodIcon'
import QRIcon from 'src/components/svg-components/QRIcon'
import TimeCheckinIcon from 'src/components/svg-components/TimeCheckinIcon'
import TimeCheckoutIcon from 'src/components/svg-components/TimeCheckoutIcon'
import TotalMoneyIcon from 'src/components/svg-components/TotalMoneyIcon'
import VisaMethodIcon from 'src/components/svg-components/VisaMethodIcon'
import { willDo } from 'src/services/util-functions/delay-action'
import styled from 'styled-components'

import CouponListModal from '../coupon-list-modal/CouponListModal'
import CouponQrScanner from '../coupon-qr-scanner/CouponQrScanner'
import PolicyModal from '../policy-modal/PolicyModal'
import DetailFields from './DetailFields'
import PaymentMethodColumn from './PaymentMethodColumn'

// TODO: Lift component states
export default function PaymentDetailCard() {
  const { t } = useTranslation()
  const history = useHistory()

  const [couponCode, setCouponCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isAgree, setIsAgree] = useState(false)

  const onConfirmPaymentDetail = () => {
    willDo(() => {
      history.push(`/checkout/payment/${paymentMethod}`)
    }, 200)
  }

  return (
    <div className="flex flex-column items-center">
      <div className="payment-details w-100 flex justify-center">
        <div className="payment-details__body w-40 mr4">
          <div className="card__border ph3 pv1">
            <DetailFields />
            <div className="flex items-center mb3 mh3">
              <Popup
                contentStyle={{ border: 0, padding: 0, borderRadius: '15px' }}
                overlayStyle={{ top: '-50%' }}
                trigger={
                  <div className="mr3 flex-grow-1">
                    <BaseInput
                      label={t('CouponPlaceholder')}
                      containerClassName="flex-grow-1"
                      inputClassName="coupon-input"
                      labelStyle={{ minWidth: '12.35rem' }}
                      hasSeparator={false}
                    />
                  </div>
                }
                modal={true}
                closeOnDocumentClick={false}>
                {(close) => <CouponListModal onClose={close} />}
              </Popup>
              <Popup
                contentStyle={{ border: 0, padding: 0, borderRadius: '15px' }}
                overlayStyle={{ top: '-30%' }}
                trigger={
                  <div className="qr-icon__container">
                    <QRIcon className="qr-icon" />
                  </div>
                }
                modal={true}
                closeOnDocumentClick={false}>
                {(close) => <CouponQrScanner onClose={close} />}
              </Popup>
              <Popup
                contentStyle={{ border: 0, padding: 0, borderRadius: '15px' }}
                overlayStyle={{ top: '-30%' }}
                open={true}
                closeOnDocumentClick={false}>
                {(close) => <PolicyModal onClose={close} isAgree={isAgree} setIsAgree={setIsAgree} />}
              </Popup>
            </div>
            <div className="flex justify-center mb3 mh3">
              <PrimaryBtn disabled={!paymentMethod || !isAgree} label={t('NextBtnTxt')} onClickHandler={onConfirmPaymentDetail} />
            </div>
          </div>
        </div>
        <PaymentMethodColumn paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </div>
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
