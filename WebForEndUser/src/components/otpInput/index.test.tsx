import React from 'react';

import { render } from '@testing-library/react';

import { OTPInputView } from './';

test("renders learn react link", () => {
    const { getByText } = render(<OTPInputView />);
    // const linkElement = getByText(/OTP/i);
    // expect(linkElement).toBeInTheDocument();
});
