import './ConfirmCard.scss'

import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { Checkbox } from 'rendition'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'
import BaseField from 'src/components/input-fields/BaseField'
import TimelineField from 'src/components/input-fields/TimelineField'
import Prompter, { openPrompter } from 'src/components/modals/Prompter'
import BaseSelect from 'src/components/select/BaseSelect'
import CarTypeIcon from 'src/components/svg-components/CarTypeIcon'
import ChargeIcon from 'src/components/svg-components/ChargeIcon'
import LicensePlateIcon from 'src/components/svg-components/LicensePlateIcon'
import TimeCheckinIcon from 'src/components/svg-components/TimeCheckinIcon'
import { awsWSConfig } from 'src/constants/config'
import { willDo } from 'src/services/util-functions/delay-action'

import { CheckinSessionContext } from '../../CheckinSessionContext'

const carTypeOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const licOptions = [
  { value: '51B-12345', label: '51B-12345' },
  { value: '51B-15555', label: '52B-55555' },
  { value: '51B-55545', label: '51B-33345' },
]

export default function ConfirmCard() {
  const { t } = useTranslation()
  const history = useHistory()
  const [carLicense, setCarLicense] = useState('')
  const [carType, setCarType] = useState('')
  const [displayTime, setDisplayTime] = useState('')
  const [checkinDate, setCheckinDate] = useState(0)
  const [useCharge, setUseCharge] = useState(false)

  const checkinSession = useContext(CheckinSessionContext)

  const handleCarLicense = (selectedCL) => {
    setCarLicense(selectedCL.value)
  }

  const handleCarType = (selectedCT) => {
    setCarType(selectedCT.value)
  }

  const handleChargingMode = () => {
    setUseCharge(!useCharge)
  }

  const handleCheckinDate = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    setDisplayTime(hours + ':' + minutes + ' ' + day + '/' + month + '/' + year)
    setCheckinDate(date.getTime())
  }

  const onConfirmInfo = () => {
    checkinSession.licensePlate = carLicense
    checkinSession.checkInDate = checkinDate
    checkinSession.carType = carType
    sendJsonMessage({
      action: 'action',
      message: 'Hello world',
    })
    willDo(() => {
      history.push(history.location.pathname + `/car-status`)
    }, 200)
  }

  useEffect(() => {
    openPrompter({
      type: 'info',
      promptTitle: 'OH NO..',
      promptContent: 'Xác thực  khuôn mặt không thành công, quý khách vui lòng thử lại',
    })
    handleCheckinDate()
  }, [])
  const wsUrl = process.env.REACT_APP_WS_URL as string
  // TODO: Example of websocket
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(wsUrl, awsWSConfig)

  return (
    <div className="confirm-card card__border ph5 pv3">
      <BaseField
        className="ma3"
        titleIcon={<LicensePlateIcon className="input__title-icon" />}
        title={t('LicensePlate')}
        body={<BaseSelect options={licOptions} onChange={handleCarLicense} />}
      />
      <BaseField
        className="ma3"
        titleIcon={<TimeCheckinIcon className="input__title-icon" />}
        title={t('CheckinTime')}
        body={<TimelineField options={{ className: 'ml2' }} displayTime={displayTime} />}
      />

      <BaseField
        className="ma3"
        titleIcon={<CarTypeIcon className="input__title-icon" />}
        title={t('CarType')}
        body={<BaseSelect options={carTypeOptions} onChange={handleCarType} />}
      />

      <BaseField
        className="ma3"
        titleIcon={<ChargeIcon className="input__title-icon" />}
        title={t('ChargeCar')}
        body={
          <div className="flex justify-between items-center">
            <div>{useCharge ? 'ON' : 'OFF'}</div>
            <Checkbox className="charge-toggle" toggle={true} onChange={handleChargingMode} />
          </div>
        }
      />

      <div className="flex justify-center">
        <PrimaryBtn label={t('ConfirmBtnTxt')} onClickHandler={onConfirmInfo} />
      </div>
    </div>
  )
}
