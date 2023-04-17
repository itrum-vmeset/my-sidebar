import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

interface SelectOption {
    value: string
    name: string
}

export interface SelectProps extends 
    DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
        options: SelectOption[]
        value: string
        defaultValue?: string
        changeVal: (e: any) => void
}