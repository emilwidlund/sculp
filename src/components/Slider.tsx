import * as React from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import { modulate } from '../utils/helpers';

interface SliderProps {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange?(value: number): void;
}

export const Slider = ({ value, min, max, step, onChange }: SliderProps) => {
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const [sliderWidth, setSliderWidth] = React.useState(0);
    const [sliderFillWidth, setSliderFillWidth] = React.useState(0);

    React.useEffect(() => {
        setSliderWidth(sliderRef.current.offsetWidth);
        setSliderFillWidth(modulate(value, [min, max], [0, sliderWidth]));
    });

    return (
        <div className="slider" ref={sliderRef}>
            <div className="slider-fill" style={{ width: sliderFillWidth }} />
            <Draggable
                position={{ x: modulate(value, [min, max], [0, sliderWidth]), y: 0 }}
                axis="x"
                bounds={{ top: 0, right: sliderWidth, bottom: 0, left: 0 }}
                grid={[modulate(step, [min, max], [0, sliderWidth]), 0]}
                onDrag={(event, data) => {
                    setSliderFillWidth(data.x);
                    const value = parseFloat(modulate(data.x, [0, sliderWidth], [min, max]).toFixed(1));

                    onChange ? onChange(value) : null;
                }}
            >
                <div className="slider-knob" />
            </Draggable>
        </div>
    );
};
