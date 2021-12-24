import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { IOTPInputViewProps, OTPInputView } from './';

export default {
    title: "Utils/OTPInputView",
    component: OTPInputView,
} as Meta;

const Template: Story<IOTPInputViewProps> = (args) => <OTPInputView {...args} />;

export const OTPInputViewNormal = Template.bind({});
OTPInputViewNormal.args = {};
