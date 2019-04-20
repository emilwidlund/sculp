import * as React from 'react';

import { PropertyControl } from '../PropertyControl';
import { Slider } from '../Slider';

interface NumberControlProps {
    title: string;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
    onChange?(value: number): void;
}

export const NumberControl = ({ title, defaultValue, min, max, step, onChange }: NumberControlProps) => {
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

    const handleSliderChange = (value: number) => {
        setValue(value.toString());
        onChange ? onChange(value) : null;
    };

    return (
        <PropertyControl title={title}>
            <input value={value} onBlur={handleBlur} onKeyPress={handleKeyPress} onChange={handleChange} />
            <Slider value={parseFloat(value)} min={min} max={max} step={step} onChange={handleSliderChange} />
        </PropertyControl>
    );
};
