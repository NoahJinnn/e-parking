import { HeaderGradientIcon } from 'component/header-gradient-icon/HeaderGradientIcon';
import { useDynamicSelectValue } from 'hooks/dynamicValues';
import { useTimeOut } from 'hooks/timeout';
import { useTypedTranslation } from 'language/typedTranslation';
import React, { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

import { OTPInputView } from '../otp-input/OTPInputView';

export const LoginOTPPage = (props) => {
  const { t, bind } = useTypedTranslation();
  const dynamicVal = useDynamicSelectValue();
  const [timeOut, setTimeOut] = useTimeOut(0);
  const onRequestOTP = () => {
    setTimeOut(60);
    props.onRequestOTP?.();
  };
  const onOTPFilled = (otp: string) => props.onOTPFilled?.(otp);
  useEffect(() => {
    setTimeOut(60);
  }, []);
  return (
    <div className="w-100 tl-ns tc pb4">
      <div className="w-100 db-ns dn pb3">
        <HeaderGradientIcon size={96} src="/images/mail.svg" />
      </div>
      <p className="pa0 f2 ma0 mb2 hard">{t("loginVerTitle")}</p>
      <p className="w-100 pa0 ma0 light pb3">
        {bind(
          { phone: `(${props.currentPrefix?.dial_code}) ${props.phone}` },
          "loginVerSub"
        )}
      </p>
      <div className="mt3">
        <OTPInputView
          onCodeFilled={onOTPFilled}
          codeLength={6}
          size={dynamicVal([2.5, 2, 3])}
        />
      </div>
      {timeOut > 0 ? (
        <div className="animate__animated animate__fadeIn w-50-ns f5 w-70-m w-100 mt4 flex center-items">
          <MoonLoader css="animation-duration: 1s" color="#4938f7" />
          <h3 className="absolute ma0 prime">{timeOut}</h3>
        </div>
      ) : (
        <p
          onClick={onRequestOTP}
          className="w-50-ns f5 w-70-m w-100 pa0 ma0 mt3 light"
        >
          {t("loginVerResendP1")} <strong>{t("loginVerResendP2")}</strong>
        </p>
      )}
    </div>
  );
};
