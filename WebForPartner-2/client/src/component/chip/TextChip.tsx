import './TextChip.scss';

import React from 'react';

export default function TextChip({ className, children, ...componentProps }) {
  return (
    <div className={`chip-container ${className}`} {...componentProps}>
      {children}
    </div>
  );
}
