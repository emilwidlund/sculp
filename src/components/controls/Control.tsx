import * as React from 'react';

interface ControlProps extends React.ComponentProps<React.SFC> {
    title: string;
}

export const Control = ({ title, children }: ControlProps) => {
    return (
        <div className="control">
            <div className="title">
                <span>{title}</span>
            </div>
            <div className="content">{children}</div>
        </div>
    );
};
