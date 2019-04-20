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

    const handleBlur = (event: React.SyntheticEvent<HTMLInputElement>) => {
        setValue((parseFloat(event.currentTarget.value) || 0).toString());
        onChange ? onChange(parseFloat(event.currentTarget.value) || 0) : null;
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.nativeEvent.keyCode === 13) {
            event.currentTarget.blur();
        }
    };

    return (
        <PropertyControl title={title}>
            <input value={value.toString()} onBlur={handleBlur} onKeyPress={handleKeyPress} onChange={handleChange} />
        </PropertyControl>
    );
};
