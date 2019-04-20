import * as React from 'react';

interface PropertyControlProps extends React.ComponentProps<React.SFC> {
    title: string;
}

export const PropertyControl = ({ title, children }: PropertyControlProps) => {
    return (
        <div className="property-control">
            <div className="title">
                <span>{title}</span>
            </div>
            <div className="content">{children}</div>
        </div>
    );
};
