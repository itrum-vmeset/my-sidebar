import styles from './Button.module.css'
import cn from 'classnames'
import { ButtonProps } from './Button.props'

export const Button = ({apearance, children, className, ...props}: ButtonProps): JSX.Element => {
    return (
        <button className={cn(styles.button, className, {
                [styles.filled]: apearance === 'filled',
                [styles.transparent]: apearance === 'transparent',
            })}
            {...props}
        >
            {children}
        </button>
    )
}