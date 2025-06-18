import React from 'react';
import { Button as ButtonType } from '../../misc/types';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonType> = ({ variant, className, children, ...rest }) => {


    return (
        <button className={`my-btn btn-${variant} transition-03 pointer ${className}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
