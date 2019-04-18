import * as React from 'react';

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
        <div>
            <img src={image} width={100} height={100} />
            <input type="file" accept="image/*" onChange={readFile} />
        </div>
    );
};
