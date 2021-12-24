import React from 'react'
import { useHistory } from 'react-router'
import { willDo } from 'src/services/util-functions/delay-action'
import PhoneNumberCard from 'src/components/phone-card-component/PhoneNumberCard'

export default function PhoneNumberCheckout() {
  const history = useHistory()

  const onConfirmPhone = () => {
    willDo(() => {
      history.push(`${history.location.pathname}/otp`)
    }, 200)
  }

  return (
    <div>
      <PhoneNumberCard onConfirmPhone={onConfirmPhone} />
    </div>
  )
}
