import './RatingCard.scss'

import React from 'react'
import Rating from 'react-rating'
import { useHistory } from 'react-router'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'
import { willDo } from 'src/services/util-functions/delay-action'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function RatingCard() {
  const history = useHistory()

  const onFeedBack = () => {
    willDo(() => {
      history.push('/checkout/success')
    }, 200)
  }

  return (
    <div className="rating-card flex flex-column justify-center items-center">
      <h3 className="f2 w-40 tc">QUÝ KHÁCH VUI LÒNG ĐÁNH GIÁ CHẤT LƯỢNG DỊCH VỤ</h3>
      <Rating
        className="mt4 mb5"
        emptySymbol={<FontAwesomeIcon icon={['far', 'star']} size="lg" className="empty-star" />}
        fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color="yellow" size="lg" className="full-star" />}
      />
      <PrimaryBtn label="Gửi đánh giá" onClickHandler={onFeedBack} />
    </div>
  )
}
