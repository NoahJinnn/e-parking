import "tachyons";
import "animate.css";
import "../src/styles/index.scss";

import { I18nextProvider } from "react-i18next";

import i18n from "@languages/i18n";

export const decorators = [
    (Story) => (
        <I18nextProvider i18n={i18n}>
            <Story />
        </I18nextProvider>
    ),
];
