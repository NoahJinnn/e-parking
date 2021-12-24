import format from 'date-fns/format';
import enLocale from 'date-fns/locale/en-US';
import viLocale from 'date-fns/locale/vi';
import React from 'react';
import { useRecoilState } from 'recoil';
import { languageState } from 'state-management/app';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export const CustomPickerUtils = ({ children }) => {
  const [locale] = useRecoilState(languageState);
  const localeMap = {
    vi: viLocale,
    en: enLocale,
  };

  class ViLocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date: Date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
    }
  }

  const localeUtilsMap = {
    en: DateFnsUtils,
    vi: ViLocalizedUtils,
  };
  return (
    <>
      <MuiPickersUtilsProvider
        locale={localeMap[locale]}
        utils={localeUtilsMap[locale]}
      >
        {children}
      </MuiPickersUtilsProvider>
    </>
  );
};
