import React, { useEffect } from 'react';
import { getAllParks } from 'services/parkingServices';

import ParkingCard, { IParkingCard } from './ParkingCard';

const parkingCardMocks = [
  {
    id: "0",
    image: "/images/eparking-sample.png",
    name: "Tòa nhà Mplaza Saigon",
    location: "39 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
    time: "00:00 - 23:59",
    distance: "1,5km",
    slot: "60/100",
    priceTags: [
      {
        type: "2 giờ đầu",
        price: "100,000",
      },
      {
        type: "1 giờ tiếp theo",
        price: "200,000",
      },
      {
        type: "qua đêm",
        price: "300,000",
      },
    ],
  },
  {
    id: "1",
    image: "/images/eparking-sample.png",
    name: "Tòa nhà Mplaza Saigon",
    location: "39 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
    time: "00:00 - 23:59",
    distance: "1,5km",
    slot: "60/100",
    priceTags: [
      {
        type: "2 giờ đầu",
        price: "100,000",
      },
      {
        type: "1 giờ tiếp theo",
        price: "200,000",
      },
      {
        type: "qua đêm",
        price: "300,000",
      },
    ],
  },
  {
    id: "2",
    image: "/images/eparking-sample.png",
    name: "Tòa nhà Mplaza Saigon",
    location: "39 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
    time: "00:00 - 23:59",
    distance: "1,5km",
    slot: "60/100",
    priceTags: [
      {
        type: "2 giờ đầu",
        price: "100,000",
      },
      {
        type: "1 giờ tiếp theo",
        price: "200,000",
      },
      {
        type: "qua đêm",
        price: "300,000",
      },
    ],
  },
  {
    id: "3",
    image: "/images/eparking-sample.png",
    name: "Tòa nhà Mplaza Saigon",
    location: "39 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
    time: "00:00 - 23:59",
    distance: "1,5km",
    slot: "60/100",
    priceTags: [
      {
        type: "2 giờ đầu",
        price: "100,000",
      },
      {
        type: "1 giờ tiếp theo",
        price: "200,000",
      },
      {
        type: "qua đêm",
        price: "300,000",
      },
    ],
  },
];

export default function ParkingCardList(): JSX.Element {
  const fetchParks = async () => {
    const park = await getAllParks();
  };
  useEffect(() => {
    fetchParks();
  }, []);

  return (
    <div className="parking-cards flex flex-column ph4">
      {parkingCardMocks.map(({ id, ...otherProps }: IParkingCard, i) => {
        return (
          <ParkingCard
            className="animate__animated animate__fadeIn"
            style={{ animationDelay: `${(i + 1) * 150}ms` }}
            {...otherProps}
            key={id}
            id={id}
          />
        );
      })}
    </div>
  );
}
