import './CarStatusCard.scss'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'
import CarStatusIcon from 'src/components/svg-components/CarStatusIcon'
import { willDo } from 'src/services/util-functions/delay-action'

export default function CarStatusCard() {
  const { t } = useTranslation()
  const history = useHistory()

  const [statusList, setStatusList] = useState([
    {
      status: 'Đã tắt xe',
      isToggle: false,
    },
    {
      status: 'Đã khóa xe',
      isToggle: false,
    },
    {
      status: 'Không còn người trong xe',
      isToggle: false,
    },
  ])
  const [enableBtn, setEnableBtn] = useState(true)
  useEffect(() => {
    const isDisable = statusList.some((stt) => !stt.isToggle)
    setEnableBtn(isDisable)
  }, [statusList])

  const handleCheckStatus: any = (index: number) => () => {
    const newStatus = statusList.map((stt, idx) => {
      if (idx === index) {
        return { ...stt, isToggle: !stt.isToggle }
      }
      return { ...stt }
    })
    setStatusList(newStatus)
  }

  const onConfirmInfo = () => {
    willDo(() => {
      history.push('/checkin/options-card')
    }, 200)
  }

  return (
    <div className="card__border car-status-card">
      {statusList.map((stt, index) => (
        <div className="flex items-center mv4 w-80" key={index}>
          {!stt.isToggle ? (
            <div onClick={handleCheckStatus(index)} className="status-checkbox br-100 ba bw1 b--moon-gray" />
          ) : (
            <CarStatusIcon className="status-checkbox" onClickHandler={handleCheckStatus(index)} />
          )}
          <span onClick={handleCheckStatus(index)} className="ml3">
            {stt.status}
          </span>
        </div>
      ))}
      <div className="flex justify-center">
        <PrimaryBtn disabled={enableBtn} label={t('ConfirmBtnTxt')} onClickHandler={onConfirmInfo} />
      </div>
    </div>
  )
}
