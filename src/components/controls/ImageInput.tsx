import * as React from 'react';

import { Control } from './Control';

interface ImageInputProps {
    onImageLoaded(data: string): void;
}

export const ImageInput = ({ onImageLoaded }: ImageInputProps) => {
    const [image, setImage] = React.useState(null);

    const readFile = ({ nativeEvent: { target } }: any) => {
        const reader = new FileReader();
        const file = target.files[0];

        reader.addEventListener('load', () => {
            setImage(reader.result);
            onImageLoaded(reader.result as string);
        });

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <Control title="Height Map">
            <div className="image" style={{ backgroundImage: `url(${image})` }} />
            <button onClick={() => document.getElementById('control-image-input').click()}>Select</button>
            <input id="control-image-input" type="file" accept="image/*" onChange={readFile} hidden />
        </Control>
    );
};
