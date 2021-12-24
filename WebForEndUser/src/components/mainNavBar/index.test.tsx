import React from 'react';

import { render } from '@testing-library/react';

import { MainNavBar } from './';

test("renders learn react link", () => {
    const { getByText } = render(<MainNavBar />);
    const linkElement = getByText(/home:map/i);
    expect(linkElement).toBeInTheDocument();
});
