import React from 'react'
import ModalLayout from 'src/components/modals/ModalLayout'
import CouponCloseCorner from 'src/components/svg-components/CouponCloseCorner'

import SignatureComponent from './SignatureComponent'

export default function PaymentSignatureModal({ onClose, onConfirmSignature }) {
  return (
    <div>
      <ModalLayout
        header={
          <div className="relative w-100 flex justify-center">
            <h3 className="f3 pt5 mb3 black">ĐIỀU KHOẢN BẢO MẬT VÀ SỬ DỤNG</h3>
            <CouponCloseCorner onClickHandler={onClose} className="modal__close-corner" />
          </div>
        }
        content={
          <div className="modal-container w-100 flex justify-center">
            <SignatureComponent onConfirmSignature={onConfirmSignature} />
          </div>
        }
      />
    </div>
  )
}
