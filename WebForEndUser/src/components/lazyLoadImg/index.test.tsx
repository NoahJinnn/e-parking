import React from 'react';

import { render } from '@testing-library/react';

import { LazyLoadImg } from './';

test("renders learn react link", () => {
    const { getAllByAltText } = render(<LazyLoadImg src={require("@assets/images/admin.png")} />);
    const foundElements = getAllByAltText(/e-Parking/i);
    expect(foundElements.length).toEqual(1);
});
