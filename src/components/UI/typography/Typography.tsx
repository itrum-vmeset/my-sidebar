import { FC } from "react"
import styles from './Typography.module.css'
import classNames from 'classnames'
import { TypographyProps } from "./Typography.props"

export const Typography: FC<TypographyProps> = ({children, className, ...props}): JSX.Element => {
    return (
        <p {...props}
            className={classNames(styles.typography, className)}>
            {children}
        </p>
    )
}