import './OptionsList.scss'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import FacialRegconizeIcon from 'src/components/svg-components/FacialRegconizeIcon'
import FingerPrintIcon from 'src/components/svg-components/FingerPrintIcon'
import PasscodeIcon from 'src/components/svg-components/PasscodeIcon'
import { useDebounceClick } from 'src/services/react-hooks/debounce-click'
import { willDo } from 'src/services/util-functions/delay-action'
import styled from 'styled-components'

import RfidIcon from '../svg-components/RfidIcon'

export interface IOptionsCard {
  onHandlePasscodeIdentifier?: () => void
  onHandleFacialIdentifier?: () => void
  onHandleQRCode?: () => void
}

export default function OptionsList({ onHandlePasscodeIdentifier, onHandleFacialIdentifier, onHandleQRCode }: IOptionsCard) {
  const { t } = useTranslation()
  const optionCards = [
    {
      clazz: 'facial-card',
      onClickHandler: onHandleFacialIdentifier,
      icon: <FacialRegconizeIcon className="mt4 flex justify-center items-center" width={'5rem'} height={'5rem'} />,
      title: t('FacialRecognize'),
    },
    {
      clazz: 'passcode-card',
      onClickHandler: onHandlePasscodeIdentifier,
      icon: <PasscodeIcon className="mt4 flex justify-center items-center" width={'5rem'} height={'5rem'} />,
      title: t('Passcode'),
    },
    {
      clazz: 'qr-card',
      onClickHandler: onHandleQRCode,
      icon: <RfidIcon className="mt3 flex justify-center items-center" width={'5rem'} height={'5rem'} />,
      title: t('QR'),
    },
  ]
  return (
    <div className="options-card">
      {optionCards.map(({ clazz, onClickHandler, title, icon }, index) => (
        <OptionCard clazz={clazz} onClick={onClickHandler} key={index}>
          <GradientOverlay />
          {icon}
          <SolutionTitle>{title}</SolutionTitle>
        </OptionCard>
      ))}
    </div>
  )
}

const GradientOverlay = styled.div.attrs({
  className: `gradient-overlay card__border`,
})``

interface StyledComponentProps {
  clazz?: string
}

const OptionCard: any = styled.div.attrs(({ clazz }: StyledComponentProps) => ({
  className: `mh3 flex flex-column items-center card__border option-card ${clazz}`,
}))`
  height: 12rem;
  width: 12rem;
`
const SolutionTitle = styled.span.attrs(({ clazz }: StyledComponentProps) => ({
  className: `f4 mt4 card-title ${clazz}`,
}))`
  color: #1d1e18;
  position: absolute;
  bottom: 1rem;
`
