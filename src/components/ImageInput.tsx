import * as React from 'react';

interface ImageInputProps {
    onImageLoaded?(data: string | ArrayBuffer): void;
}

export const ImageInput = ({ onImageLoaded }: ImageInputProps) => {
    const readFile = ({ nativeEvent: { target } }: any) => {
        const reader = new FileReader();
        const file = target.files[0];

        reader.addEventListener('load', () => {
            onImageLoaded(reader.result);
        });

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return <input type="file" accept="image/*" onChange={readFile} />;
};
