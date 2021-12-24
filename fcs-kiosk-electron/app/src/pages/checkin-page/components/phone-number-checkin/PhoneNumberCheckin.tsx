import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import PhoneNumberCard from 'src/components/phone-card-component/PhoneNumberCard'
import { verifyPhoneNumber } from 'src/services/otp.service'
import { willDo } from 'src/services/util-functions/delay-action'

import { CheckinSessionContext } from '../../CheckinSessionContext'

export default function PhoneNumberCheckin() {
  const history = useHistory()
  const checkinSession = useContext(CheckinSessionContext)
  const onConfirmPhone = async (phone: string, dialCode: string) => {
    try {
      const countryCode = 'vn'
      const httpResponse = await verifyPhoneNumber(phone, countryCode)
      if (httpResponse.status === 200) {
        const respData = JSON.parse(httpResponse.config.data)
        checkinSession.phone = respData.phone
        checkinSession.phoneCode = dialCode
        // tslint:disable-next-line
        console.log('phone sent response', checkinSession)
      }
    } catch (error) {
      // tslint:disable-next-line
      console.error(error)
      throw new Error('Phone verification failed!')
      // TODO: Handle error log
    }

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
