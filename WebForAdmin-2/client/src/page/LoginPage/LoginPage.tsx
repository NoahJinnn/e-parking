import './LoginPage.scss';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRecoilState } from 'recoil';
import { languageState } from 'state-management/app';

import { LanguageSelector } from './component/lang-selector/LanguageSelector';
import { LoginOTPPage } from './component/otp-page/LoginOTPPage';
import { LoginSignInPage } from './component/signin-page/LoginSignInPage';
import { LoginSignUpPage } from './component/signup-page/LoginSignUpPage';

export const LoginPage = () => {
  // Query root locale state
  const [currentLang, setCrrLang] = useRecoilState(languageState);
  const { i18n } = useTranslation();
  const [crrPrefix, setCrrPrefix] = useState<IPrefix>();
  const [phoneInput, setPhoneInput] = useState("");
  const history = useHistory();
  const location = useLocation();

  const onChangeLang = (code: TSupportLanguage) => {
    setCrrLang(code);
    i18n.changeLanguage(code);
  };

  const onRequestOTP = () => {};
  const onSignIn = (phone: string) => {
    setPhoneInput(phone);
    history.push("/login/otp");
  };
  const onOTPFilled = (otp: string) => {
    history.push("/login/signup");
  };
  const onSubmitInfo = (info: IUserSignUpInfo) => {};
  // useEffect as componentDidRun

  useEffect(() => {
    // i18n.changeLanguage('vi');
  }, []);

  return (
    <div className="login vw-100 vh-100 flex flex-column flex-row-ns">
      <div className="w-40-ns z-2 w-50-m w-100 h-100-ns h-25 flex login__background items-center justify-center pa3">
        <img
          alt="logo"
          className="absolute top-2 mw3 dn db-ns"
          src="/images/login_logo_small.png"
        />
        <img
          alt="logo"
          className="w-100 h-100 mw6"
          src="/images/login_big_intro.svg"
        />
      </div>
      <div className="flex w-60-ns w-100 h-100-ns h-75 center-items bg-hard relative">
        <img
          alt="overlay"
          className="absolute dn db-ns right-0 top-0 w-100 z-0 animate__animated animate__fadeInDown"
          src="/images/login_background_overlay.svg"
        />
        <LanguageSelector
          classContainer="absolute dn top-1 right-2 z-1 flex-ns center-items"
          onSelectLang={(lang) => onChangeLang(lang as TSupportLanguage)}
          currentLang={currentLang}
        />
        <LanguageSelector
          classContainer="absolute dn-ns db bottom-1 z-1 flex center-items"
          onSelectLang={(lang) => onChangeLang(lang as TSupportLanguage)}
          currentLang={currentLang}
          popupPosition="top"
        />
        <div className="w-80-ns w-100 h-100 pa3 pa0-ns justify-center flex flex-column overflow-hidden">
          <TransitionGroup>
            <CSSTransition timeout={300} classNames="fade" key={location.key}>
              <Switch location={location}>
                <Route exact path="/login">
                  <LoginSignInPage
                    currentPrefix={crrPrefix as any}
                    onPressContinue={onSignIn}
                    onChangePrefix={setCrrPrefix}
                  />
                </Route>
                <Route exact path="/login/otp">
                  <LoginOTPPage
                    currentPrefix={crrPrefix as any}
                    phone={phoneInput}
                    onOTPFilled={onOTPFilled}
                    onRequestOTP={onRequestOTP}
                  />
                </Route>
                <Route exact path="/login/signup">
                  <LoginSignUpPage onSubmitInfo={onSubmitInfo} />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};
