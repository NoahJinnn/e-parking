import React from 'react';

import { render } from '@testing-library/react';

import { Template } from './';

test("renders learn react link", () => {
    const { getByText } = render(<Template />);
    const linkElement = getByText(/AppName/i);
    expect(linkElement).toBeInTheDocument();
});
