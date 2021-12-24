import './index.scss';

import SVGBilling from 'component/svg/billing';
import SVGMoneyBag from 'component/svg/money-bag';
import SVGMoneyBox from 'component/svg/money-box';
import SVGMoneyHand from 'component/svg/money-hand';
import React from 'react';

export interface IParkingInfo {
  parkingImg: string;
}

export default function ParkingInfo({
  parkingImg = "/images/eparking-sample.png",
}): JSX.Element {
  return (
    <div className="parking-info w-100 flex flex-column bg-inherit">
      <section className="info-card relative flex-column">
        <img className="card-info-img" src={parkingImg} alt="" />
        <div className="f3 fw5 pa2">Tòa nhà Mplaza Saigon</div>
        <div className="f5 pa2">
          39 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
        </div>
        <img
          className="direction-circle absolute"
          src="/images/circleDirection.png"
          alt=""
        />
      </section>
      <section className="info-card justify-between">
        <div className="flex flex-column">
          <div className="flex flex-column justify-center items-center mb4">
            <div>Thời gian hoạt động</div>
            <div className="f3 fw5 mt2">24 / 7</div>
          </div>
          <div>
            <SVGBilling /> Bãi giữ xe thu phí
          </div>
        </div>
        <div className="pie-chart"></div>
      </section>
      <section className="info-card justify-around">
        <div className="finance-card">
          <div className="fw6">100,000,000</div>
          <div className="flex justify-between">
            <div className="f7 w-70">Doanh thu trong tháng</div>
            <div
              style={{ backgroundColor: "#FFF5DB" }}
              className="money-box-container flex items-center justify-center"
            >
              <SVGMoneyBag />
            </div>
          </div>
        </div>
        <div className="finance-card">
          <div className="fw6">100,000,000</div>
          <div className="flex justify-between">
            <div className="f7 w-70">Tờ trong hộp nhận tiền</div>
            <div
              style={{ backgroundColor: "#ebedff" }}
              className="money-box-container flex items-center justify-center"
            >
              <SVGMoneyBox />
            </div>
          </div>
        </div>
        <div className="finance-card">
          <div className="fw6">100,000,000</div>
          <div className="flex justify-between">
            <div className="f7 w-70">Tờ trong hộp trả tiền</div>
            <div
              style={{ backgroundColor: "#E4EFFF" }}
              className="money-box-container flex items-center justify-center"
            >
              <SVGMoneyHand />
            </div>
          </div>
        </div>
      </section>
      <section className="info-card flex-column">
        <div className="fw6">Tình trạng nhà xe:</div>
        <div className="flex justify-between">
          <div>Đang hoạt động</div>
          <button></button>
        </div>
      </section>
      <section className="info-card flex-column">
        <div className="flex justify-between">
          <div className="fw6">Đánh giá</div>
          <div>Xem tất cả</div>
        </div>
        <div>
          <div>4,7</div>
          <div></div>
        </div>
      </section>
      <section className="info-card flex-column">
        <div className="mb3">
          <div className="fw6">Điều chỉnh mức phí</div>
          <div></div>
        </div>
        <div>
          <div className="f4 pl2 mb1">
            <span className="billing-type mr6">2 giờ đầu</span>
            <span>100,000</span>
          </div>
          <div className="f4 pl2 mb1">
            <span className="billing-type mr6">2 giờ đầu</span>
            <span>100,000</span>
          </div>
          <div className="f4 pl2 mb1">
            <span className="billing-type mr6">2 giờ đầu</span>
            <span>100,000</span>
          </div>
        </div>
      </section>
    </div>
  );
}
