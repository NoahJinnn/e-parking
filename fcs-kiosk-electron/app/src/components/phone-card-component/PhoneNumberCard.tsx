import './PhoneNumberCard.scss'
import 'react-phone-input-2/lib/style.css'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2'
import { useOutsideClickInit } from 'src/services/react-hooks/outside-click-init'
import { numberLayout } from 'src/virtual-keyboard-layout'

import AnimatedKeyboard from '../animated-keyboard/AnimatedKeyboard'
import PrimaryBtn from '../buttons/PrimaryBtn'

export interface IPhoneNumberCardProps {
  onConfirmPhone: (phone: string, dialCode: string) => void
}

export default function PhoneNumberCard({ onConfirmPhone }: IPhoneNumberCardProps) {
  const { t } = useTranslation()
  const [phoneValue, setPhoneValue] = useState('')
  const [disableConfirm, setDisableConfirm] = useState(true)
  const keyboardRef = useRef<HTMLDivElement>()
  const phoneinputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const phoneInput = document.getElementsByName('phoneInput')[0] as HTMLInputElement
    setPhoneValue(phoneInput.value)
  }, [])

  const [showVirtualKeyboard, setShowVirtualKeyboard] = useOutsideClickInit(null, null, [keyboardRef, phoneinputRef])

  const onKeyPressVirtualKeyboard = (button: string) => {
    const { phone, phoneWithoutDialCode, dialCode } = processPhoneInputElementValue()
    if (button.trim() === '\u21b5') {
      setPhoneValue(phone.slice(0, phone.length - 1))
      checkDisableConfirm(dialCode)
      return
    }

    if (button.trim() === '\u21b4') {
      setShowVirtualKeyboard(false)
      return
    }

    const phoneNumber = parseInt(button, 10)

    if (isNaN(phoneNumber) || phoneWithoutDialCode.length >= 9) {
      return
    }

    setPhoneValue(phone + phoneNumber)
    checkDisableConfirm(dialCode)
  }

  const checkDisableConfirm = (dialCode) => {
    if (phoneValue.length - dialCode.length !== 7) {
      setDisableConfirm(true)
    } else {
      setDisableConfirm(false)
    }
  }

  const processPhoneInputElementValue = () => {
    const phoneInputEle = document.getElementById('phone-card-input-id')
    const phoneValueAttribute = phoneInputEle?.getAttribute('value') || ''
    const phoneValueArr = phoneValueAttribute.split(' ')
    const phone = phoneValueArr.join('').replace(/\D+/g, '')
    const phoneWithoutDialCode = phoneValueArr
      .splice(1)
      .join('')
      .replace(/\D+/g, '')
    const dialCode = phoneValueArr[0]
    return { phone, phoneWithoutDialCode, dialCode }
  }

  const onPhoneConfirmHandler = () => {
    const phoneInput = document.getElementsByName('phoneInput')[0] as HTMLInputElement
    const phoneValueEle = phoneInput.value
    const phoneValueEleArr = phoneValueEle.split(' ')
    onConfirmPhone(phoneValueEle, phoneValueEleArr[0].slice(1, phoneValueEleArr[0].length))
  }

  return (
    <div className="phone-card-container">
      <div className="phone-number-card card__border pa4">
        <div className="phone-container mb3" ref={phoneinputRef}>
          <PhoneInput
            inputProps={{
              id: 'phone-card-input-id',
              name: 'phoneInput',
              required: true,
              autoFocus: true,
            }}
            inputClass="phone-input"
            containerClass="phone-input__container mb3"
            country={'vn'}
            regions={['asia', 'north-america', 'europe']}
            value={phoneValue}
          />
        </div>
        <PrimaryBtn disabled={disableConfirm} label={t('ConfirmBtnTxt')} onClickHandler={onPhoneConfirmHandler} />
      </div>
      <AnimatedKeyboard
        animationTrigger={showVirtualKeyboard}
        from={{ opacity: 0, transform: 'translateY(100%)' }}
        enter={{ opacity: 1, transform: 'translateY(0%)' }}
        leave={{ opacity: 0, transform: 'translateY(100%)' }}
        layout={numberLayout}
        keyboardRef={keyboardRef}
        onKeyPress={onKeyPressVirtualKeyboard}
        maxLength={10}
        animatedStyle={{ position: 'absolute', top: '20%' }}
        className="w-100"
        keyboardType="number"
      />
    </div>
  )
}
