import * as React from 'react';

interface ButtonProps {
    text: string;
    onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
    <button onClick={onClick}>{text}</button>;
};
