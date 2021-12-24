import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import OtpCard from 'src/components/otp-card-component/OtpCard'
import { verifyOTP } from 'src/services/otp.service'
import { willDo } from 'src/services/util-functions/delay-action'
import { v4 as uuid } from 'uuid'

import { CheckinSessionContext } from '../../CheckinSessionContext'

declare global {
  interface Window {
    electronApi: any
  }
}

export default function OtpCheckin() {
  const history = useHistory()
  const checkinSession = useContext(CheckinSessionContext)
  const onCheckinOtp = async (otpCode: string) => {
    try {
      const countryCode = 'vn'
      const phone = checkinSession.phone_number

      const httpResponse = await verifyOTP(otpCode, phone, countryCode)
      if (httpResponse.status === 200) {
        // TODO: Implement update DB and finish OTP checkin flow
        checkinSession.id = uuid()
        window.electronApi.invokeInsertParkingSession(checkinSession)
        // tslint:disable-next-line
        console.log('otp sent response', httpResponse)
      }
    } catch (error) {
      // tslint:disable-next-line
      console.error(error)
      throw new Error('Phone verification failed!')
      // TODO: Handle error log
    }

    willDo(() => {
      history.push('/checkin/success')
    }, 200)
  }
  return (
    <div>
      <OtpCard onConfirmOtp={onCheckinOtp} />
    </div>
  )
}
