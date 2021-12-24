import React from 'react';

import { render } from '@testing-library/react';

import { HeaderGradientIcon } from './';

test("renders learn react link", () => {
    const { getAllByAltText } = render(<HeaderGradientIcon src="/country/VN.png" />);
    const foundElements = getAllByAltText(/lazyload img/i);
    expect(foundElements.length).toEqual(1);
});
