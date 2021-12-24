import { HeaderGradientIcon } from 'component/header-gradient-icon/HeaderGradientIcon';
import { PrefixInput } from 'component/prefix-input/PrefixInput';
import { PrefixSelector } from 'component/prefix-selector/PrefixSelector';
import { RippleButton } from 'component/ripple-btn/RippleButton';
import { useTypedTranslation } from 'language/typedTranslation';
import React, { useState } from 'react';

export const LoginSignInPage = (props) => {
  const { t } = useTypedTranslation();
  const [phone, setPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const onPressContinue = () => props.onPressContinue?.(phone);
  const onChangePrefix = (prefix: IPrefix) => props.onChangePrefix?.(prefix);

  const onInputPhone = (pNumber: string) => {
    setPhone(pNumber);
    if (pNumber.length >= 9) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
  };

  return (
    <div className="w-100 tl-ns tc pb4">
      <div className="w-100 db-ns dn pb3">
        <HeaderGradientIcon size={96} src="/images/phone.svg" />
      </div>
      <p className="pa0 f2 ma0 mb2 hard">{t("loginTitle")}</p>
      <p className="f5 w-100 pa0 pb3 ma0 light">{t("loginSubTitle")}</p>
      <div className="mt4 mt3-ns w-100">
        <PrefixSelector
          classContainer="w-100 mwx7-ns"
          currentPrefixCode={props.currentPrefix?.code}
          onSelectPrefix={onChangePrefix}
        />
        <PrefixInput
          onPhoneInput={onInputPhone}
          currPrefix={props.currentPrefix?.dial_code}
          classContainer="w-100 mwx7-ns mt3"
        />
        <RippleButton
          className="mt3 bg-silver dark"
          disabled={!isValidPhone}
          activeClass="bg-prime white shadow"
          onClick={onPressContinue}
        >
          <strong className="pr5 pl5">{t("continue")}</strong>
        </RippleButton>
      </div>
    </div>
  );
};
