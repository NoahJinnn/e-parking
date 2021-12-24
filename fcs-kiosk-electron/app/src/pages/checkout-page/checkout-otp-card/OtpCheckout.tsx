import React from 'react'
import { useHistory } from 'react-router'
import { willDo } from 'src/services/util-functions/delay-action'
import OtpCard from 'src/components/otp-card-component/OtpCard'

export default function OtpCheckout() {
  const history = useHistory()
  const onCheckoutOtp = (otp: string) => {
    willDo(() => {
      history.push('/checkout/payment')
    }, 200)
  }
  return (
    <div>
      <OtpCard onConfirmOtp={onCheckoutOtp} />
    </div>
  )
}
