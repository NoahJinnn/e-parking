import React from 'react'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazyload'
import androidStore from 'src/assets/pic/android-store.png'
import iosStore from 'src/assets/pic/ios-store.png'
import qrImg from 'src/assets/pic/qr-code-sample.png'
import ModalLayout from 'src/components/modals/ModalLayout'
import CouponCloseCorner from 'src/components/svg-components/CouponCloseCorner'

export default function AppInstallModal({ onClose }) {
  const { t } = useTranslation()
  return (
    <ModalLayout
      header={
        <div>
          <h3 className="f2 black">{t('InstallAppTitle')}</h3>
          <CouponCloseCorner onClickHandler={onClose} className="modal__close-corner" />
        </div>
      }
      content={
        <div className="flex justify-center pa3 mb5">
          <div>
            <LazyLoad>
              <div className="flex justify-center">
                <img width={295} height={269} src={qrImg} />
              </div>
            </LazyLoad>
            <div className="flex items-center ph5">
              <img className="mr3" src={androidStore} />
              PLAY STORE
            </div>
          </div>
          <div className="b--light-gray bl mh5" style={{ height: '18rem' }} />
          <div>
            <LazyLoad>
              <div className="flex justify-center">
                <img width={295} height={269} src={qrImg} />
              </div>
            </LazyLoad>
            <div className="flex items-center ph5">
              <img className="mr3" src={iosStore} />
              APP STORE
            </div>
          </div>
        </div>
      }
    />
  )
}
