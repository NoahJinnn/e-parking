import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import OptionsList from 'src/components/options-card-component/OptionsList'
import { useDebounceClick } from 'src/services/react-hooks/debounce-click'
import { willDo } from 'src/services/util-functions/delay-action'

import { CheckinSessionContext } from '../../CheckinSessionContext'

export default function CheckinOptionsCard() {
  const history = useHistory()
  const [onDebounceClick] = useDebounceClick()
  const checkinSession = useContext(CheckinSessionContext)

  const onPasscodeClickHandle = () => {
    console.log(checkinSession)
    willDo(() => {
      history.push(`${history.location.pathname}/passcode`)
    }, 200)
  }

  const onFacialClickHandle = () => {
    console.log(checkinSession)
    willDo(() => {
      history.push(`${history.location.pathname}/facial`)
    }, 200)
  }

  const onPasscodeClick = () => {
    checkinSession.paymentMode = 0
    onDebounceClick(onPasscodeClickHandle)
  }

  const onFacialClick = () => {
    checkinSession.paymentMode = 1
    onDebounceClick(onFacialClickHandle)
  }

  return (
    <div>
      <OptionsList onHandlePasscodeIdentifier={onPasscodeClick} onHandleFacialIdentifier={onFacialClick} />
    </div>
  )
}
