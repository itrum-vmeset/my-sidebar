import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends 
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        apearance?: 'filled' | 'transparent' | 'grey',
        children?: ReactNode
    	arrow?: 'left' | 'right' | 'none'
}