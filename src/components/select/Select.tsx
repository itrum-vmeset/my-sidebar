import styles from './Select.module.css'
import classNames from 'classnames'
import { SelectProps } from './Select.props'

export const Select = ({changeVal, defaultValue, value, options, className, ...props}: SelectProps): JSX.Element => {
    
    return (
        <select
            className={classNames(styles.select, className)}
            value={value}
            onChange={(e: any) => changeVal(e)}
            {...props}
        >
            {defaultValue && <option disabled value="">{defaultValue}</option>}
            {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
        </select>
    )
}