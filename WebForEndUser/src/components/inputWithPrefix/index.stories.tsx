import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { IInputWithPrefixProps, InputWithPrefix } from './';

export default {
    title: "Utils/InputWithPrefix",
    component: InputWithPrefix,
} as Meta;

const Template: Story<IInputWithPrefixProps> = (args) => <InputWithPrefix {...args} />;

export const InputWithPrefixNormal = Template.bind({});
InputWithPrefixNormal.args = {
    classContainer: "w-50 app__light",
};
