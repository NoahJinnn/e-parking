import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { HeaderGradientIcon, IHeaderGradientIconProps } from './';

export default {
    title: "Utils/HeaderGradientIcon",
    component: HeaderGradientIcon,
} as Meta;

const Template: Story<IHeaderGradientIconProps> = (args) => <HeaderGradientIcon {...args} />;

export const PositionIcon = Template.bind({});
PositionIcon.args = {
    src: require("@assets/images/admin.png"),
    size: 96,
    classIcon: "bg-gradient-prime",
    classOverlay: "bg-prime",
};
