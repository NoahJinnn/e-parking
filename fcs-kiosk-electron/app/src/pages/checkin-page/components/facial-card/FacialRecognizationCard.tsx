import React from 'react'
import LazyLoad from 'react-lazyload'
import colorFace from 'src/assets/pic/facial-color.png'
import regFace from 'src/assets/pic/facial-regular.png'
import OutlineBtn from 'src/components/buttons/OutlineBtn'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'

export default function FacialRecognizationCard() {
  const reCheck = () => {}
  const confirm = () => {}

  return (
    <div className="card__border w-50 margin-center flex flex-column items-center justify-center">
      <div className="flex flex-wrap justify-center mt4 w-90">
        <LazyLoad>
          <div className="flex justify-center ma3">
            <img width={295} height={200} src={regFace} />
          </div>
        </LazyLoad>
        <LazyLoad>
          <div className="flex justify-center ma3">
            <img width={295} height={200} src={regFace} />
          </div>
        </LazyLoad>
        <LazyLoad>
          <div className="flex justify-center ma3">
            <img width={295} height={200} src={colorFace} />
          </div>
        </LazyLoad>
        <LazyLoad>
          <div className="flex justify-center ma3">
            <img width={295} height={200} src={colorFace} />
          </div>
        </LazyLoad>
      </div>
      <div className="flex justify-between w-90 ph3 pv3">
        <OutlineBtn style={{ width: '295px' }} onClickHandler={reCheck} label="Thao tác lại" />
        <PrimaryBtn style={{ width: '295px' }} onClickHandler={confirm} label="Xác nhận" />
      </div>
    </div>
  )
}
