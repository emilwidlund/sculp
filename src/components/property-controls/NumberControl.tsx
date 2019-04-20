import * as React from 'react';

import { PropertyControl } from './PropertyControl';

interface NumberControlProps {
    title: string;
    defaultValue: number;
    onChange?(value: number): void;
}

export const NumberControl = ({ title, defaultValue, onChange }: NumberControlProps) => {
    const [value, setValue] = React.useState(defaultValue.toString());

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.nativeEvent.keyCode === 13) {
            setValue((parseFloat(event.currentTarget.value) || 0).toString());
            onChange ? onChange(parseFloat(event.currentTarget.value) || 0) : null;
        }
    };

    return (
        <PropertyControl title={title}>
            <input value={value.toString()} onKeyPress={handleKeyPress} onChange={handleChange} />
        </PropertyControl>
    );
};
