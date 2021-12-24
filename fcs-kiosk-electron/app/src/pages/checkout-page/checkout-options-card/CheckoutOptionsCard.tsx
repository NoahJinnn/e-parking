import React from 'react'
import { useHistory } from 'react-router'
import OptionsList from 'src/components/options-card-component/OptionsList'
import { useDebounceClick } from 'src/services/react-hooks/debounce-click'
import { willDo } from 'src/services/util-functions/delay-action'

export default function CheckoutOptionsCard() {
  const history = useHistory()
  const [onPasscodeDebounceClick] = useDebounceClick()
  const onPasscodeClickHandle = () => {
    willDo(() => {
      history.push(`${history.location.pathname}/passcode`)
    }, 200)
  }
  const onPasscodeClick = () => {
    onPasscodeDebounceClick(onPasscodeClickHandle)
  }

  return (
    <div>
      <OptionsList onHandlePasscodeIdentifier={onPasscodeClick} />
    </div>
  )
}
