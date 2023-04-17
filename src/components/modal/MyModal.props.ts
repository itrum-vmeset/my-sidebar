import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface MyModalProps extends 
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        modalVisible: boolean,
        setModalVisible: (e: boolean) => void,
        children: ReactNode
}