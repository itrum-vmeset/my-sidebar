import styles from './Button.module.css'
import classNames from 'classnames'
import { ButtonProps } from './Button.props'
import { ReactComponent as ArrowIcon } from "./arrowRight.svg"

export const Button = ({apearance, children, arrow, className, ...props}: ButtonProps): JSX.Element => {
    return (
        <button className={classNames(styles.button, className, {
                [styles.filled]: apearance === 'filled',
                [styles.transparent]: apearance === 'transparent',
                [styles.grey]: apearance === 'grey',
                [styles.left]: arrow === 'left'
            })}
            {...props}
        >
            {children}
            {arrow !== 'none' && <span className={classNames(styles.arrow, {
				[styles.left]: arrow === 'left'
			})}>
				<ArrowIcon />
			</span>}
        </button>
    )
}