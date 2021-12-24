import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { ControllableSwipeView, IControllableSwipeViewProps } from './';

export default {
    title: "Utils/ControllableSwipeView",
    component: ControllableSwipeView,
} as Meta;

const Template: Story<IControllableSwipeViewProps> = (args) => <ControllableSwipeView {...args} />;

export const ControllableSwipeViewNormal = Template.bind({});
ControllableSwipeViewNormal.args = {
    classContainer: "vh-100 bg-red",
    index: 0,
    components: [<div key="1" className="flex w-100 h-100 bg-red" />, <div key="2" className="flex w-100 h-100 bg-blue" />],
};
