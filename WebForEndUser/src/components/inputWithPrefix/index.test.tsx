import React from 'react';

import { render } from '@testing-library/react';

import { InputWithPrefix } from './';

test("renders learn react link", () => {
    const { getByText } = render(<InputWithPrefix />);
    const linkElement = getByText(/84/i);
    expect(linkElement).toBeInTheDocument();
});
