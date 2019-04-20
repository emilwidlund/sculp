import * as React from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import { modulate } from '../utils/helpers';

interface SliderProps {
    min: number;
    max: number;
    onChange?(value: number): void;
}

export const Slider = ({ min, max, onChange }: SliderProps) => {
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const [sliderWidth, setSliderWidth] = React.useState(0);
    const [sliderFillWidth, setSliderFillWidth] = React.useState(0);

    React.useEffect(() => {
        setSliderWidth(sliderRef.current.offsetWidth);
    });

    return (
        <div className="slider" ref={sliderRef}>
            <div className="slider-fill" style={{ width: sliderFillWidth }} />
            <Draggable
                axis="x"
                bounds={{ top: 0, right: sliderWidth, bottom: 0, left: 0 }}
                onDrag={(event, data) => {
                    setSliderFillWidth(data.x);
                    const value = modulate(data.x, [0, sliderWidth], [min, max]);

                    onChange ? onChange(value) : null;
                }}
            >
                <div className="slider-knob" />
            </Draggable>
        </div>
    );
};
