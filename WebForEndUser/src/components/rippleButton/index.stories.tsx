import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { IRippleBtn, RippleButton } from './';

export default {
    title: "Utils/RippleBtn",
    component: RippleButton,
} as Meta;

const Template: Story<IRippleBtn> = (args) => <RippleButton {...args}>Click me</RippleButton>;

export const DefaultBtn = Template.bind({});
DefaultBtn.args = {
    className: "bg-blue white",
    // tslint:disable-next-line: no-console
    onClick: () => console.log("Hello World!"),
};
