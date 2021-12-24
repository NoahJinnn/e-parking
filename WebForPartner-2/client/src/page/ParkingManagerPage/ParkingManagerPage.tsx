import React from 'react';

import ParkingInfo from './component/parking-info';
import ParkingManager from './component/parking-manager';

export default function ParkingManagerPage() {
  return (
    <div className="parking-page page-bg flex w-100">
      <ParkingManager />
      <ParkingInfo />
    </div>
  );
}
