import React from 'react';

import { render } from '@testing-library/react';

import { ControllableSwipeView } from './';

test("renders learn react link", () => {
    const { getByText } = render(<ControllableSwipeView components={[<p key="1">Hello</p>]} />);
    const linkElement = getByText(/Hello/i);
    expect(linkElement).toBeInTheDocument();
});
