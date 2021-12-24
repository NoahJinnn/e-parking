import React from 'react';

import { render } from '@testing-library/react';

import { ILanguageFormat, LanguageSelector } from './';

const supportLang: ILanguageFormat[] = [
    { code: "vi", short: "vie", full: "Việt Nam", logo: "VN" },
    { code: "en", short: "eng", full: "English", logo: "US" },
];

test("renders learn react link", () => {
    const { getByText } = render(<LanguageSelector supportLang={supportLang} />);
    const linkElement = getByText(/VIE/i);
    expect(linkElement).toBeInTheDocument();
});
