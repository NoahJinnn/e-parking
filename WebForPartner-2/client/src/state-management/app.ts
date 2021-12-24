import { atom } from 'recoil';

import { LANGUAGE_STATE_KEY, LOGIN_STATE_KEY } from '../app-const';

export const loginState = atom({
  key: LOGIN_STATE_KEY,
  default: false,
});

export const languageState = atom<TSupportLanguage>({
  key: LANGUAGE_STATE_KEY,
  default: "en",
});
