import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { IParam } from '../../../models/IResponse';
import { SelectOption } from '../../UI/select/Select.props';

export interface PaginationProps extends 
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
        params: IParam,
        setParams: Dispatch<SetStateAction<IParam>>,
        selectOptions: SelectOption[]
        totalPages: number
    }