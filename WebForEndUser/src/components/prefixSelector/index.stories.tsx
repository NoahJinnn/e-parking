import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { IPrefixSelectorProps, PrefixSelector } from './';

export default {
    title: "Login/PrefixSelector",
    component: PrefixSelector,
} as Meta;

const Template: Story<IPrefixSelectorProps> = (args) => <PrefixSelector {...args} />;

export const PrefixSelectorNormal = Template.bind({});
PrefixSelectorNormal.args = {
    classContainer: "w-50 app__light",
};
