import * as React from 'react';

import { fakeMakers } from '@config';
import { Meta, Story } from '@storybook/react';

import { IMapUnitInfoProps, MapUnitInfo } from './';

export default {
    title: "Map/UnitInfo",
    component: MapUnitInfo,
} as Meta;

const StoryTemplate: Story<IMapUnitInfoProps> = (args) => <MapUnitInfo {...args} />;

export const StandardUnitInfo = StoryTemplate.bind({});
StandardUnitInfo.args = {
    unitMarker: fakeMakers[0],
};
