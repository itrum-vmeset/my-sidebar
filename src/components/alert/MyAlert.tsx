import React from 'react';
import { MyAlertProps } from './MyAlert.props';
import classNames from "classnames";
import styles from './MyAlert.module.css'
import { ReactComponent as CloseIcon } from "./close.svg";

const MyAlert = ({children, alertVisible, setAlertVisible}: MyAlertProps): JSX.Element => {

    return (
        <div  className={classNames(styles.myAlert, {
            [styles.active]: alertVisible === true,
        })}>
            <div className={styles.myAlertContent}>
                {children}
                <CloseIcon className={styles.closeIcon} onClick={() => setAlertVisible(false)} />
            </div>
        </div>
    );
};

export default MyAlert;