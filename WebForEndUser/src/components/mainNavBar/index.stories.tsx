import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { IMainNavBarProps, MainNavBar } from './';

export default {
    title: "Utils/MainNavBar",
    component: MainNavBar,
} as Meta;

const Template: Story<IMainNavBarProps> = (args) => <MainNavBar {...args} />;

export const MainNavBarNormal = Template.bind({});
MainNavBarNormal.args = {};
