import './ParkingCard.scss';

import React, { ComponentProps, PropsWithChildren, ReactNode } from 'react';

export interface IParkingCard extends React.HTMLAttributes<HTMLDivElement> {
  id: string | undefined;
  image: string;
  name: string;
  location: string;
  time: string;
  distance: string;
  slot: string;
  priceTags: any[];
}

export default function ParkingCard({
  id,
  image,
  name,
  location,
  time,
  distance,
  slot,
  priceTags,
  className,
  style,
}: PropsWithChildren<IParkingCard>): JSX.Element {
  return (
    <div
      className={`${className} parking-card mb3 pt1 bg-white shadow-1 br4 fw4`}
      style={{ height: "14rem", ...style }}
    >
      <div className="flex h-75 pa2">
        <img
          className="card-img mr2"
          style={{ objectFit: "contain" }}
          src={image}
          alt="Parking"
        />
        <div className="flex flex-column">
          <div className="f4 fw5">{name}</div>
          <div className="f6 mv2">{location}</div>
          <div className="flex f6 justify-between items-center">
            <div className="flex flex-column">
              <div>
                <span className="light-purple-text fw6">Thời gian</span> {time}
              </div>
              <div className="mt1">
                <span className="light-purple-text fw6">Khoảng cách</span>{" "}
                {distance}
              </div>
            </div>
            <div className="light-purple-border flex flex-column justify-center items-center br3 ba ph3 pv1">
              <div className="light-purple-text fw6">Chỗ trống</div>
              <div>{slot}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer br4 br--bottom h-25 flex justify-around items-center">
        {priceTags.map((tag) => {
          return (
            <div className="flex flex-column justify-center items-center">
              <div className="dark-purple-text">{tag.type}</div>
              <div>{tag.price} VND</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
