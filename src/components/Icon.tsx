import * as React from 'react';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
}

export const Icon = ({ name, size: fontSize, color }: IconProps) => (
    <i className="icon" style={{ fontSize, color }}>
        {name}
    </i>
);
