import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IProduct } from '../../models/ITable';

export interface TableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    // products: IProduct[]
    products: any
}