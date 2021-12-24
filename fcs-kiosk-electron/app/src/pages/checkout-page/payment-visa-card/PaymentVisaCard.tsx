import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import Popup from 'reactjs-popup'
import nationImg from 'src/assets/pic/nation-option.png'
import AnimatedKeyboard from 'src/components/animated-keyboard/AnimatedKeyboard'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'
import BaseField from 'src/components/input-fields/BaseField'
import BaseInput from 'src/components/input-fields/BaseInput'
import CloseModalIcon from 'src/components/svg-components/CloseModalIcon'
import { useOutsideClickInit } from 'src/services/react-hooks/outside-click-init'
import { useShiftKeyClick } from 'src/services/react-hooks/shift-key-click'
import { willDo } from 'src/services/util-functions/delay-action'
import { onKeyPressHandler } from 'src/services/util-functions/virtual-keyboard-handlers'
import { defaultLayout } from 'src/virtual-keyboard-layout'
import styled from 'styled-components'

import PaymentSignatureModal from '../payment-signature-modal/PaymentSignatureModal'
import VisaNationModal from '../visa-nation-modal/VisaNationModal'

export default function PaymentVisaCard() {
  const history = useHistory()
  const { t } = useTranslation()
  const [visaInfo, setVisaInfo] = useState({
    'visa-owner': 'DIEM BUI',
    'visa-number': '1234 5678 9045',
    'visa-exp': '01/2022',
    'visa-ccv': '123',
    nation: 'Viet Nam',
  })
  const [openSignatureModal, setOpenSignatureModal] = useState(false)
  const visaOwnerInputRef = useRef<HTMLDivElement>(null)
  const visaNumberInputRef = useRef<HTMLDivElement>(null)
  const visaExpDayInputRef = useRef<HTMLDivElement>(null)
  const ccvInputRef = useRef<HTMLDivElement>(null)
  const keyboardRef = useRef<HTMLDivElement>()
  const [inputMark, setInputMark] = useState('visa-owner')
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useOutsideClickInit(
    (e) => {
      const eventTarget = e.target
      switch (eventTarget.id) {
        case 'visa-owner':
        case 'visa-number':
        case 'visa-exp':
        case 'visa-ccv':
          setInputMark(eventTarget.id)
          break
        default:
          return
      }
    },
    () => {
      setInputMark('')
    },
    [keyboardRef, visaOwnerInputRef, visaNumberInputRef, visaExpDayInputRef, ccvInputRef],
  )
  const [keyboardLayoutName, setNewLayout] = useShiftKeyClick()
  const processKeypress = (button: string, currentInput: string): string => {
    const newInput = onKeyPressHandler(
      button,
      currentInput,
      () => {
        setShowVirtualKeyboard(false)
      },
      () => {
        setNewLayout(keyboardLayoutName)
      },
      () => {
        setShowVirtualKeyboard(false)
      },
    )
    return newInput
  }
  const onKeyPressVirtualKeyboard = (button) => {
    const newInputField = processKeypress(button, visaInfo[inputMark])
    setVisaInfo({ ...visaInfo, [inputMark]: newInputField })
  }

  const clearTxt = (type: string) => () => {
    setVisaInfo({ ...visaInfo, [type]: '' })
  }

  const closeSignatureModal = () => {
    setOpenSignatureModal(false)
  }

  // tslint:disable-next-line
  const onPayClick = () => {
    setOpenSignatureModal(true)
  }

  const confirmSignature = () => {
    willDo(() => {
      history.push('/checkout/rating')
    }, 200)
  }

  return (
    <div className="flex flex-column items-center">
      <AnimatedKeyboard
        animationTrigger={showVirtualKeyboard}
        from={{ opacity: 0, transform: 'translateY(100%)' }}
        enter={{ opacity: 1, transform: 'translateY(0%)' }}
        leave={{ opacity: 0, transform: 'translateY(100%)' }}
        animatedStyle={{ position: 'absolute', top: '40%' }}
        className="w-80 z-1"
        layout={defaultLayout}
        layoutName={keyboardLayoutName}
        keyboardRef={keyboardRef}
        onKeyPress={onKeyPressVirtualKeyboard}
        maxLength={6}
      />

      <div className="card__border ph3 pv1" style={{ width: '43%' }}>
        <BaseInput
          id="visa-owner"
          showClearBtn={inputMark === 'visa-owner'}
          label={t('VisaOwnerLabel')}
          labelStyle={{ minWidth: '26%' }}
          value={visaInfo['visa-owner']}
          containerRef={visaOwnerInputRef}
          onClearTxt={clearTxt('visa-owner')}
          containerClassName="ma3"
          autoFocus={true}
        />
        <BaseInput
          id="visa-number"
          showClearBtn={inputMark === 'visa-number'}
          label={t('VisaCardNumberLabel')}
          labelStyle={{ minWidth: '26%' }}
          value={visaInfo['visa-number']}
          containerRef={visaNumberInputRef}
          onClearTxt={clearTxt('visa-number')}
          containerClassName="ma3"
        />

        <div className="flex ma3">
          <BaseInput
            hasSeparator={false}
            id="visa-exp"
            showClearBtn={inputMark === 'visa-exp'}
            label={t('VisaLastDayLabel')}
            value={visaInfo['visa-exp']}
            labelStyle={{ minWidth: '7rem' }}
            containerRef={visaExpDayInputRef}
            onClearTxt={clearTxt('visa-exp')}
            containerClassName="mr3"
          />
          <BaseInput
            hasSeparator={false}
            containerClassName="w-50"
            id="visa-ccv"
            showClearBtn={inputMark === 'visa-ccv'}
            label={t('VisaCcvLabel')}
            labelStyle={{ minWidth: '2rem' }}
            value={visaInfo['visa-ccv']}
            containerRef={ccvInputRef}
            onClearTxt={clearTxt('visa-ccv')}
          />
        </div>
        <BaseField
          className="ma3"
          title={t('NationLabel')}
          titleStyle={{ width: '30%' }}
          contentStyle={{ width: '70%' }}
          body={
            <div className="flex items-center">
              <span className="flex-grow-1">100,000</span>
              <span className="b">VND</span>
            </div>
          }
        />
        <BaseField
          className="ma3"
          title={t('TotalTitle')}
          titleStyle={{ width: '30%' }}
          contentStyle={{ width: '70%' }}
          body={
            <Popup
              contentStyle={{ border: 0, padding: '1rem', borderRadius: '15px', width: '30%' }}
              overlayStyle={{ top: '-50%' }}
              trigger={
                <div className="flex items-center">
                  <div className="flex-grow-1 flex items-center">
                    <img src={nationImg} height="30px" width="30px" />
                    <span>Viet nam</span>
                  </div>
                  <svg height="10" width="8">
                    <polygon points="0,0 8,0 4,6" style={{ fill: '#707070', stroke: '#707070', strokeWidth: 1, opacity: 0.35 }} />
                  </svg>
                </div>
              }
              modal={true}
              closeOnDocumentClick={false}>
              {(close) => (
                <div className="relative">
                  <VisaNationModal />
                  <div className="lang-modal__footer">
                    <CloseModalIcon onClickHandler={close} className="flex justify-center pt5" svgClass="lang-close__btn" />
                  </div>
                </div>
              )}
            </Popup>
          }
        />
        <div className="flex justify-center mb3">
          <PrimaryBtn label={t('VisaPayBtnLabel')} onClickHandler={onPayClick} />
        </div>
        <Popup
          contentStyle={{ border: 0, padding: 0, borderRadius: '15px' }}
          overlayStyle={{ top: '-50%' }}
          open={openSignatureModal}
          closeOnDocumentClick={false}>
          <PaymentSignatureModal onClose={closeSignatureModal} onConfirmSignature={confirmSignature} />
        </Popup>
      </div>
    </div>
  )
}

const CloseBtnContainer = styled.div.attrs({})`
  position: absolute;
  bottom: -4.6rem;
  right: 6rem;
`
