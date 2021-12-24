import React from 'react';

import { fakeMakers } from '@config';
import { render } from '@testing-library/react';

import { MapUnitInfo } from './';

test("renders learn react link", () => {
    const { getByText } = render(<MapUnitInfo unitMarker={fakeMakers[0]} />);
    const linkElement = getByText(/Toà nhà Mplaza SaiGon/i);
    expect(linkElement).toBeInTheDocument();
});
