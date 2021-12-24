import React from 'react'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazyload'
import qrScannerPic from 'src/assets/pic/qr-code-scanning.png'
import ModalLayout from 'src/components/modals/ModalLayout'
import CouponCloseCorner from 'src/components/svg-components/CouponCloseCorner'

export default function CouponQrScanner({ onClose }) {
  const { t } = useTranslation()
  return (
    <div className="coupon-qr-scanner">
      <ModalLayout
        header={
          <div className="relative w-100 flex justify-center">
            <h3 className="f2 mb3 black">{t('QrScannerHeader')}</h3>
            <CouponCloseCorner onClickHandler={onClose} className="modal__close-corner" />
          </div>
        }
        content={
          <div className="relative flex justify-center">
            <LazyLoad>
              <img src={qrScannerPic} />
            </LazyLoad>
          </div>
        }
        footer={<div className="f3 mt3 mb5">{t('QrScannerFooter')}</div>}
      />
    </div>
  )
}
