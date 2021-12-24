import React from 'react';

import { render } from '@testing-library/react';

import { PrefixSelector } from './';

test("renders learn react link", () => {
    const { getByText } = render(<PrefixSelector />);
    // TODO: write test for this
    expect(1).toEqual(1);
});
