import React from 'react';

import { render } from '@testing-library/react';

import { TemplatePage } from './';

test("renders learn react link", () => {
    const { getByText } = render(<TemplatePage />);
    const linkElement = getByText(/Helloworld/i);
    expect(linkElement).toBeInTheDocument();
});
