import './MainNavBar.scss';

import userImg from 'assets/images/admin.png';
import { SVGSetting } from 'component/svg/setting';
import { useDynamicSelectValue } from 'hooks/dynamicValues';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IBarItem {
  icon: string;
  page: TMainPages;
  langIndex: string;
}

export const MainNavBar = (props) => {
  const { page = "map" } = props;
  const { t } = useTranslation();
  const dynamicValue = useDynamicSelectValue();
  const onChangePage = (goToPage: TMainPages) => {
    props.onNavigateToPage?.(goToPage);
  };
  const navigateItems: IBarItem[] = [
    {
      icon: "/images/position.svg",
      page: "map",
      langIndex: "homeMap",
    },
    {
      icon: "/images/history.svg",
      page: "history",
      langIndex: "homeHistory",
    },
    {
      icon: "/images/message.svg",
      page: "message",
      langIndex: "homeMessage",
    },
    {
      icon: "/images/account.svg",
      page: "account",
      langIndex: "homeAccount",
    },
  ];

  const renderItemNav = navigateItems.map((item, idx) => {
    return (
      <div
        key={item.page}
        onClick={() => onChangePage(item.page)}
        style={{ animationDelay: `${(idx + 1) * 100}ms` }}
        className="animate__animated animate__bounceIn"
      >
        <div
          className={`flex items-center justify-center flex-column relative ${
            item.page === page ? "nav__active" : ""
          } pt1 pb1 mt1 mb1 w-100`}
          style={{ height: 80 }}
        >
          <div
            className={`bg-white absolute left-0 ledBar h-100 nav__ledBar nav__ledBar-${
              item.page === page ? "active" : "hide"
            }`}
          />
          <div
            className={`flex flex-column pa2 h-100 items-center nav__content justify-center nav__content-${
              item.page === page ? "active" : ""
            }`}
          >
            <img src={item.icon} className="flex h-50" />
            <p className="flex ma0 white f6 pt1">{t(item.langIndex as any)}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex row w-100 h-100">
      <div
        className="flex nav nav__background flex-column justify-between"
        style={{ width: dynamicValue([90, 100, 120]), height: "100vh" }}
      >
        <div>
          <div className="flex pa3 w-100">
            <div className="shadow br-100 w-100 h-100 items-center justify-center flex overflow-hidden">
              <img src={userImg} className="w-100 h-100 ob-cover" />
            </div>
          </div>
          {renderItemNav}
        </div>
        <div
          className="flex pa3 items-end pointer items-center justify-center w-100"
          style={{ justifySelf: "end" }}
        >
          <div className="pa3 dim">
            <SVGSetting width={32} height={32} />
          </div>
        </div>
      </div>
      <div className={"flex w-100 h-100"}>{props.children}</div>
    </div>
  );
};
