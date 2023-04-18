import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface MyModalProps extends 
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
        modalVisible: boolean,
        setModalVisible: (e: boolean) => void,
        children: ReactNode
}