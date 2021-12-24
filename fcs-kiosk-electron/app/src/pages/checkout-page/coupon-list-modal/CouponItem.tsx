import React from 'react'
import CouponItemCorner from 'src/components/svg-components/CouponItemCorner'
import LazyLoad from 'react-lazyload'
import couponimg from '../../../assets/pic/coupon-item.png'
import './CouponItem.scss'

export interface ICouponItemProps {
  couponId: number | string
  couponImg?: any
  couponCount?: string | number
  couponName: string
  couponTime: string
}

export default function CouponItem({ couponId, couponImg = couponimg, couponName, couponCount = 0, couponTime }: ICouponItemProps) {
  return (
    <div className="coupon-item card__border flex pv3 ph4">
      <CouponItemCorner className="coupon-item-corner" />
      <div className="coupon-count">{`X${couponCount}`}</div>
      <LazyLoad>
        <img src={couponImg} />
      </LazyLoad>
      <div className="flex flex-column flex-grow-1 justify-center h3 mt3 ml3">
        <div className="coupon-name flex-grow-1">{couponName}</div>
        <div className="coupon-subtitle flex">
          <div className="coupon-time flex-grow-1">HẾT HẠN SAU {couponTime}</div>
        </div>
      </div>
    </div>
  )
}
