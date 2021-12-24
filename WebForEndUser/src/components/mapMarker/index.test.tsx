import React from 'react';

import { render } from '@testing-library/react';

import { UnitMarker } from './';

test("renders learn react link", () => {
    const { getAllByAltText } = render(<UnitMarker latitude="" longitude="" />);
    const found = getAllByAltText(/marker/i);
    expect(found.length).toEqual(1);
});
