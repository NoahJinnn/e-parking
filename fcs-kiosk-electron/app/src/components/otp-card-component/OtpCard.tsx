import './OtpCard.scss'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ClipLoader from 'react-spinners/ClipLoader'
import { useOutsideClickInit } from 'src/services/react-hooks/outside-click-init'
import { numberLayout } from 'src/virtual-keyboard-layout'
import styled from 'styled-components'

import { css } from '@emotion/core'

import AnimatedKeyboard from '../animated-keyboard/AnimatedKeyboard'
import PrimaryBtn from '../buttons/PrimaryBtn'

const override = css`
  display: block;
  margin: 1em auto;
  border-width: 7px;
`
export interface IOtpCardProps {
  onConfirmOtp: (otp: string) => void
}

export default function OtpCard({ onConfirmOtp }: IOtpCardProps) {
  const { t } = useTranslation()
  const [otpCodes, setOtpCodes] = useState('')
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(30)
  const keyboardRef = useRef<HTMLDivElement>()
  const otpRef = useRef<HTMLDivElement>(null)

  const [showVirtualKeyboard, setShowVirtualKeyboard] = useOutsideClickInit(null, null, [keyboardRef, otpRef])

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => --prevCount)
    }, 1000)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      clearTimeout(timeout)
    }, 31000)
  }, [])

  useEffect(() => {
    if (count === 0) {
      setLoading(false)
    }
  }, [count])

  const onKeyPressVirtualKeyboard = (button: string) => {
    if (button.trim() === '\u21b5') {
      setOtpCodes(otpCodes.slice(0, otpCodes.length - 1))
      return
    }

    if (button.trim() === '\u21b4') {
      setShowVirtualKeyboard(false)
      return
    }

    const phoneNumber = parseInt(button, 10)
    if (isNaN(phoneNumber) || otpCodes.length >= 6) {
      return
    }
    setOtpCodes(otpCodes + phoneNumber)
  }

  const renderOtpBoxes = () => {
    const otpArray: string[] = []
    for (let i = 0; i < 6; i++) {
      if (otpCodes[i]) {
        otpArray[i] = otpCodes[i]
      } else {
        otpArray[i] = ''
      }
    }
    return otpArray
  }

  const onConfirmOtpHandler = () => {
    if (otpCodes.length === 6) {
      const currentKeyboard: any = keyboardRef.current
      currentKeyboard.clearInput()
      onConfirmOtp(otpCodes)
    }
  }

  return (
    <div className="otp-card">
      <div className="card__border flex flex-column items-center ph3 pv4">
        <div ref={otpRef} className="otp-container mb2 flex">
          {renderOtpBoxes().map((ele, idx) => {
            return (
              <OtpBox style={{ animationDelay: `${idx === 0 ? 50 : idx * 125}ms` }} key={idx}>
                {ele}
              </OtpBox>
            )
          })}
        </div>
        <PrimaryBtn label={t('ConfirmBtnTxt')} onClickHandler={onConfirmOtpHandler} disabled={otpCodes.length < 6} />
      </div>
      {!loading ? (
        <div className="tc w-100 mt3">
          <span className="mr2 f4">{t('OtpQuestion')}</span>
          <a style={{ color: '#2e4dcb' }} className="link dim b f4" href="/">
            {t('OtpRetry')}
          </a>
        </div>
      ) : null}

      {loading ? (
        <>
          <ClipLoader css={override} size={150} color={'#6590ff'} loading={true} />
          <div className="otp-loader">
            <span>{count}</span>
          </div>
        </>
      ) : null}

      <AnimatedKeyboard
        animationTrigger={showVirtualKeyboard}
        from={{ opacity: 0, transform: 'translateY(100%)' }}
        enter={{ opacity: 1, transform: 'translateY(0%)' }}
        leave={{ opacity: 0, transform: 'translateY(100%)' }}
        animatedStyle={{ position: 'absolute', top: '70%' }}
        className="w-100"
        layout={numberLayout}
        keyboardRef={keyboardRef}
        onKeyPress={onKeyPressVirtualKeyboard}
        maxLength={6}
        keyboardType={'number'}
      />
    </div>
  )
}

const OtpBox = styled.div.attrs({
  className: 'ma3 animate__animated animate__bounceIn card__border',
})`
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  text-align: center;
  background-color: #fffa;
`
