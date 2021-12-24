import React from 'react';

import { render } from '@testing-library/react';

import { RippleButton } from './';

test("renders learn react link", () => {
    const { getByText } = render(<RippleButton>Test</RippleButton>);
    const linkElement = getByText(/Test/i);
    expect(linkElement).toBeInTheDocument();
});
