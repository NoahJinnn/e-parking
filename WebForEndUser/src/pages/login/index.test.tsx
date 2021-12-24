import React from 'react';

import { render } from '@testing-library/react';

import { LoginPage } from './';

test("renders learn react link", () => {
    const { getByText } = render(<LoginPage />);
    const linkElement = getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
});
