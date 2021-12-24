import React from 'react'
import CouponItem from './CouponItem'
import EmptyCouponBanner from './EmptyCouponBanner'

export interface ICouponListProps {
  couponList: any[]
}

export default function CouponList({ couponList = [] }: ICouponListProps) {
  return (
    <div className="coupon-list">
      {couponList.length > 0 &&
        couponList.map(({ couponId, couponName, couponCount, couponTime }) => (
          <div className="mv3" key={couponId}>
            <CouponItem couponId={couponId} couponCount={couponCount} couponTime={couponTime} couponName={couponName} />
          </div>
        ))}
      {couponList.length <= 0 && <EmptyCouponBanner content={`There're no matched coupons.`} />}
    </div>
  )
}
