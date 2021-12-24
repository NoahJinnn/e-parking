import TextChip from 'component/chip/TextChip';
import { SearchBar } from 'component/search-bar/SearchBar';
import { useTypedTranslation } from 'language/typedTranslation';
import React from 'react';

import ParkingCardList from './ParkingCardList';

const LocationSuggest = (): JSX.Element => {
  const suggests = [
    "3 Nguyễn Trãi",
    "Tòa nhà Bitexco",
    "Đường Lê Duẩn",
    "Landmark 81",
  ];
  return (
    <div className="flex justify-between w-100">
      {suggests.map((suggest) => (
        <TextChip className="pa2 br3">{suggest}</TextChip>
      ))}
    </div>
  );
};

export default function ParkingManager() {
  const { t } = useTypedTranslation();
  return (
    <div className="parking-manager w-100">
      <SearchBar
        placeholder={t("parkingSearch")}
        containerClass="w-100 relative"
        extraFloatComponent={<LocationSuggest />}
      />
      <ParkingCardList />
    </div>
  );
}
