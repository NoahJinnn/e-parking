import './index.scss';

import React, { useState } from 'react';

export const TemplatePage = () => {
    const [text, setText] = useState("Helloworld");
    return (
        <div className="tc">
            <p>{text}</p>
        </div>
    );
};
