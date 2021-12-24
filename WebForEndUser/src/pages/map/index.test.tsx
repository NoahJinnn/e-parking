import React from 'react';

import { render } from '@testing-library/react';

import { MapScreen } from './';

test("renders learn react link", () => {
    const { getByText } = render(<MapScreen />);
    const linkElement = getByText(/Helloworld/i);
    expect(linkElement).toBeInTheDocument();
});
