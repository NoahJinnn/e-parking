import { SVGSearch } from 'assets/svgc/search';
import { useDynamicSelectValue } from 'hooks/dynamicValues';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';

export interface ISearchBar {
  containerClass?: string;
  onSearch?: (input: string) => any;
  extraFloatComponent?: ReactElement;
  placeholder?: string;
}

export const SearchBar = (props: PropsWithChildren<ISearchBar>) => {
  const { containerClass = "", placeholder } = props;
  const dynamicVal = useDynamicSelectValue([1600, 720]);

  // Search States
  let searchInput = "";
  const onSearch = () => {
    props.onSearch?.(searchInput);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  useEffect(() => {}, []);
  return (
    <div
      className={`pa4 flex flex-column ${containerClass}`}
      style={{
        transform: `scale(${dynamicVal([
          0.9,
          0.95,
          1,
        ])}) translate(-${dynamicVal([10, 5, 0])}%, -${dynamicVal([
          8,
          5,
          0,
        ])}%)`,
      }}
    >
      <div className="flex flex-column" style={{ width: "100%" }}>
        <div
          className="animate__animated animate__fadeInDown w-100 shadow br4 overflow-hidden flex flex-row bg-med-dark bg-hard-light"
          style={{ height: "3rem" }}
        >
          <input
            onChange={(e) => (searchInput = e.target.value)}
            type="text"
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-100 h-100 flex bn pr3 pl3 outline-transparent bg-transparent hard"
          />
          <div
            onClick={onSearch}
            className="flex pa2 pr3 pl3 center-items justify-center pointer grow"
          >
            <SVGSearch width={24} />
          </div>
        </div>
        <div className="mt2 w-100 flex">{props.children}</div>
      </div>
      <div className="flex mt2 w-100">{props.extraFloatComponent}</div>
    </div>
  );
};
