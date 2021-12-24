import React from 'react';

import { render } from '@testing-library/react';

import { MapSearchBar } from './';

test("renders learn react link", () => {
    const { getByText } = render(<MapSearchBar />);
    const linkElement = getByText(/AppName/i);
    expect(linkElement).toBeInTheDocument();
});
