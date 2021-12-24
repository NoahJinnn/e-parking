import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import IndicatorPoint, { IIndicatorPoint } from './IndicatorPoint'
import ConfirmLicensePlateIcon from 'src/components/svg-components/ConfirmLicensePlateIcon'

export default {
  title: 'checkin/footer/IndicatorPoint',
  component: IndicatorPoint,
} as Meta

const Template: Story<IIndicatorPoint> = (args) => <IndicatorPoint {...args} />

export const Main = Template.bind({})
Main.args = {
  text: 'Test',
  symbol: <ConfirmLicensePlateIcon stroke={'#fff'} className="flex justify-center items-center h-100" />,
  isHighlight: true,
}
