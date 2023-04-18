import styles from './Input.module.css'
import classNames from 'classnames'
import { InputProps } from './Input.props'

export const Input = ({ className, ...props}: InputProps): JSX.Element => {
    return (
        <input className={classNames(styles.input, className)}
            {...props}
        />
    )
}