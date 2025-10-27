import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
export declare const Button: React.FC<ButtonProps>;
interface CardProps {
    children: React.ReactNode;
    className?: string;
}
export declare const Card: React.FC<CardProps>;
interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: 'text' | 'email' | 'password' | 'number';
    disabled?: boolean;
    className?: string;
}
export declare const Input: React.FC<InputProps>;
export {};
