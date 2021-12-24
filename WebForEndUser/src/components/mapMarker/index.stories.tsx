import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { IUnitMarkerProps, UnitMarker } from './';

export default {
    title: "Map/UnitMarker",
    component: UnitMarker,
} as Meta;

const StoryTemplate: Story<IUnitMarkerProps> = (args) => <UnitMarker {...args} />;

export const AvailableMarker = StoryTemplate.bind({});
AvailableMarker.args = {
    lng: 0,
    lat: 0,
    status: "available",
};

export const NearfullMarker = StoryTemplate.bind({});
NearfullMarker.args = {
    lng: 0,
    lat: 0,
    status: "nearfull",
};

export const UnavailableMarker = StoryTemplate.bind({});
UnavailableMarker.args = {
    lng: 0,
    lat: 0,
    status: "unavailable",
};
