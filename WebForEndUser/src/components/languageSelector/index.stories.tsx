import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { ILanguageFormat, ILanguageSelectorProps, LanguageSelector } from './';

export default {
    title: "Login/LanguageSelector",
    component: LanguageSelector,
} as Meta;
const supportLang: ILanguageFormat[] = [
    { code: "vi", short: "vie", full: "Việt Nam", logo: "VN" },
    { code: "en", short: "eng", full: "English", logo: "US" },
];
const Template: Story<ILanguageSelectorProps> = (args) => <LanguageSelector {...args} />;

export const LanguageSelectorLight = Template.bind({});
LanguageSelectorLight.args = {
    classContainer: "app__light",
    supportLang,
};

export const LanguageSelectorDark = Template.bind({});
LanguageSelectorDark.args = {
    classContainer: "app__dark bg-black ma4",
    supportLang,
};
