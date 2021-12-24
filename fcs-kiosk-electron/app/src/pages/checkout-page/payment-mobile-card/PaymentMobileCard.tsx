import React from 'react'
import qrImg from 'src/assets/pic/qr-code-sample.png'

import LazyLoad from 'react-lazyload'
import { useTranslation } from 'react-i18next'
import Popup from 'reactjs-popup'
import AppInstallModal from '../app-install-modal/AppInstallModal'

export default function PaymentMobileCard() {
  const { t } = useTranslation()
  return (
    <div>
      <LazyLoad width={322} height={292}>
        <div className="flex justify-center">
          <img src={qrImg} />
        </div>
      </LazyLoad>
      <div style={{ fontSize: '1.825rem', fontWeight: 600 }} className="flex flex-column justify-center items-center">
        <div>{t('AppSuggest')}</div>

        <Popup
          contentStyle={{ border: 0, padding: 0, borderRadius: '15px', width: '80%' }}
          overlayStyle={{ top: '-50%' }}
          trigger={<div style={{ color: '#369aff' }}>{t('AppRequest')}</div>}
          modal={true}
          closeOnDocumentClick={false}>
          {(close) => <AppInstallModal onClose={close} />}
        </Popup>
      </div>
    </div>
  )
}
