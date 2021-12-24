import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { ILazyImgProps, LazyLoadImg } from './';

export default {
    title: "Utils/LazyImg",
    component: LazyLoadImg,
} as Meta;

const Template: Story<ILazyImgProps> = (args) => <LazyLoadImg {...args} />;

export const WithPlayholder = Template.bind({});
WithPlayholder.args = {
    src: require("@assets/images/admin.png"),
};

export const NotWithPlayholder = Template.bind({});
NotWithPlayholder.args = {
    src: require("@assets/images/admin.png"),
};
