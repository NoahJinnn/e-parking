import './SettingModal.scss'

import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedKeyboard from 'src/components/animated-keyboard/AnimatedKeyboard'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'
import BaseInput from 'src/components/input-fields/BaseInput'
import ModalLayout from 'src/components/modals/ModalLayout'
import BasePopup from 'src/components/popup/BasePopup'
import CouponCloseCorner from 'src/components/svg-components/CouponCloseCorner'
import { useOutsideClickInit } from 'src/services/react-hooks/outside-click-init'
import { onKeyPressHandler } from 'src/services/util-functions/virtual-keyboard-handlers'
import { numberLayout } from 'src/virtual-keyboard-layout'

export default function SettingModal({ open, closeModal }) {
  const { t } = useTranslation()
  const [settingSlots, setSettingSlots] = useState([
    {
      val: 0,
      isToggle: false,
    },
    {
      val: 1,
      isToggle: false,
    },
    {
      val: 2,
      isToggle: false,
    },
    {
      val: 3,
      isToggle: false,
    },
    {
      val: 4,
      isToggle: false,
    },
    {
      val: 5,
      isToggle: false,
    },
    {
      val: 6,
      isToggle: false,
    },
    {
      val: 7,
      isToggle: false,
    },
    {
      val: 8,
      isToggle: false,
    },
    {
      val: 9,
      isToggle: false,
    },
    {
      val: 10,
      isToggle: false,
    },
    {
      val: 11,
      isToggle: false,
    },
    {
      val: 12,
      isToggle: false,
    },
    {
      val: 13,
      isToggle: false,
    },
    {
      val: 14,
      isToggle: false,
    },
    {
      val: 15,
      isToggle: false,
    },
  ])
  const [showFinishConfig, setShowFinishConfig] = useState(false)
  const [cabinInfo, setCabinInfo] = useState({
    'bottom-cabin': '',
    'top-cabin': '',
  })
  const keyboardRef = useRef<HTMLDivElement>()
  const bottomCabinInputRef = useRef<HTMLDivElement>(null)
  const topCabinInputRef = useRef<HTMLDivElement>(null)
  const [inputMark, setInputMark] = useState('bottom-cabin')
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useOutsideClickInit(
    (e) => {
      const eventTarget = e.target
      switch (eventTarget.id) {
        case 'bottom-cabin':
        case 'top-cabin':
          setInputMark(eventTarget.id)
          break
        default:
          return
      }
    },
    () => {
      setInputMark('')
    },
    [keyboardRef, bottomCabinInputRef, topCabinInputRef],
  )

  const toggleSettingSlot = (selectIdx) => () => {
    const newSSlots = settingSlots.map((slot, index) => {
      return selectIdx === index ? { ...slot, isToggle: !slot.isToggle } : slot
    })
    setSettingSlots(newSSlots)
  }

  const processKeypress = (button: string, currentInput: string): string => {
    const newInput = onKeyPressHandler(
      button,
      currentInput,
      () => {
        setShowVirtualKeyboard(false)
      },
      () => {},
      () => {
        setShowVirtualKeyboard(false)
      },
    )
    return newInput
  }

  const onKeyPressVirtualKeyboard = (button) => {
    const newInputField = processKeypress(button, cabinInfo[inputMark])
    setCabinInfo({ ...cabinInfo, [inputMark]: newInputField })
  }

  const clearTxt = (type = 'bottom-cabin' as any) => () => {
    setCabinInfo({ ...cabinInfo, [type]: '' })
  }

  const onFinishConfigHandle = (isFinish: boolean) => () => {
    setShowFinishConfig(isFinish)
  }

  return (
    <div>
      <BasePopup overlayStyle={{ paddingTop: '0rem' }} open={open} closeOnDocumentClick={true} onClose={closeModal}>
        <ModalLayout
          header={
            <div>
              <h3 className="f2 mb3 black">{t('SettingTitle')}</h3>
              <CouponCloseCorner onClickHandler={closeModal} className="modal__close-corner" />
            </div>
          }
          content={
            !showFinishConfig ? (
              <div className="setting-grid">
                {settingSlots.map(({ val, isToggle }, index) => (
                  <div
                    key={index}
                    className={`setting-slot ba pa2 ma2 f3 ${isToggle ? 'white bg-green b--white-50' : 'green bg-white b--green-50'}`}
                    onClick={toggleSettingSlot(index)}>
                    {val}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-column items-center justify-center w-100">
                  <BaseInput
                    id="bottom-cabin"
                    hasSeparator={false}
                    containerClassName="w-50"
                    showClearBtn={inputMark === 'bottom-cabin'}
                    label={t('BottomCabin')}
                    labelStyle={{ minWidth: '2rem' }}
                    value={cabinInfo['bottom-cabin']}
                    onClearTxt={clearTxt('bottom-cabin')}
                    containerRef={bottomCabinInputRef}
                  />
                  <BaseInput
                    id="top-cabin"
                    hasSeparator={false}
                    containerClassName="w-50 mv3"
                    showClearBtn={inputMark === 'top-cabin'}
                    label={t('TopCabin')}
                    labelStyle={{ minWidth: '2rem' }}
                    value={cabinInfo['top-cabin']}
                    onClearTxt={clearTxt('top-cabin')}
                    containerRef={topCabinInputRef}
                  />
                  <AnimatedKeyboard
                    animationTrigger={showVirtualKeyboard}
                    from={{ opacity: 0, transform: 'translateY(100%)' }}
                    enter={{ opacity: 1, transform: 'translateY(0%)' }}
                    leave={{ opacity: 0, transform: 'translateY(100%)' }}
                    animatedStyle={{ position: 'absolute', top: '100%' }}
                    className="w-80 z-1 black"
                    layout={numberLayout}
                    keyboardRef={keyboardRef}
                    onKeyPress={onKeyPressVirtualKeyboard}
                    maxLength={6}
                  />
                </div>
              </>
            )
          }
          footer={
            !showFinishConfig ? (
              <div className="mv3">
                <PrimaryBtn onClickHandler={onFinishConfigHandle(true)} label={'OK'} btnColor={'#19a974'} />
              </div>
            ) : (
              <div className="flex justify-between w-80 mv3">
                <PrimaryBtn onClickHandler={onFinishConfigHandle(false)} label={'Back'} btnColor={'#19a974'} />
                <PrimaryBtn onClickHandler={closeModal} label={'Finish'} btnColor={'#19a974'} />
              </div>
            )
          }
        />
      </BasePopup>
    </div>
  )
}
