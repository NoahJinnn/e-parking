import './PolicyModal.scss'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from 'rendition'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'
import ModalLayout from 'src/components/modals/ModalLayout'
import CouponCloseCorner from 'src/components/svg-components/CouponCloseCorner'

export default function PolicyModal({ onClose, isAgree, setIsAgree }) {
  const { t } = useTranslation()
  // const [isAgree, setIsAgree] = useState(false);

  const handleAgreePolicy = () => {
    setIsAgree(!isAgree)
  }

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
          <div className="modal-container">
            <div className="card__border2 relative flex justify-center">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
              consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam no. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
              dolor sit amet, consetetur sadipscing elitr, sed diam no
            </div>
            <div className="flex">
              <Checkbox className="mr3" onChange={handleAgreePolicy} checked={isAgree} />
              <span onClick={handleAgreePolicy} className="w-90">
                Tôi đã đọc và đồng ý với các điều khoản bảo mật và hướng dẫn sử dụng ở trên.
              </span>
            </div>
          </div>
        }
        footer={
          <div className="f3 mt2 mb5">
            <PrimaryBtn disabled={!isAgree} label={t('NextBtnTxt')} onClickHandler={onClose} />
          </div>
        }
      />
    </div>
  )
}
