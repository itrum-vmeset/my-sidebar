import styles from './Button.module.css'
import cn from 'classnames'
import { ButtonProps } from './Button.props'
import { ReactComponent as ArrowIcon } from "./arrowRight.svg"

export const Button = ({apearance, children, arrow, className, ...props}: ButtonProps): JSX.Element => {
    return (
        <button className={cn(styles.button, className, {
                [styles.filled]: apearance === 'filled',
                [styles.transparent]: apearance === 'transparent',
                [styles.grey]: apearance === 'grey',
                [styles.left]: arrow == 'left'
            })}
            {...props}
        >
            {children}
            {arrow != 'none' && <span className={cn(styles.arrow, {
				[styles.left]: arrow == 'left'
			})}>
				<ArrowIcon />
			</span>}
        </button>
    )
}