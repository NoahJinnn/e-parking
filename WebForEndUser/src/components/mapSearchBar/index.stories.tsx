import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { IMapSearchBar, MapSearchBar } from './';

export default {
    title: "Map/SearchBar",
    component: MapSearchBar,
} as Meta;

const StoryTemplate: Story<IMapSearchBar> = (args) => <MapSearchBar {...args} />;

export const TemplateNormal = StoryTemplate.bind({});
TemplateNormal.args = {};
